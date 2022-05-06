import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import CssBaseline from '@mui/material/CssBaseline';

import { createContext, useMemo, useState, useEffect } from 'react';
import { ThemeOptions, createTheme, ThemeProvider } from '@mui/material/styles';

import useMediaQuery from '@mui/material/useMediaQuery';

const ColorModeContext = createContext({ toggleColorMode: () => {} });
/* 
declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		palette: {
			mode: 'dark' | 'light';
			primary: {
				main: string;
			};
			secondary: {
				main: string;
			};
			success: {
				main: string;
			};
		};
		typography: {
			fontFamily: string;
		};
		components: {
			MuiAppBar: {
				styleOverrides: {
					colorDefault: 'transparent';
				};
			};
			MuiTooltip: {
				defaultProps: {
					arrow: boolean;
				};
			};
		};
		shape: {
			borderRadius: number;
		};
		[key: string]: any;
	}
} */

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	let autoMode;
	let prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const [mode, setMode] = useState<'light' | 'dark'>(autoMode || 'dark');

	useEffect(() => {
		if (window) {
			autoMode = window.localStorage.getItem('colorMode');

			if (!autoMode) autoMode = prefersDarkMode ? 'dark' : 'light';

			setMode(autoMode || 'dark');
		}
	}, []);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => {
					const newMode = prevMode === 'light' ? 'dark' : 'light';

					window.localStorage.setItem('colorMode', newMode);

					return newMode;
				});
			},
		}),
		[]
	);

	let theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: '#DAF323',
					},
					secondary: {
						main: '#f3a323',
					},
					success: {
						main: '#23f33b',
					},
				},
				typography: {
					fontFamily: [
						'Poppins',
						'-apple-system',
						'BlinkMacSystemFont',
						'Roboto',
						'"Helvetica Neue"',
						'Arial',
						'sans-serif',
						'"Apple Color Emoji"',
						'"Segoe UI Emoji"',
						'"Segoe UI Symbol"',
					].join(','),
					h2: {
						fontWeight: 200,
						color: 'black',
					},
				},
				components: {
					MuiAppBar: {
						styleOverrides: {
							colorDefault: 'transparent',
						},
					},
					MuiTooltip: {
						defaultProps: {
							arrow: true,
						},
					},
				},
				shape: {
					borderRadius: 8,
				},
			}),
		[mode]
	);

	return (
		<SessionProvider session={session}>
			<ColorModeContext.Provider value={colorMode}>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Component {...pageProps} cmc={ColorModeContext} />
				</ThemeProvider>
			</ColorModeContext.Provider>
		</SessionProvider>
	);
}
