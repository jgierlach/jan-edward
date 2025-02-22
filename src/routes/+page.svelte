<script>
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { loadStripe } from '@stripe/stripe-js';

	const COACHING_CALL_PRICE_ID = 'price_1Qn5vrRwAkKhSEhM28Lg4EEu';

	async function checkout() {
		const stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				priceId: COACHING_CALL_PRICE_ID,
				mode: 'payment'
			})
		});

		if (response.ok) {
			const { sessionId } = await response.json();
			stripe?.redirectToCheckout({ sessionId });
		} else {
			console.error(response.json());
			alert('Redirect to Stripe checkout failed');
			return;
		}
	}

	// Contact form fields
	let name = $state('');
	let email = $state('');
	let message = $state('');

	function resetFormFields() {
		name = '';
		email = '';
		message = '';
	}

	let showSubmissionSuccess = $state(false);
	async function submitContactForm(event) {
		event.preventDefault();
		const response = await fetch('/api/contact-form-submission', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				message
			})
		});
		if (response.ok) {
			showSubmissionSuccess = true;
			resetFormFields();
			console.log('FORM FIELDS AFTER FUNC', name, email, message, showSubmissionSuccess);
		} else {
			console.error(await response.json());
			alert('Contact form submission unsuccessful.');
			return;
		}
	}
</script>

<svelte:head>
	<title>Core Labs</title>
	<meta
		property="description"
		content="Core Labs | The team to bring your next application to life"
	/>
</svelte:head>

<section
	class="relative flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-24 text-white dark:from-gray-900 dark:to-gray-800"
>
	<div class="max-w-4xl text-center">
		<!-- Title -->
		<h1 class="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
			🚀 Build and scale with proven strategies
		</h1>

		<!-- Subtitle -->
		<p class="mt-6 text-lg text-gray-200 sm:text-xl">
			We help business owners sell more, reduce costs, ship more, and stress less. No fluff. Just
			results.
		</p>

		<!-- CTA Buttons -->
		<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
			<a
				href="#contact"
				class="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 sm:w-auto"
			>
				📞 Get In Touch
			</a>
			<a
				href="#our-businesses"
				class="w-full rounded-lg bg-white px-6 py-3 text-lg font-medium text-indigo-600 shadow-lg transition-transform hover:scale-105 sm:w-auto"
			>
				🚀 See My Work
			</a>
			<a
				href="#latest-videos"
				class="w-full rounded-lg bg-white px-6 py-3 text-lg font-medium text-indigo-600 shadow-lg transition-transform hover:scale-105 sm:w-auto"
			>
				🎥 See My Content
			</a>
		</div>
	</div>

	<!-- Floating Image -->
	<div class="absolute right-12 top-16 hidden md:block">
		<img
			src="/logos/core-labs-logo-sm.png"
			alt="Core Labs"
			class="animate-float h-24 w-24 opacity-90 drop-shadow-lg"
		/>
	</div>
</section>

<!-- ABOUT SECTION BEGINS -->
<div
	class="bg-gradient-to-b from-gray-50 to-gray-100 py-16 dark:from-gray-900 dark:to-gray-800"
	id="about"
>
	<div class="container mx-auto flex flex-col items-center space-y-12 px-6">
		<h2 class="text-3xl font-extrabold text-gray-800 sm:text-4xl dark:text-white">
			Why should you care what I have to say?
		</h2>
		<div class="space-y-4 text-left">
			<p class="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl dark:text-gray-400">
				Hello 👋, my name is <span class="font-semibold text-gray-800 dark:text-white"
					>Jan-Edward</span
				>. I am a fullstack developer and business owner. Over the past 3 years, with my business
				parther and a talented team, we've generated
				<span class="font-semibold text-gray-800 dark:text-white">$2.35 million</span> in revenue by
				creating and scaling digital products and services.
			</p>
		</div>

		<!-- Image with Caption -->
		<div class="flex flex-col items-center space-y-4">
			<img
				src="/stripe-revenue-screenshot-half.png"
				alt="Stripe revenue screenshot"
				class="max-w-full rounded-lg object-cover shadow-lg sm:max-w-lg lg:max-w-2xl"
			/>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Stripe revenue screenshot (last 3 years)
			</p>
		</div>

		<div class="space-y-4 text-left">
			<p class="mx-auto max-w-3xl text-left text-lg text-gray-600 sm:text-xl dark:text-gray-400">
				And in just under 3 years <span class="font-semibold text-gray-800 dark:text-white"
					>$3.88</span
				> million in revenue selling on Amazon.
			</p>
		</div>

		<!-- Image with Caption -->
		<div class="flex flex-col items-center space-y-4">
			<img
				src="/amazon-revenue-screenshot.png"
				alt="Stripe revenue screenshot"
				class="max-w-full rounded-lg object-cover shadow-lg sm:max-w-lg lg:max-w-2xl"
			/>
			<p class="text-sm text-gray-500 dark:text-gray-400">Amazon revenue 1/31/2022 - 12/31/2024</p>
		</div>

		<div class="space-y-4 text-left">
			<p class="mx-auto max-w-3xl text-left text-lg text-gray-600 sm:text-xl dark:text-gray-400">
				<span class="font-semibold text-gray-800 dark:text-white"
					>So why should this matter to you?</span
				> Because I’ve built and scaled businesses from the ground up, I know what works (and what doesn’t).
				Whether it’s digital products, eCommerce, or automation-driven growth strategies, I’ve tested,
				optimized, and refined systems that drive real results. If you're looking for actionable insights,
				no-fluff strategies, and the lessons I’ve learned along the way, you’re in the right place.
			</p>
		</div>
	</div>
</div>
<!-- ABOUT SECTION ENDS -->

<!-- OUR BUSINESSES SECTION BEGINS -->
<section
	id="our-businesses"
	class="bg-gradient-to-br from-gray-100 to-gray-200 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-8 text-5xl font-bold text-gray-900 dark:text-white">🚀 Our Businesses</h2>

		<p class="mb-12 text-2xl text-gray-700 dark:text-gray-300">
			We've founded and operate the following businesses.
		</p>
		<!-- Business Cards Grid -->
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Business Card -->
			<div
				class="group relative rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900/70"
			>
				<!-- Business Logo -->
				<div
					class="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full bg-gray-200 ring-4 ring-indigo-500 transition duration-300 group-hover:ring-purple-500 dark:bg-gray-700"
				>
					<img src="/logos/osc-logo.png" alt="Business Logo" class="h-full w-full object-cover" />
				</div>

				<!-- Business Details -->
				<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
					Online Seller Consulting
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Monthly Revenue: <span class="font-semibold text-gray-900 dark:text-white">$50,000</span>
				</p>

				<!-- Button -->
				<div class="mt-6">
					<a
						href="https://www.onlinesellerconsulting.com/"
						target="_blank"
						class="btn btn-lg w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500"
					>
						Learn More 🚀
					</a>
				</div>
			</div>

			<!-- Business Card -->
			<div
				class="group relative rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900/70"
			>
				<div
					class="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full bg-gray-200 ring-4 ring-green-500 transition duration-300 group-hover:ring-yellow-500 dark:bg-gray-700"
				>
					<img src="/logos/ht-logo.png" alt="Business Logo" class="h-full w-full object-cover" />
				</div>
				<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">Hometown Industries</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Monthly Revenue: <span class="font-semibold text-gray-900 dark:text-white">$330,000</span>
				</p>
				<div class="mt-6">
					<a
						href="https://www.hometown-industries.com/"
						target="_blank"
						class="btn btn-lg w-full bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:from-yellow-500 hover:to-orange-500"
					>
						Learn More 🌱
					</a>
				</div>
			</div>

			<!-- Business Card -->
			<div
				class="group relative rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900/70"
			>
				<div
					class="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full bg-gray-200 ring-4 ring-red-500 transition duration-300 group-hover:ring-pink-500 dark:bg-gray-700"
				>
					<img src="/logos/ht-logo.png" alt="Business Logo" class="h-full w-full object-cover" />
				</div>
				<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">Svelte SaaS Kit</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Monthly Revenue: <span class="font-semibold text-gray-900 dark:text-white">$0</span>
				</p>
				<div class="mt-6">
					<a
						href="https://www.sveltesaaskit.com/"
						target="_blank"
						class="btn btn-lg w-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:from-yellow-500 hover:to-orange-500"
					>
						Learn More 🔥
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- OUR BUSINESSES SECTION ENDS -->

<!-- LATEST VIDEOS SECTION BEGINS -->
<section
	id="latest-videos"
	class="bg-gradient-to-br from-gray-100 to-gray-200 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-12 text-5xl font-bold text-gray-900 dark:text-white">🎥 Latest Videos</h2>

		<!-- Video Grid -->
		<div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<!-- Video 1 -->
			<div
				class="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
			>
				<iframe
					class="h-64 w-full rounded-xl"
					src="https://www.youtube.com/embed/dQw4w9WgXcQ"
					title="YouTube video player"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</div>

			<!-- Video 2 -->
			<div
				class="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
			>
				<iframe
					class="h-64 w-full rounded-xl"
					src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
					title="YouTube video player"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</div>

			<!-- Video 3 -->
			<div
				class="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
			>
				<iframe
					class="h-64 w-full rounded-xl"
					src="https://www.youtube.com/embed/ysz5S6PUM-U"
					title="YouTube video player"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</div>
		</div>
	</div>
</section>
<!-- LATEST VIDEOS SECTION ENDS -->

<!-- LATEST BLOGS SECTION BEGINS -->
<section
	id="latest-blogs"
	class="bg-gradient-to-b from-gray-50 to-gray-100 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-12 text-5xl font-bold text-gray-900 dark:text-white">📝 Latest Blogs</h2>

		<!-- Blog Cards Grid -->
		<div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			<!-- Blog Card 1 -->
			<div
				class="card bg-white shadow-xl transition-transform duration-300 hover:scale-105 dark:bg-gray-900"
			>
				<figure>
					<img
						src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
						alt="Blog Image"
						class="rounded-t-xl"
					/>
				</figure>
				<div class="card-body">
					<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
						The Future of Web Development
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Discover the latest trends in web development and how they shape the future.
					</p>
					<div class="mt-4">
						<a href="#" class="btn btn-primary w-full">Read More 📖</a>
					</div>
				</div>
			</div>

			<!-- Blog Card 2 -->
			<div
				class="card bg-white shadow-xl transition-transform duration-300 hover:scale-105 dark:bg-gray-900"
			>
				<figure>
					<img
						src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
						alt="Blog Image"
						class="rounded-t-xl"
					/>
				</figure>
				<div class="card-body">
					<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
						Scaling Your Online Business
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Learn proven strategies to grow and scale your e-commerce business effectively.
					</p>
					<div class="mt-4">
						<a href="#" class="btn btn-primary w-full">Read More 📖</a>
					</div>
				</div>
			</div>

			<!-- Blog Card 3 -->
			<div
				class="card bg-white shadow-xl transition-transform duration-300 hover:scale-105 dark:bg-gray-900"
			>
				<figure>
					<img
						src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
						alt="Blog Image"
						class="rounded-t-xl"
					/>
				</figure>
				<div class="card-body">
					<h3 class="text-2xl font-semibold text-gray-800 dark:text-white">
						How to Build a SaaS Product
					</h3>
					<p class="text-gray-600 dark:text-gray-300">
						Step-by-step guide on building and launching a profitable SaaS product.
					</p>
					<div class="mt-4">
						<a href="#" class="btn btn-primary w-full">Read More 📖</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- LATEST BLOGS SECTION ENDS -->

<!-- I CAN HELP YOUR BUSINESS SECTION BEGINS -->
<section
	id="help-your-business"
	class="bg-gradient-to-br from-gray-50 to-gray-200 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-12 text-5xl font-bold text-gray-900 dark:text-white">
			💡 I can help your business with...
		</h2>

		<!-- Services Grid -->
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Service Card -->
			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					📢 Digital Advertising
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Maximize your reach with data-driven PPC, social media ads, and SEO.
				</p>
				<a
					href="https://www.onlinesellerconsulting.com/amazon-advertising"
					target="_blank"
					class="absolute inset-0"
				></a>
			</div>

			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					💻 Web Development
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Build responsive, fast, and scalable websites with modern frameworks.
				</p>
				<a href="" class="absolute inset-0"></a>
			</div>

			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					⚡ Conversion Rate Optimization
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Improve user experience and increase sales through A/B testing.
				</p>
				<a
					href="https://www.onlinesellerconsulting.com/optimize-amazon-listings"
					target="_blank"
					class="absolute inset-0"
				></a>
			</div>

			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					📦 Storage & Fulfillment
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Optimize your supply chain and reduce order fulfillment costs.
				</p>
				<a
					href="https://www.hometown-industries.com/storage-and-fulfillment"
					target="_blank"
					class="absolute inset-0"
				></a>
			</div>

			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					🛒 Wholesale Product Purchasing
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Get exclusive bulk pricing and manage vendor relations efficiently.
				</p>
				<a href="https://www.hometown-industries.com/" target="_blank" class="absolute inset-0"></a>
			</div>

			<div
				class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-900"
			>
				<h3 class="flex items-center text-2xl font-semibold text-gray-800 dark:text-white">
					🔧 Ecomm Platform Management
				</h3>
				<p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
					Optimize and manage your Shopify, WooCommerce, or custom e-commerce store.
				</p>
				<a
					href="https://www.onlinesellerconsulting.com/amazon-seller-account-management"
					target="_blank"
					class="absolute inset-0"
				></a>
			</div>
		</div>
	</div>
</section>
<!-- I CAN HELP YOUR BUSINESS SECTION ENDS -->

<!-- BOOK A COACHING CALL SECTION BEGINS -->
<!-- <section
	id="book-coaching-call"
	class="bg-gradient-to-b from-gray-50 to-gray-100 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-8 text-5xl font-bold text-gray-900 dark:text-white">📞 Book a Coaching Call</h2>
		<p class="mx-auto mb-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
			Need a fresh set of eyes on your business? Let's strategize and unlock new growth
			opportunities. A <span class="font-bold text-gray-800 dark:text-white"
				>one-hour coaching call</span
			>
			is
			<span class="font-bold text-gray-800 dark:text-white">$400</span>.
		</p>

		<div class="flex flex-col items-center">
			<div
				class="w-full max-w-2xl rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 dark:bg-gray-900/70"
			>
				<p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
					Gain personalized insights and actionable strategies tailored to your business needs.
				</p>

				<button
					onclick={checkout}
					href="/book-coaching-call"
					class="block w-full rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500"
				>
					🚀 Book Now
				</button>
			</div>
		</div>
	</div>
</section> -->
<!-- BOOK A COACHING CALL SECTION ENDS -->

<!-- CONNECT WITH ME ON SOCIALS SECTION BEGINS -->
<section
	id="connect-socials"
	class="bg-gradient-to-br from-gray-100 to-gray-200 py-16 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-10 text-5xl font-bold text-gray-900 dark:text-white">
			🤝 Connect With Me On Socials
		</h2>

		<!-- Social Media Icons -->
		<div class="flex justify-center space-x-6">
			<!-- X (Twitter) -->
			<a
				href="https://x.com/jegierlach"
				target="_blank"
				class="group flex h-16 w-16 items-center justify-center rounded-full bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-gray-800"
			>
				<svg
					class="h-8 w-8 text-gray-800 transition duration-300 group-hover:text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M23.64 4.56c-.87.39-1.8.66-2.78.78a4.92 4.92 0 0 0 2.17-2.7 9.75 9.75 0 0 1-3.1 1.2A4.92 4.92 0 0 0 16.5 3a4.91 4.91 0 0 0-4.91 4.91c0 .39.04.78.13 1.15a13.94 13.94 0 0 1-10.1-5.13A4.86 4.86 0 0 0 2.1 8.6a4.88 4.88 0 0 1-2.22-.6v.06a4.91 4.91 0 0 0 3.94 4.81c-.44.12-.9.19-1.37.19-.34 0-.67-.03-1-.1a4.92 4.92 0 0 0 4.6 3.42 9.86 9.86 0 0 1-6.1 2.1c-.4 0-.79-.02-1.18-.07a14 14 0 0 0 7.55 2.21c9.06 0 14.01-7.52 14.01-14.03l-.02-.64A10.1 10.1 0 0 0 24 4.92c-.9.4-1.87.67-2.87.78a5.1 5.1 0 0 0 2.2-2.78z"
					></path>
				</svg>
			</a>

			<!-- Instagram -->
			<a
				href="https://instagram.com/"
				target="_blank"
				class="group flex h-16 w-16 items-center justify-center rounded-full bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-pink-500"
			>
				<svg
					class="h-8 w-8 text-gray-800 transition duration-300 group-hover:text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0-2A7.5 7.5 0 0 0 0 7.5v9A7.5 7.5 0 0 0 7.5 24h9A7.5 7.5 0 0 0 24 16.5v-9A7.5 7.5 0 0 0 16.5 0h-9z"
					></path>
				</svg>
			</a>

			<!-- LinkedIn -->
			<a
				href="https://www.linkedin.com/in/jan-gierlach/"
				target="_blank"
				class="group flex h-16 w-16 items-center justify-center rounded-full bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-blue-600"
			>
				<svg
					class="h-8 w-8 text-gray-800 transition duration-300 group-hover:text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M20.45 20.45h-3.74v-5.78c0-1.37-.02-3.13-1.91-3.13-1.92 0-2.21 1.5-2.21 3.03v5.88h-3.74V9h3.59v1.56h.05c.5-.95 1.71-1.96 3.51-1.96 3.76 0 4.46 2.47 4.46 5.67v6.18zM4.55 7.43a2.15 2.15 0 1 1 0-4.3 2.15 2.15 0 0 1 0 4.3zm-1.88 13.02h3.76V9H2.67v11.45z"
					></path>
				</svg>
			</a>

			<!-- YouTube -->
			<a
				href="https://www.youtube.com/@CoreLabsDigital"
				target="_blank"
				class="group flex h-16 w-16 items-center justify-center rounded-full bg-white/70 p-4 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:bg-red-600"
			>
				<svg
					class="h-8 w-8 text-gray-800 transition duration-300 group-hover:text-white"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M23.49 6.27c-.27-1.06-1.12-1.9-2.18-2.18C19.4 3.6 12 3.6 12 3.6s-7.4 0-9.31.48c-1.06.27-1.9 1.12-2.18 2.18C0 8.18 0 12 0 12s0 3.82.5 5.73c.27 1.06 1.12 1.9 2.18 2.18 1.91.5 9.31.5 9.31.5s7.4 0 9.31-.5c1.06-.27 1.9-1.12 2.18-2.18.5-1.91.5-5.73.5-5.73s0-3.82-.5-5.73zm-13.99 9.8v-7.27l6.44 3.64-6.44 3.63z"
					></path>
				</svg>
			</a>
		</div>
	</div>
</section>
<!-- CONNECT WITH ME ON SOCIALS SECTION ENDS -->

<!-- CONTACT ME SECTION BEGINS -->
<section
	id="contact"
	class="bg-gradient-to-br from-gray-50 to-gray-200 py-20 dark:from-gray-900 dark:to-gray-800"
>
	<div class="container mx-auto px-6 text-center lg:px-12">
		<h2 class="mb-10 text-5xl font-bold text-gray-900 dark:text-white">📬 Contact Me</h2>

		<div class="flex flex-col items-center">
			<!-- Contact Card -->
			<div
				class="w-full max-w-2xl rounded-3xl bg-white/70 p-10 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 dark:bg-gray-900/70"
			>
				<p class="mb-6 text-lg text-gray-600 dark:text-gray-300">
					Have a question or want to work together? Fill out the form below, and I'll get back to
					you as soon as possible.
				</p>

				<form onsubmit={submitContactForm} class="space-y-6">
					<!-- Name -->
					<div>
						<label
							for="name"
							class="mb-2 block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Your Name
						</label>
						<input
							bind:value={name}
							type="text"
							id="name"
							placeholder="Enter your name"
							class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							required
						/>
					</div>

					<!-- Email -->
					<div>
						<label
							for="email"
							class="mb-2 block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Your Email
						</label>
						<input
							bind:value={email}
							type="email"
							id="email"
							placeholder="Enter your email"
							class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							required
						/>
					</div>

					<!-- Message -->
					<div>
						<label
							for="message"
							class="mb-2 block text-left text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Your Message
						</label>
						<textarea
							bind:value={message}
							id="message"
							placeholder="Write your message here..."
							rows="5"
							class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							required
						></textarea>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						class="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-pink-500"
					>
						🚀 Send Message
					</button>
				</form>

				<!-- Success Message -->
				{#if showSubmissionSuccess}
					<div
						class="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white shadow-lg"
					>
						<h1 class="text-center text-2xl font-bold">🎉 Message Sent!</h1>
						<p class="mt-2 text-center text-lg">
							Thank you! I'll get back to you as soon as possible.
						</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- CONTACT ME SECTION ENDS -->

<!-- Floating Animation -->
<style>
	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0px);
		}
	}
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
</style>
