import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// const POSTS_DIR = 'src/lib/posts';

const POSTS_DIR = path.resolve('src/lib/posts'); // Use absolute path

export function getAllPosts() {
	const files = import.meta.glob('/src/lib/posts/*.md', { eager: true });

	console.log('Bundled Posts:', files);

	return Object.entries(files)
		.map(([filePath, file]) => {
			// Ensure file has a default export
			if (!file || !file.default) {
				console.error(`Skipping ${filePath} due to missing default export`);
				return null;
			}

			const slug = filePath.split('/').pop().replace('.md', '');

			const filePathAbsolute = path.join(POSTS_DIR, `${slug}.md`);

			try {
				// Read the actual file content from the filesystem
				const content = fs.readFileSync(filePathAbsolute, 'utf-8');
				const { data, content: markdown } = matter(content);
				const html = marked(markdown);
				return { slug, html, ...data };
			} catch (error) {
				console.error(`Error reading ${filePathAbsolute}:`, error);
				return null;
			}
		})
		.filter(Boolean) // Remove any null values
		.sort((a, b) => new Date(b.date) - new Date(a.date));
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
