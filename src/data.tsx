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
	title: 'Something long',
	body: `This is a pretty long description, let's try and make it as long as possible for the counter to kick in. Is it going to start now? or never?`,
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
