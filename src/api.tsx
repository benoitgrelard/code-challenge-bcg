import uuid from 'uuid/v4';
import produce from 'immer';
import { Idea } from './types';
import { DEFAULT_IDEAS } from './data';

export function getIdeas() {
	return delay(getStoredIdeas(), getRandomInt(1500, 2000));
}

export function createIdea() {
	const idea: Idea = {
		id: uuid(),
		createdAt: new Date().getTime(),
	};

	const ideas = produce(getStoredIdeas(), draft => {
		draft[idea.id] = idea;
	});
	storeIdeas(ideas);

	return delay(idea);
}

type UpdateIdeaInput = {
	id: string;
	title?: string;
	body?: string;
};

export function updateIdea({ id, title, body }: UpdateIdeaInput) {
	const ideas = produce(getStoredIdeas(), draft => {
		draft[id].title = title;
		draft[id].body = body;
	});
	storeIdeas(ideas);

	return delay(ideas[id]);
}

export function deleteIdea(id: string) {
	const ideas = produce(getStoredIdeas(), draft => {
		delete draft[id];
	});
	storeIdeas(ideas);

	return delay(id);
}

function getStoredIdeas() {
	const storedIdeas = window.localStorage.getItem('ideas');
	return storedIdeas
		? (JSON.parse(storedIdeas) as Record<string, Idea>)
		: DEFAULT_IDEAS;
}

function storeIdeas(ideas: Record<string, Idea>) {
	window.localStorage.setItem('ideas', JSON.stringify(ideas));
}

function delay<T>(data: T, delayOverride?: number) {
	return new Promise<T>((resolve, reject) =>
		setTimeout(
			() => resolve(data),
			delayOverride !== undefined ? delayOverride : getRandomInt(100, 600)
		)
	);
}

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
