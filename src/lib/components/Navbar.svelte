<script>
	import { page } from '$app/state'; // Correct import for $page store

	let menuOpen = false;
	let theme = 'light';

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}

	// Helper function to determine if a link is active
	function isActive(path, hash = '') {
		return page.url.pathname === path && (!hash || page.url.hash === hash);
	}

	// style="background: #10263b;"
	// style = 'background: #0e2439';
</script>

<nav
	class="navbar bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white shadow-lg backdrop-blur-md md:px-8"
>
	<div class="flex flex-1 items-center">
		<img
			src="/logos/core-labs-logo-sm.png"
			alt="Core Labs Logo"
			class="mr-2 h-12 w-10 object-contain"
		/>
		<a href="/" class="text-2xl font-bold tracking-tight">Core Labs</a>
	</div>

	<div class="hidden space-x-6 md:flex">
		<a
			href="/#about"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#about')}>About</a
		>
		<a
			href="/blog"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/blog', '/blog')}>Blog</a
		>
		<a
			href="/#our-businesses"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#our-businesses')}>Our Businesses</a
		>
		<a
			href="https://www.youtube.com/@CoreLabsDigital"
			target="_blank"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/blog', '/blog')}>YouTube Channel</a
		>
		<a
			href="/#contact"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#contact')}>Contact</a
		>
	</div>

	<div class="md:hidden">
		<button class="btn btn-ghost" on:click={() => (menuOpen = !menuOpen)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-6 w-6 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16m-7 6h7"
				></path>
			</svg>
		</button>
	</div>
</nav>

<!-- Mobile Navbar -->
{#if menuOpen}
	<div
		class="absolute left-0 right-0 top-16 z-50 flex flex-col items-start bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white shadow-md md:hidden"
	>
		<a
			href="/#about"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#about')}>About</a
		>
		<a
			href="/blog"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/blog', '/blog')}>Blog</a
		>
		<a
			href="/#our-businesses"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#our-businesses')}>Our Businesses</a
		>
		<a
			href="https://www.youtube.com/@CoreLabsDigital"
			target="_blank"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/blog', '/blog')}>YouTube Channel</a
		>
		<a
			href="/#contact"
			class="btn btn-ghost text-white hover:text-gray-200"
			class:btn-active={isActive('/', '#contact')}>Contact</a
		>
	</div>
{/if}
