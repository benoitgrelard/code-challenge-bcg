import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components/macro';
import produce from 'immer';
import { GlobalStyles } from './styles';
import { getIdeas, createIdea, deleteIdea, updateIdea } from './api';
import { Idea } from './types';
import { IdeaTile } from './IdeaTile';

type State = {
	isLoading: boolean;
	ideas: Record<string, Idea>;
	sortCriteria: SortCriteria;
};

type SortCriteria = 'title' | 'createdAt';

export function App() {
	const [state, dispatch] = useReducer(reducer, {
		isLoading: false,
		ideas: {},
		sortCriteria: 'title',
	});

	useEffect(() => {
		dispatch({ type: 'FETCH_IDEAS' });
		getIdeas().then(ideas =>
			dispatch({ type: 'IDEAS_FETCHED', payload: ideas })
		);
	}, []);

	const sortedIdeas = getSortedIdeas(state.ideas, state.sortCriteria);

	return (
		<>
			<GlobalStyles />
			<h1>Ideas Board</h1>

			<div>
				<button
					type="button"
					onClick={() =>
						createIdea().then(idea =>
							dispatch({ type: 'IDEA_CREATED', payload: idea })
						)
					}
				>
					Add new idea
				</button>
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
					<option value="createdAt">Date created (newer first)</option>
				</select>
			</div>

			{state.isLoading ? (
				<p>loading ideas…</p>
			) : sortedIdeas.length === 0 ? (
				<p>No ideas yet!</p>
			) : (
				<Grid>
					{sortedIdeas.map(idea => (
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
						/>
					))}
				</Grid>
			)}
		</>
	);
}

type Action =
	| { type: 'FETCH_IDEAS' }
	| { type: 'IDEAS_FETCHED'; payload: Record<string, Idea> }
	| { type: 'IDEA_CREATED'; payload: Idea }
	| { type: 'IDEA_UPDATED'; payload: Idea }
	| { type: 'IDEA_DELETED'; payload: string }
	| { type: 'UPDATE_SORT_CRITERIA'; payload: SortCriteria };

const reducer = produce((draft: State, action: Action) => {
	switch (action.type) {
		case 'FETCH_IDEAS':
			draft.isLoading = true;
			break;
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
	return title1 < title2 ? -1 : title1 > title2 ? 1 : 0;
}

function sortByCreationDate(idea1: Idea, idea2: Idea) {
	return idea2.createdAt - idea1.createdAt;
}

export const Grid = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, 150px);
	grid-template-rows: repeat(auto-fill, 150px);
	grid-gap: 10px;
	grid-auto-rows: 150px;
`;
