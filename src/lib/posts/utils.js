import { marked } from 'marked';

const API_URL = 'https://api.corelabs.digital/blog-posts/5244b628-4ece-45d0-8746-87286c5e69c4';

/**
 * Fetches all blog posts from the API
 * @returns {Promise<Array>} Array of blog posts
 */
async function fetchBlogPosts() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		return data.blogPosts || [];
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		throw error;
	}
}

/**
 * Transforms API blog post data to match the expected format
 * @param {Object} apiPost - Blog post from API
 * @returns {Object} Transformed blog post
 */
function transformPost(apiPost) {
	// Convert markdown content to HTML
	const html = marked(apiPost.content || '');

	// Parse published date
	const date = apiPost.published_date ? new Date(apiPost.published_date) : new Date();

	// Extract description from meta_description or generate from content
	const description = apiPost.meta_description || 
		(apiPost.content ? apiPost.content.substring(0, 200).replace(/\n/g, ' ').trim() + '...' : '');

	return {
		slug: apiPost.slug,
		html,
		title: apiPost.title,
		date,
		description,
		headerImage: apiPost.featured_image,
		metaTitle: apiPost.meta_title,
		metaDescription: apiPost.meta_description,
		id: apiPost.id,
		createdAt: apiPost.created_at,
		updatedAt: apiPost.updated_at
	};
}

/**
 * Gets all blog posts from the API
 * @returns {Promise<Array>} Array of transformed blog posts, sorted by date (newest first)
 */
export async function getAllPosts() {
	const posts = await fetchBlogPosts();
	return posts
		.map(transformPost)
		.sort((a, b) => {
			const dateA = a.date instanceof Date ? a.date : new Date(0);
			const dateB = b.date instanceof Date ? b.date : new Date(0);
			return dateB - dateA;
		});
}

/**
 * Fetches a single blog post by slug from the API
 * @param {string} slug - The slug of the post to retrieve
 * @returns {Promise<Object>} The blog post from API
 */
async function fetchBlogPost(slug) {
	try {
		const response = await fetch(`${API_URL}/${slug}`);
		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(`Post with slug "${slug}" not found`);
			}
			throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
		}
		const data = await response.json();
		return data.blogPost;
	} catch (error) {
		console.error(`Error fetching blog post "${slug}":`, error);
		throw error;
	}
}

/**
 * Gets a single blog post by slug
 * @param {string} slug - The slug of the post to retrieve
 * @returns {Promise<Object>} The transformed blog post
 */
export async function getPost(slug) {
	const post = await fetchBlogPost(slug);

	if (!post) {
		throw new Error(`Post with slug "${slug}" not found`);
	}

	return transformPost(post);
}
