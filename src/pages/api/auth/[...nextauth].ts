import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

let CALLBACK_URL =
	process.env.NEXTAUTH_CALLBACK_URL ||
	'http://localhost:3000/api/auth/callback/discord';

/* CALLBACK_URL = CALLBACK_URL.includes('https://')
	? CALLBACK_URL.replace('https://', 'https%3A%2F%2F')
	: CALLBACK_URL.replace('http://', 'http%3A%2F%2F');

CALLBACK_URL = CALLBACK_URL.replace(':3000', '%3A3000');
CALLBACK_URL = CALLBACK_URL.replace('/', '%2'); */

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		DiscordProvider({
			authorization: `https://discord.com/api/oauth2/authorize?client_id=938908893965336656&permissions=1642824330742&redirect_uri=${CALLBACK_URL}&response_type=code&scope=identify%20guilds%20guilds.join%20applications.commands%20email%20connections%20bot`,
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
});
