import React, { useEffect, useReducer } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import produce from 'immer';
import { GlobalStyles } from './styles';
import { getIdeas, createIdea, deleteIdea, updateIdea } from './api';
import { Idea } from './types';
import { IdeaTile, tileEnterKeyframes } from './IdeaTile';
import { AddIcon } from './icons';

type State = {
	isLoading: boolean;
	ideas: Record<string, Idea>;
	sortCriteria: SortCriteria;
};

type SortCriteria = 'title' | 'createdAt';

export function App() {
	const [state, dispatch] = useReducer(reducer, {
		isLoading: true,
		ideas: {},
		sortCriteria: 'title',
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
			<h1
				css={css`
					font-size: 3rem;
					font-weight: 900;
				`}
			>
				Ideas Board
			</h1>

			{/* <div>
				Sort by{' '}
				<select
					value={state.sortCriteria}
					onChange={event =>
						dispatch({
							type: 'UPDATE_SORT_CRITERIA',
							payload: event.target.value as SortCriteria,
						})
					}
				>
					<option value="title">Title</option>
					<option value="createdAt">Date created</option>
				</select>
			</div> */}
			{state.isLoading ? (
				<Grid>
					<Loader />
				</Grid>
			) : (
				<Grid>
					<button
						type="button"
						onClick={() =>
							createIdea().then(idea =>
								dispatch({ type: 'IDEA_CREATED', payload: idea })
							)
						}
						css={css`
							background-color: transparent;
							border: var(--border);
							border-radius: 2px;
							animation: ${tileEnterKeyframes} 666ms backwards;

							&:focus,
							&:hover {
								outline: none;
								background-color: var(--focus-color);
							}
						`}
						title="Add new idea"
					>
						<AddIcon />
					</button>
					{sortedIdeas.map((idea, index) => (
						<IdeaTile
							key={idea.id}
							idea={idea}
							onDelete={() =>
								deleteIdea(idea.id).then(id =>
									dispatch({ type: 'IDEA_DELETED', payload: id })
								)
							}
							onUpdate={(updateKey, value) => {
								const ideaFields =
									updateKey === 'title'
										? { title: value, body: idea.body }
										: { title: idea.title, body: value };
								updateIdea({ id: idea.id, ...ideaFields }).then(idea =>
									dispatch({ type: 'IDEA_UPDATED', payload: idea })
								);
							}}
							enterDelay={(index + 1) * 50}
						/>
					))}
				</Grid>
			)}
		</>
	);
}

type Action =
	| { type: 'IDEAS_FETCHED'; payload: Record<string, Idea> }
	| { type: 'IDEA_CREATED'; payload: Idea }
	| { type: 'IDEA_UPDATED'; payload: Idea }
	| { type: 'IDEA_DELETED'; payload: string }
	| { type: 'UPDATE_SORT_CRITERIA'; payload: SortCriteria };

const reducer = produce((draft: State, action: Action) => {
	switch (action.type) {
		case 'IDEAS_FETCHED':
			draft.isLoading = false;
			draft.ideas = action.payload;
			break;
		case 'IDEA_CREATED':
		case 'IDEA_UPDATED':
			draft.ideas[action.payload.id] = action.payload;
			break;
		case 'IDEA_DELETED':
			const deletedId = action.payload;
			delete draft.ideas[deletedId];
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

const Grid = styled.ol`
	display: grid;
	grid-template-columns: repeat(auto-fill, 150px);
	grid-template-rows: repeat(auto-fill, 150px);
	grid-gap: 10px;
	grid-auto-rows: 150px;
`;

const loaderKeyframes = keyframes`
	0% {
		opacity: 0;
	}
`;

const LoaderBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border: var(--border);
	border-radius: 2px;
	animation: ${loaderKeyframes} 666ms alternate infinite both;
`;

function Loader() {
	return (
		<>
			<LoaderBox />
			<LoaderBox style={{ animationDelay: '100ms' }} />
			<LoaderBox style={{ animationDelay: '200ms' }} />
		</>
	);
}
