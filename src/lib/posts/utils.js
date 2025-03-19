import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const POSTS_DIR = 'src/lib/posts';

export function getAllPosts() {
	const files = fs.readdirSync(POSTS_DIR);
	const posts = files
		.filter((file) => file.endsWith('.md'))
		.map((file) => {
			const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
			const { data, content: markdown } = matter(content);
			const html = marked(markdown);
			const slug = file.replace('.md', '');

			return {
				slug,
				html,
				...data
			};
		})
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	return posts;
}

export function getPost(slug) {
	const file = path.join(POSTS_DIR, `${slug}.md`);
	const content = fs.readFileSync(file, 'utf-8');
	const { data, content: markdown } = matter(content);
	const html = marked(markdown);

	return {
		slug,
		html,
		...data
	};
}
