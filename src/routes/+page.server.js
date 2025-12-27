import { getAllPosts } from '$lib/posts/utils';

export async function load() {
	const posts = await getAllPosts();
	const latestPosts = posts.slice(0, 3); // Get 3 most recent posts

	return {
		latestPosts
	};
}
