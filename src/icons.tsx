import React from 'react';
import { keyframes, css } from 'styled-components/macro';

export function AddIcon() {
	return (
		<svg
			width={32}
			height={32}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 5v14M5 12h14" />
		</svg>
	);
}

export function DeleteIcon() {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

export function LoadingIcon() {
	return (
		<svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			css={css`
				animation: ${spin} 1s linear infinite;
			`}
		>
			<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
		</svg>
	);
}

const spin = keyframes`
	100% {
		transform: rotateZ(360deg);
	}
`;
