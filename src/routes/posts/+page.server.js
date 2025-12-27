import { getAllPosts } from '$lib/posts/utils';

export async function load() {
	const posts = await getAllPosts();

	return {
		posts
	};
}
