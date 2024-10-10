import type { RequestHandler } from './$types';
import { installProvider } from '$lib/slack';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const code = url.searchParams.get('code');
		if (!code) {
			return new Response(JSON.stringify({ error: 'Missing code parameter' }), { status: 400 });
		}

		const response = await installProvider.fetchOAuthAccess({ code });

		if (!response.access_token) {
			return new Response(JSON.stringify({ error: 'Failed to retrieve access token' }), {
				status: 500
			});
		}

		// TODO: Add later
		// const {
		// 	access_token: accessToken,
		// 	team_id: teamId,
		// 	bot_user_id: botUserId,
		// 	authed_user
		// } = response;

		// await prisma.slackOAuth.upsert({
		// 	where: { teamId },
		// 	update: {
		// 		accessToken,
		// 		botUserId,
		// 		authedUserId: authed_user.id,
		// 		scope: response.scope || '',
		// 		updatedAt: new Date()
		// 	},
		// 	create: {
		// 		teamId,
		// 		accessToken,
		// 		botUserId,
		// 		authedUserId: authed_user.id,
		// 		scope: response.scope || ''
		// 	}
		// });

		// Store the access token and other info in your database.
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error: unknown) {
		// Check the type of error
		if (error instanceof Error) {
			console.error('Error fetching OAuth access:', error.message);
			return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		} else {
			return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 });
		}
	}
};
