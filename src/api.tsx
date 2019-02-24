import uuid from 'uuid/v4';
import { Idea } from './types';
import { DEFAULT_IDEAS } from './data';

export function getIdeas() {
	return delay(getStoredIdeas());
}

export function createIdea() {
	const idea: Idea = {
		id: uuid(),
		createdAt: new Date().getTime(),
	};

	const ideas = getStoredIdeas();
	const updatedIdeas = { ...ideas, [idea.id]: idea };
	storeIdeas(updatedIdeas);

	return delay(idea);
}

type UpdateIdeaInput = {
	id: string;
	title?: string;
	body?: string;
};

export function updateIdea({ id, title, body }: UpdateIdeaInput) {
	const ideas = getStoredIdeas();
	const updatedIdeas = { ...ideas, [id]: { ...ideas[id], title, body } };
	storeIdeas(updatedIdeas);

	return delay(updatedIdeas[id]);
}

export function deleteIdea(id: string) {
	const { [id]: removedIdea, ...updatedIdeas } = getStoredIdeas();
	storeIdeas(updatedIdeas);

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

function delay<T>(data: T) {
	return new Promise<T>((resolve, reject) =>
		setTimeout(() => resolve(data), getRandomInt(100, 600))
	);
}

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
