const APIInvite = async (req, res) => {
	res.redirect(
		`https://discord.com/api/oauth2/authorize?client_id=938908893965336656&permissions=8&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=guilds.join%20guilds%20bot%20identify%20applications.commands`
	);
};

export default APIInvite;
