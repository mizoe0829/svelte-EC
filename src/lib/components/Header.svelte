<script lang="ts">
	import { cart } from '$lib/state/cart.svelte';
	import { wishlist } from '$lib/state/wishlist.svelte';
	import { auth } from '$lib/state/auth.svelte';
	import { CATEGORIES } from '$lib/data/products';
	import type { ProductCategory } from '$lib/types';

	let {
		activeCategory = $bindable('all' as ProductCategory),
		searchQuery = $bindable('')
	} = $props<{
		activeCategory?: ProductCategory;
		searchQuery?: string;
	}>();

	let isScrolled = $state(false);
	let isSearchOpen = $state(false);

	function handleScroll() {
		if (typeof window !== 'undefined') {
			isScrolled = window.scrollY > 20;
		}
	}

	function selectCategory(cat: ProductCategory) {
		activeCategory = cat;
		const el = document.getElementById('catalog-section');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:window onscroll={handleScroll} />

<header class="header glass" class:scrolled={isScrolled}>
	<div class="header-container container">
		<!-- Brand Logo -->
		<a href="/" class="brand-logo" onclick={(e) => { e.preventDefault(); selectCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
			<div class="logo-mark">
				<span class="logo-core"></span>
			</div>
			<div class="brand-text">
				<span class="brand-name">LUMEN</span>
				<span class="brand-tag">STUDIO</span>
			</div>
		</a>

		<!-- Category Navigation -->
		<nav class="nav-links">
			{#each CATEGORIES as cat}
				<button
					type="button"
					class="nav-link"
					class:active={activeCategory === cat.id}
					onclick={() => selectCategory(cat.id as ProductCategory)}
				>
					{cat.label}
				</button>
			{/each}
		</nav>

		<!-- Right Action Buttons -->
		<div class="nav-actions">
			<!-- Search Bar -->
			<div class="search-box" class:open={isSearchOpen}>
				<input
					type="text"
					placeholder="製品・モデルを検索..."
					bind:value={searchQuery}
					class="search-input"
					onfocus={() => (isSearchOpen = true)}
					onblur={() => {
						if (!searchQuery) isSearchOpen = false;
					}}
				/>
				<button
					type="button"
					class="search-btn"
					onclick={() => (isSearchOpen = !isSearchOpen)}
					aria-label="検索"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
				</button>
				{#if searchQuery}
					<button
						type="button"
						class="clear-search-btn"
						onclick={() => (searchQuery = '')}
						aria-label="検索ワードをクリア"
					>
						✕
					</button>
				{/if}
			</div>

			<!-- Wishlist Button -->
			<button
				type="button"
				class="btn-icon"
				onclick={() => wishlist.open()}
				aria-label="お気に入り一覧を開く"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
				</svg>
				{#if wishlist.items.length > 0}
					<span class="badge-count wishlist-count">{wishlist.items.length}</span>
				{/if}
			</button>

			<!-- Cart Button -->
			<button
				type="button"
				class="btn-icon cart-trigger"
				onclick={() => cart.open()}
				aria-label="ショッピングカートを開く"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<path d="M16 10a4 4 0 0 1-8 0"></path>
				</svg>
				{#if cart.itemCount > 0}
					<span class="badge-count cart-count animate-bounce">{cart.itemCount}</span>
				{/if}
			</button>

			<!-- User Account / Login Button -->
			{#if auth.isAuthenticated}
				<a href="/mypage" class="user-account-btn" aria-label="マイページへ移動">
					<div class="user-avatar-small">
						{#if auth.user?.avatar}
							<img src={auth.user.avatar} alt={auth.user.fullName} class="avatar-img" />
						{:else}
							<span>👤</span>
						{/if}
					</div>
					<span class="user-name-text">{auth.user?.fullName.split(' ')[0]} 様</span>
				</a>
			{:else}
				<button
					type="button"
					class="btn-login-header"
					onclick={() => auth.openModal('login')}
					aria-label="ログイン"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
						<circle cx="12" cy="7" r="4"></circle>
					</svg>
					<span class="login-label">ログイン</span>
				</button>
			{/if}
		</div>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		height: var(--header-height);
		display: flex;
		align-items: center;
		transition: all var(--transition-normal);
		border-top: none;
		border-left: none;
		border-right: none;
		background: rgba(9, 12, 21, 0.7);
	}

	.header.scrolled {
		background: rgba(9, 12, 21, 0.92);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		border-bottom-color: var(--border-medium);
	}

	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
	}

	/* Brand Logo */
	.brand-logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
		user-select: none;
	}

	.logo-mark {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: var(--accent-gradient);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 20px var(--accent-glow);
		position: relative;
	}

	.logo-core {
		width: 14px;
		height: 14px;
		border-radius: 4px;
		background: #ffffff;
		transform: rotate(45deg);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
	}

	.brand-text {
		display: flex;
		flex-direction: column;
	}

	.brand-name {
		font-family: var(--font-heading);
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: 0.15em;
		background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1;
	}

	.brand-tag {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.25em;
		color: var(--accent-secondary);
		margin-top: 2px;
	}

	/* Navigation */
	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link {
		padding: 0.5rem 0.9rem;
		border-radius: var(--radius-full);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
		background: transparent;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.06);
	}

	.nav-link.active {
		color: #ffffff;
		background: rgba(99, 102, 241, 0.2);
		border: 1px solid var(--border-highlight);
		box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
	}

	/* Actions */
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	/* Search Box */
	.search-box {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-input {
		width: 140px;
		height: 40px;
		border-radius: var(--radius-full);
		padding: 0 2rem 0 1rem;
		font-size: 0.85rem;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		transition: all var(--transition-normal);
	}

	.search-box.open .search-input,
	.search-input:focus {
		width: 240px;
		border-color: var(--accent-primary);
		background: var(--bg-surface);
	}

	.search-btn {
		position: absolute;
		right: 10px;
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.clear-search-btn {
		position: absolute;
		right: 32px;
		font-size: 0.75rem;
		color: var(--text-muted);
		padding: 2px 4px;
	}

	.clear-search-btn:hover {
		color: var(--text-primary);
	}

	/* Badge counts */
	.badge-count {
		position: absolute;
		top: -4px;
		right: -4px;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 9px;
		font-size: 0.7rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}

	.wishlist-count {
		background: #ec4899;
	}

	.cart-count {
		background: var(--accent-primary);
		box-shadow: 0 0 10px var(--accent-glow);
	}

	/* User Account & Login */
	.user-account-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.75rem 0.35rem 0.4rem;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--border-medium);
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	.user-account-btn:hover {
		background: rgba(99, 102, 241, 0.18);
		border-color: var(--border-highlight);
	}

	.user-avatar-small {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		overflow: hidden;
		background: var(--bg-surface-elevated);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-name-text {
		font-size: 0.85rem;
		font-weight: 600;
		color: #ffffff;
	}

	.btn-login-header {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.85rem;
		border-radius: var(--radius-full);
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
		transition: all var(--transition-fast);
	}

	.btn-login-header:hover {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
		box-shadow: 0 0 12px var(--accent-glow);
	}

	@media (max-width: 900px) {
		.nav-links {
			display: none;
		}
		.search-box.open .search-input,
		.search-input:focus {
			width: 180px;
		}
	}

	@media (max-width: 600px) {
		.search-box {
			display: none;
		}
		.brand-tag {
			display: none;
		}
	}
</style>
