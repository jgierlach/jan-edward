import { getPost } from '$lib/posts/utils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await getPost(params.slug);

		return {
			post
		};
	} catch {
		throw error(404, 'Post not found');
	}
}
