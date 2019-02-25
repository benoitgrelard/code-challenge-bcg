import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'polished';

export const GlobalStyles = createGlobalStyle`
	${normalize()};

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html {
		font-size: 16px;
		line-height: 1.5;
		-webkit-text-size-adjust: 100%;
		--hue: 256;
		--color-primary: hsl(var(--hue), 100%, 45%);
	}

	body {
		margin: 0;
		padding: 0;
		background-color: hsl(var(--hue), 40%, 96%);
		color: var(--color-primary);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		font-size: 1rem;
		font-weight: 100;
		overflow-x: hidden;
	}

	#root {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	::selection {
		background-color: hsl(var(--hue), 70%, 92%);
	}

	* {
		font-weight: inherit;
	}

	ul, ol {
		list-style: none;
		padding-left: 0;
	}

	button {
		padding: 0;
		color: inherit;
		font-family: inherit;
		line-height: normal;
		border-radius: 0;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
	}

	input, textarea, select {
		color: inherit;
		font-family: inherit;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
	}
`;
