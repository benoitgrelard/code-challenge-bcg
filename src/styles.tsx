import { createGlobalStyle } from 'styled-components/macro';
import { normalize } from 'polished';

export const colors = {
	brand: '#FFD400',
	white: 'white',
	black: 'black',
};

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
	}

	body {
		margin: 0;
		padding: 5vmin;
		background-color: ${colors.white};
		color: ${colors.black};
		/* System Fonts as used by GitHub */
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
			Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		font-size: 1rem;
		font-weight: 300;
		overflow-x: hidden;
	}

	::selection {
		/* background-color: hsl(var(--hue), 75%, 92%); */
	}

	ul, ol {
		list-style: none;
		padding-left: 0;
	}

	button {
		font-family: inherit;
		line-height: normal;
		border-radius: 0;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
	}

	input {
		font-family: inherit;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
	}
`;
