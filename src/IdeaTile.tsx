import React, { FC, useState } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Idea } from './types';
import { DeleteIcon } from './icons';

type UpdateKey = 'title' | 'body';

type IdeaTileProps = {
	idea: Idea;
	onDelete: () => void;
	onUpdate: (updateKey: UpdateKey, value: string) => void;
	enterDelay: number;
};

const MAX_BODY_LENGTH = 140;

export const IdeaTile: FC<IdeaTileProps> = ({
	idea,
	onDelete,
	onUpdate,
	enterDelay,
}) => {
	const [count, setCount] = useState(idea.body ? idea.body.length : 0);
	const remainingCount = MAX_BODY_LENGTH - count;

	return (
		<li
			css={css`
				display: flex;
				flex-direction: column;
				position: relative;
				border: var(--border);
				border-radius: 2px;
				animation: ${tileEnterKeyframes} 666ms backwards;
				animation-delay: ${enterDelay}ms;

				&:hover button {
					opacity: 1;
				}

				&::after {
					content: '';
					width: 100%;
					height: 48px;
					position: absolute;
					bottom: 0;
					background-image: linear-gradient(
						to top,
						var(--background-color),
						transparent
					);
					pointer-events: none;
				}
			`}
		>
			<Input
				type="text"
				defaultValue={idea.title}
				placeholder="title"
				onBlur={event => onUpdate('title', event.target.value)}
				css={css``}
			/>
			<Input
				as="textarea"
				defaultValue={idea.body}
				placeholder="body"
				onBlur={event => onUpdate('body', event.target.value)}
				onChange={event => setCount(event.target.value.length)}
				maxLength={MAX_BODY_LENGTH}
				css={css`
					flex: 1;
					color: hsl(var(--hue), 90%, 87%);
					font-size: 0.75rem;
					line-height: 1.6;

					&:focus + .count {
						opacity: 1;
					}
				`}
			/>
			{remainingCount < 15 && (
				<span
					className="count"
					css={css`
						${offBoxStyles};
						opacity: 0;
						bottom: -5px;
						right: -5px;
						background-color: hsl(324, 80%, 45%);
						font-size: 0.75rem;
					`}
				>
					{remainingCount}
				</span>
			)}
			<button
				type="button"
				onClick={onDelete}
				css={css`
					${offBoxStyles};
					opacity: 0;
					top: -5px;
					right: -5px;

					&:focus,
					&:hover {
						outline: none;
						background-color: var(--focus-color);
					}
				`}
			>
				<DeleteIcon />
			</button>
		</li>
	);
};

const Input = styled.input`
	width: 100%;
	padding: 8px;
	background-color: transparent;
	border: none;
	resize: none;

	&:focus {
		outline: none;
		background-color: var(--focus-color);
	}

	&::placeholder {
		color: var(--border-color);
	}
`;

const offBoxStyles = css`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	position: absolute;
	z-index: 1;
	background-color: var(--background-color);
	border: var(--border);
	border-radius: 2px;
`;

export const tileEnterKeyframes = keyframes`
	0% {
		opacity: 0;
		transform: translateY(10px);
	}
`;
