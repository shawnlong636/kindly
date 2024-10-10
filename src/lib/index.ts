import { InstallProvider } from '@slack/oauth';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from '$env/static/private';

export const installProvider = new InstallProvider({
	clientId: SLACK_CLIENT_ID,
	clientSecret: SLACK_CLIENT_SECRET,
	stateSecret: 'some-state-secret'
});
