import Head from 'next/head';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PlusIcon from '@mui/icons-material/AddRounded';

import { useContext, createContext, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export interface Props {
	cmc: typeof ColorModeContext;
}

let appName = 'stepha.xyz';

const pages = [
	{ name: 'Sobre mim' },
	{ name: 'Doações' },
	{ name: 'Blog' },
	//{ url: '/api/invite', name: 'Me adicione' },
];

const HomePage: React.FC<Props> = ({ cmc }) => {
	const { data: session } = useSession();

	const settings = [
		{ name: 'Profile' },
		{ name: 'Account' },
		{ name: 'Dashboard' },
		{
			name: 'Logout',
			onClick: () => {
				window.location.href = '/api/auth/signout';
			},
		},
	];

	const theme = useTheme();
	const colorMode = useContext(cmc);

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<div
			style={{
				background: theme.palette.background.default,
				width: '100vw',
				height: '100vh',
			}}
		>
			<Head>
				<title>Stephanie - a IA mais divertida do Discord</title>
				<meta
					name="description"
					content="Olá! Eu sou a Stephanie, é um prazer. Espero que se divirta comigo, tanto aqui quanto no Discord... Qualquer coisa, é só chamar meus amigos do suporte pra te ajudar!"
				/>

				<meta name="viewport" content="initial-scale=1, width=device-width" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</Head>

			<main>
				<AppBar position="static">
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									fontFamily: 'Poppins',
									mr: 2,
									display: { xs: 'none', md: 'flex' },
								}}
							>
								{appName}
							</Typography>
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: 'block', md: 'none' },
									}}
								>
									{pages.map((page) => (
										<MenuItem
											key={page['name']}
											onClick={() => {
												if (typeof page['url'] === 'string')
													window.location.href = page['url'];

												handleCloseNavMenu();
											}}
										>
											<Typography textAlign="center">{page['name']}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									fontFamily: 'Poppins',
									flexGrow: 1,
									display: { xs: 'flex', md: 'none' },
								}}
							>
								{appName}
							</Typography>
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								{pages.map((page) => (
									<Button
										key={page['name']}
										onClick={() => {
											if (typeof page['url'] === 'string')
												window.location.href = page['url'];

											handleCloseNavMenu();
										}}
										sx={{
											my: 2,
											color: `${theme.palette.text.secondary}`,
											display: 'block',
										}}
									>
										{page['name']}
									</Button>
								))}
							</Box>
							<Box sx={{ flexGrow: 0 }}>
								<IconButton
									size="large"
									sx={{ ml: 1 }}
									onClick={colorMode.toggleColorMode}
									color="inherit"
								>
									{theme.palette.mode === 'dark' ? (
										<Brightness7Icon />
									) : (
										<Brightness4Icon />
									)}
								</IconButton>
								{session ? (
									<Tooltip title="Abrir configurações">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt={`${session.user['name']}${session.user['discriminator']}`}
												src={session.user['image']}
											/>
										</IconButton>
									</Tooltip>
								) : (
									<Tooltip title="Me adicione">
										<IconButton
											key={'invite'}
											onClick={() => {
												window.location.href = '/api/auth/signin/discord';
											}}
											size="large"
											sx={{ ml: 1 }}
											/* sx={{
												my: 2,
												color: `${theme.palette.text.secondary}`,
												display: 'block',
											}} */
											color="inherit"
										>
											<PlusIcon />
										</IconButton>
									</Tooltip>
								)}
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem
											key={setting.name}
											onClick={() => {
												if (setting['onClick'] instanceof Function) {
													setting['onClick']();
												}

												handleCloseUserMenu();
											}}
										>
											<Typography textAlign="center">{setting.name}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</main>
		</div>
	);
};

export default HomePage;
