import React, { FC, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Idea } from './types';
import { DeleteIcon, LoadingIcon } from './icons';

type UpdateKey = 'title' | 'body';

type IdeaTileProps = {
	idea: Idea;
	onDelete: () => void;
	isDeleting: boolean;
	onUpdate: (updateKey: UpdateKey, value: string) => void;
	enterDelay: number;
};

const MAX_BODY_LENGTH = 140;

export const IdeaTile: FC<IdeaTileProps> = ({
	idea,
	onDelete,
	isDeleting,
	onUpdate,
	enterDelay,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const [count, setCount] = useState(idea.body ? idea.body.length : 0);
	const remainingCount = MAX_BODY_LENGTH - count;

	return (
		<Tile
			delay={enterDelay}
			onMouseOver={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Input
				type="text"
				defaultValue={idea.title}
				placeholder="title"
				onBlur={event => onUpdate('title', event.target.value)}
			/>
			<Textarea
				defaultValue={idea.body}
				placeholder="body"
				onBlur={event => onUpdate('body', event.target.value)}
				onChange={event => setCount(event.target.value.length)}
				maxLength={MAX_BODY_LENGTH}
			/>

			{remainingCount < 15 && (
				<CharacterCount className="count">{remainingCount}</CharacterCount>
			)}

			{(isHovering || isDeleting) && (
				<DeleteButton type="button" onClick={onDelete} disabled={isDeleting}>
					{isDeleting ? <LoadingIcon /> : <DeleteIcon />}
				</DeleteButton>
			)}
		</Tile>
	);
};

export const tileEnterKeyframes = keyframes`
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
`;

const Tile = styled.li<{ delay: number }>`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: hsl(var(--hue), 60%, 99%);
	background-image: linear-gradient(to bottom, hsla(0, 100%, 100%, 0), white);
	border: 1px solid white;
	border-radius: 2px;
	box-shadow: 0 12px 32px -8px hsl(var(--hue), 15%, 70%),
		0 2px 6px hsl(var(--hue), 30%, 60%);
	animation: ${tileEnterKeyframes} 666ms backwards;
	animation-delay: ${props => props.delay}ms;

	/* for a greater hover area */
	&::before {
		content: '';
		position: absolute;
		top: -8px;
		right: -8px;
		bottom: -8px;
		left: -8px;
	}
`;

const inputStyles = css`
	width: 100%;
	padding: 12px 16px;
	position: relative;
	z-index: 1;
	background-color: transparent;
	border: none;
	transition: 333ms;

	&:focus {
		outline: none;
		background-color: hsl(var(--hue), 50%, 95%);
		box-shadow: inset 0 -2px 0 var(--color-primary);
	}

	&::placeholder {
		color: hsl(var(--hue), 70%, 85%);
	}
`;

const Input = styled.input`
	${inputStyles};
`;

const Textarea = styled.textarea`
	${inputStyles};
	resize: none;
	flex: 1;
	padding-top: 8px;
	padding-bottom: 8px;
	color: hsl(var(--hue), 60%, 60%);
	font-size: 0.8rem;
	line-height: 1.6;

	&:focus + ${() => CharacterCount} {
		opacity: 1;
	}
`;

const scaleEnterKeyframes = keyframes`
	0% {
		transform: scale(0);
	}
`;

const circleStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	position: absolute;
	z-index: 1;
	border-radius: 12px;
	animation: ${scaleEnterKeyframes} 333ms;
`;

const CharacterCount = styled.span`
	${circleStyles};
	opacity: 0;
	bottom: -12px;
	right: -12px;
	border-radius: 12px;
	border-color: red;
	background-color: hsl(354, 80%, 45%);
	color: white;
	font-size: 0.75rem;
`;

const DeleteButton = styled.button`
	${circleStyles};
	top: -12px;
	right: -12px;
	background-color: var(--color-primary);
	border: none;
	color: white;
	transition: transform 333ms;

	&:focus,
	&:hover {
		outline: none;
		transform: scale(1.2);
	}
`;
