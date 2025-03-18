import { getAllPosts } from '$lib/blog/utils';

export function load() {
	const posts = getAllPosts();

	return {
		posts
	};
}
