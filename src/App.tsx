import React, { useEffect, useReducer } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import produce from 'immer';
import { GlobalStyles } from './styles';
import { getIdeas, createIdea, deleteIdea, updateIdea } from './api';
import { Idea } from './types';
import { IdeaTile, tileEnterKeyframes } from './IdeaTile';
import { AddIcon, LoadingIcon } from './icons';

type State = {
	isLoading: boolean;
	isCreating: boolean;
	isShowingUpdateNotice: boolean;
	ideas: Record<string, Idea>;
	sortCriteria: SortCriteria;
	deletingId: string | null;
};

type SortCriteria = 'title' | 'createdAt';

export function App() {
	const [state, dispatch] = useReducer(reducer, {
		isLoading: true,
		isCreating: false,
		isShowingUpdateNotice: false,
		ideas: {},
		sortCriteria: 'title',
		deletingId: null,
	});

	useEffect(() => {
		getIdeas().then(ideas =>
			dispatch({ type: 'IDEAS_FETCHED', payload: ideas })
		);
	}, []);

	const sortedIdeas = getSortedIdeas(state.ideas, state.sortCriteria);

	return (
		<>
			<GlobalStyles />
			<Header>
				<Logo>Ideas Board</Logo>

				{state.isShowingUpdateNotice && (
					<p
						css={css`
							margin-left: 12px;
						`}
					>
						saved!
					</p>
				)}

				<SortingOptions
					value={state.sortCriteria}
					onChange={event =>
						dispatch({
							type: 'UPDATE_SORT_CRITERIA',
							payload: event.target.value as SortCriteria,
						})
					}
				>
					<option value="title">sort › title</option>
					<option value="createdAt">sort › date</option>
				</SortingOptions>
			</Header>

			<Main>
				{state.isLoading ? (
					<Grid>
						<LoaderBox />
						<LoaderBox style={{ animationDelay: '100ms' }} />
						<LoaderBox style={{ animationDelay: '200ms' }} />
					</Grid>
				) : (
					<Grid>
						<AddButton
							type="button"
							disabled={state.isCreating}
							onClick={() => {
								dispatch({ type: 'CREATE_IDEA' });
								createIdea().then(idea =>
									dispatch({ type: 'IDEA_CREATED', payload: idea })
								);
							}}
							title="Add new idea"
						>
							{state.isCreating ? <LoadingIcon /> : <AddIcon />}
						</AddButton>
						{sortedIdeas.map((idea, index) => (
							<IdeaTile
								key={`${idea.id} – ${state.sortCriteria}`}
								idea={idea}
								onDelete={() => {
									dispatch({ type: 'DELETE_IDEA', payload: idea.id });
									deleteIdea(idea.id).then(id =>
										dispatch({ type: 'IDEA_DELETED', payload: id })
									);
								}}
								isDeleting={state.deletingId === idea.id}
								onUpdate={(updateKey, value) => {
									const ideaFields =
										updateKey === 'title'
											? { title: value, body: idea.body }
											: { title: idea.title, body: value };
									updateIdea({ id: idea.id, ...ideaFields }).then(idea => {
										dispatch({ type: 'IDEA_UPDATED', payload: idea });
										dispatch({ type: 'SHOW_UPDATE_NOTICE' });
										setTimeout(
											() => dispatch({ type: 'HIDE_UPDATE_NOTICE' }),
											1000
										);
									});
								}}
								enterDelay={(index + 1) * 50}
							/>
						))}
					</Grid>
				)}
			</Main>
		</>
	);
}

type Action =
	| { type: 'IDEAS_FETCHED'; payload: Record<string, Idea> }
	| { type: 'CREATE_IDEA' }
	| { type: 'IDEA_CREATED'; payload: Idea }
	| { type: 'IDEA_UPDATED'; payload: Idea }
	| { type: 'SHOW_UPDATE_NOTICE' }
	| { type: 'HIDE_UPDATE_NOTICE' }
	| { type: 'DELETE_IDEA'; payload: string }
	| { type: 'IDEA_DELETED'; payload: string }
	| { type: 'UPDATE_SORT_CRITERIA'; payload: SortCriteria };

const reducer = produce((draft: State, action: Action) => {
	switch (action.type) {
		case 'IDEAS_FETCHED':
			draft.isLoading = false;
			draft.ideas = action.payload;
			break;
		case 'CREATE_IDEA':
			draft.isCreating = true;
			break;
		case 'IDEA_CREATED':
			draft.isCreating = false;
			draft.ideas[action.payload.id] = action.payload;
			break;
		case 'IDEA_UPDATED':
			draft.ideas[action.payload.id] = action.payload;
			break;
		case 'SHOW_UPDATE_NOTICE':
			draft.isShowingUpdateNotice = true;
			break;
		case 'HIDE_UPDATE_NOTICE':
			draft.isShowingUpdateNotice = false;
			break;
		case 'DELETE_IDEA':
			draft.deletingId = action.payload;
			break;
		case 'IDEA_DELETED':
			const deletedId = action.payload;
			delete draft.ideas[deletedId];
			draft.deletingId = null;
			break;
		case 'UPDATE_SORT_CRITERIA':
			draft.sortCriteria = action.payload;
			break;
	}
});

function getSortedIdeas(
	ideas: Record<string, Idea>,
	sortCriteria: SortCriteria
) {
	return Object.keys(ideas)
		.map(id => ideas[id])
		.sort(sortCriteria === 'title' ? sortByTitle : sortByCreationDate);
}

function sortByTitle(idea1: Idea, idea2: Idea) {
	const title1 = idea1.title || '';
	const title2 = idea2.title || '';
	return title1 < title2
		? -1
		: title1 > title2
		? 1
		: sortByCreationDate(idea1, idea2);
}

function sortByCreationDate(idea1: Idea, idea2: Idea) {
	return idea2.createdAt - idea1.createdAt;
}

const Header = styled.header`
	flex-shrink: 0;
	display: flex;
	align-items: baseline;
	padding: 5vw 5vw 0;
	background-color: var(--color-primary);
	color: white;
`;

const Logo = styled.h1`
	font-size: 3rem;
	font-weight: 900;
`;

const SortingOptions = styled.select`
	appearance: none;
	background: none;
	border: none;
	opacity: 0.5;
	margin-left: auto;

	&:focus {
		outline: none;
		opacity: 1;
	}
`;

const Main = styled.main`
	flex: 1;
	padding: 5vw;
`;

const Grid = styled.ol`
	display: grid;
	grid-template-columns: repeat(auto-fill, 200px);
	grid-template-rows: repeat(auto-fill, 200px);
	grid-gap: 18px;
	grid-auto-rows: 200px;
`;

const AddButton = styled.button`
	background-color: transparent;
	border: 1px solid var(--color-primary);
	border-radius: 2px;
	font-size: 2rem;
	animation: ${tileEnterKeyframes} 666ms backwards;
	transition: 333ms;

	&:focus,
	&:hover {
		outline: none;
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}
`;

const LoaderBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--color-primary);
	border-radius: 2px;
	animation: ${tileEnterKeyframes} 666ms alternate infinite both;
`;
