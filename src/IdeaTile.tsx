import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { colors } from './styles';
import { Idea } from './types';

type UpdateKey = 'title' | 'body';

type IdeaTileProps = {
	idea: Idea;
	onDelete: () => void;
	onUpdate: (updateKey: UpdateKey, value: string) => void;
};

const MAX_BODY_LENGTH = 140;

export const IdeaTile: FC<IdeaTileProps> = ({
	idea,
	onDelete,
	onUpdate,
}) => {
	const [count, setCount] = useState(idea.body ? idea.body.length : 0);
	const remainingCount = MAX_BODY_LENGTH - count;

	return (
		<li
			css={css`
				display: flex;
				flex-direction: column;
				position: relative;
				background-color: ${colors.brand};
				box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.13);

				&:hover button {
					display: block;
				}
			`}
		>
			<Input
				type="text"
				defaultValue={idea.title}
				placeholder="title"
				onBlur={event => onUpdate('title', event.target.value)}
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
					font-size: 0.75rem;

					&:focus + .count {
						display: block;
					}
				`}
			/>
			{remainingCount < 15 && (
				<span
					className="count"
					css={css`
						display: none;
						padding: 4px 8px;
						position: absolute;
						bottom: 0;
						right: 0;
						background-color: red;
						color: white;
						font-size: 10px;
					`}
				>
					{remainingCount}
				</span>
			)}
			<button
				type="button"
				onClick={onDelete}
				css={css`
					display: none;
					position: absolute;
					top: 8px;
					right: 8px;
				`}
			>
				Delete
			</button>
		</li>
	);
};

const Input = styled.input`
	width: 100%;
	padding: 8px;
	background-color: transparent;
	border: none;
	border-bottom: 2px solid transparent;
	resize: none;

	&:focus {
		outline: none;
		background-color: rgba(255, 255, 255, 0.5);
		border-bottom: 2px solid ${colors.black};
	}
`;
