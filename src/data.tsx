import uuid from 'uuid/v4';
import { Idea } from './types';

const IDEA_1: Idea = {
	id: uuid(),
	title: 'My first idea',
	body: 'Do something',
	createdAt: new Date().getTime(),
};

const IDEA_2: Idea = {
	id: uuid(),
	title: 'Cool thing',
	body: 'Try that',
	createdAt: new Date().getTime(),
};

const IDEA_3: Idea = {
	id: uuid(),
	title: 'Game changer',
	body: 'What about this?',
	createdAt: new Date().getTime(),
};

export const DEFAULT_IDEAS: Record<string, Idea> = {
	[IDEA_1.id]: IDEA_1,
	[IDEA_2.id]: IDEA_2,
	[IDEA_3.id]: IDEA_3,
};
