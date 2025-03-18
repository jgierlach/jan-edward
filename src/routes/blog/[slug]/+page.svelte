<script>
	export let data;
</script>

<div class="mx-auto max-w-4xl px-4 py-8">
	<article class="prose mx-auto lg:prose-xl dark:prose-invert">
		<h1>{data.post.title}</h1>
		<time class="mb-8 block text-sm text-gray-500 dark:text-gray-400">
			{new Date(data.post.date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</time>

		{@html data.post.html}
	</article>
</div>
