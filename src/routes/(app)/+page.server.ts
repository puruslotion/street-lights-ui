import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const res = await fetch('http://localhost:3000/api/v1/user/isuserloggedin', {
		method: 'GET',
		credentials: 'include'
	});

	const json = await res.json();

	if (json.status !== 200) {
		redirect(307, '/login');
	}

	return json;
}
