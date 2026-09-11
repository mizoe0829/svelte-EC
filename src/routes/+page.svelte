<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductModal from '$lib/components/ProductModal.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { PRODUCTS } from '$lib/data/products';
	import type { Product, ProductCategory, SortOption } from '$lib/types';

	let activeCategory = $state<ProductCategory>('all');
	let searchQuery = $state('');
	let sortBy = $state<SortOption>('popular');
	let maxPrice = $state(60000);
	let inStockOnly = $state(false);

	let activeModalProduct = $state<Product | null>(null);

	const filteredProducts = $derived.by(() => {
		let list = [...PRODUCTS];

		// Category filter
		if (activeCategory !== 'all') {
			list = list.filter((p) => p.category === activeCategory);
		}

		// Search query filter
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase().trim();
			list = list.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.tagline.toLowerCase().includes(q) ||
					p.description.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q)
			);
		}

		// Price filter
		list = list.filter((p) => p.price <= maxPrice);

		// In stock filter
		if (inStockOnly) {
			list = list.filter((p) => p.inStock);
		}

		// Sorting
		if (sortBy === 'popular') {
			list.sort((a, b) => b.reviewCount - a.reviewCount);
		} else if (sortBy === 'price-asc') {
			list.sort((a, b) => a.price - b.price);
		} else if (sortBy === 'price-desc') {
			list.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'rating') {
			list.sort((a, b) => b.rating - a.rating);
		}

		return list;
	});

	function handleOpenModal(product: Product) {
		activeModalProduct = product;
	}

	function handleCloseModal() {
		activeModalProduct = null;
	}

	function resetFilters() {
		activeCategory = 'all';
		searchQuery = '';
		maxPrice = 60000;
		inStockOnly = false;
		sortBy = 'popular';
	}
</script>

<div class="site-wrapper">
	<!-- Global Navigation Header -->
	<Header bind:activeCategory bind:searchQuery />

	<main>
		<!-- Hero Showcase -->
		<Hero />

		<!-- Features & Value Props -->
		<Features />

		<!-- Product Catalog Section -->
		<section id="catalog-section" class="catalog-section">
			<div class="container">
				<div class="catalog-header">
					<div class="catalog-title-group">
						<span class="sub-heading">CURATED COLLECTION</span>
						<h2 class="catalog-main-title">
							{#if activeCategory === 'all'}
								すべてのコレクション
							{:else if activeCategory === 'audio'}
								ハイエンド・オーディオ
							{:else if activeCategory === 'workspace'}
								ワークスペース＆デスクギア
							{:else if activeCategory === 'wearables'}
								ウェアラブル＆スマートデバイス
							{:else}
								ライフスタイル＆デスクケア
							{/if}
						</h2>
					</div>

					{#if searchQuery}
						<div class="search-result-pill">
							<span>検索結果: <strong>"{searchQuery}"</strong></span>
							<button type="button" onclick={() => (searchQuery = '')} class="clear-pill-btn">✕ 解除</button>
						</div>
					{/if}
				</div>

				<!-- Interactive Filter Bar -->
				<ProductFilter
					bind:category={activeCategory}
					bind:sortBy
					bind:maxPrice
					bind:inStockOnly
					itemCount={filteredProducts.length}
				/>

				<!-- Product Grid -->
				{#if filteredProducts.length === 0}
					<div class="no-products-state glass-card">
						<div class="no-prod-icon">🔍</div>
						<h3>条件に一致する商品が見つかりませんでした</h3>
						<p>検索ワードや絞り込み条件（価格・在庫）を変更してお試しください。</p>
						<button type="button" class="btn btn-primary" onclick={resetFilters}>
							すべての条件をリセット
						</button>
					</div>
				{:else}
					<div class="product-grid">
						{#each filteredProducts as product (product.id)}
							<ProductCard {product} onQuickView={handleOpenModal} />
						{/each}
					</div>
				{/if}
			</div>
		</section>

		<!-- Testimonials & Trust -->
		<Testimonials />
	</main>

	<!-- Site Footer -->
	<Footer />

	<!-- Quick View Product Modal -->
	<ProductModal product={activeModalProduct} onClose={handleCloseModal} />
</div>

<style>
	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	/* Catalog Section */
	.catalog-section {
		padding: 4rem 0 5rem;
		position: relative;
	}

	.catalog-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.catalog-title-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.sub-heading {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: var(--accent-secondary);
	}

	.catalog-main-title {
		font-size: clamp(1.8rem, 3.5vw, 2.5rem);
		color: #ffffff;
	}

	.search-result-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 0.45rem 0.9rem;
		border-radius: var(--radius-full);
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.3);
		font-size: 0.85rem;
		color: #a5b4fc;
	}

	.clear-pill-btn {
		font-size: 0.75rem;
		color: var(--text-secondary);
		cursor: pointer;
	}

	.clear-pill-btn:hover {
		color: #ffffff;
	}

	/* Product Grid */
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
	}

	/* Empty State */
	.no-products-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 4rem 2rem;
		border-radius: var(--radius-md);
		gap: 1.25rem;
	}

	.no-prod-icon {
		font-size: 3.5rem;
	}

	.no-products-state h3 {
		font-size: 1.3rem;
		color: #ffffff;
	}

	.no-products-state p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		max-width: 460px;
	}

	@media (max-width: 640px) {
		.product-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
</style>

