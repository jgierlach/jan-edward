import { getPost } from '$lib/blog/utils';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	try {
		const post = getPost(params.slug);

		return {
			post
		};
	} catch {
		throw error(404, 'Post not found');
	}
}
