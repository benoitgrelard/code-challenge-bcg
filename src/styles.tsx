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
		--background-color: hsl(var(--hue), 100%, 45%);
		--border-color: hsl(var(--hue), 80%, 65%);
		--border: 1px solid var(--border-color);
		--focus-color: hsl(var(--hue), 100%, 40%);
	}

	body {
		margin: 0;
		padding: 5vw;
		background-color: var(--background-color);
		color: white;
		/* System Fonts as used by GitHub */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		font-size: 1rem;
		font-weight: 100;
		overflow-x: hidden;
	}

	::selection {
		background-color: hsl(var(--hue), 80%, 85%);
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
