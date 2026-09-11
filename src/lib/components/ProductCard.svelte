<script lang="ts">
	import type { Product } from '$lib/types';
	import { cart } from '$lib/state/cart.svelte';
	import { wishlist } from '$lib/state/wishlist.svelte';

	let { product, onQuickView } = $props<{
		product: Product;
		onQuickView?: (p: Product) => void;
	}>();

	let selectedColorIndex = $state(0);
	let isHovered = $state(false);

	const isWishlisted = $derived(wishlist.has(product.id));
</script>

<article
	class="product-card glass-card"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- Top Badges & Wishlist -->
	<div class="card-header">
		<div class="badges-row">
			{#if product.badge}
				<span class="badge badge-{product.badge.toLowerCase()}">
					{product.badge}
				</span>
			{/if}
			{#if product.originalPrice}
				<span class="badge badge-sale">
					{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
				</span>
			{/if}
		</div>

		<button
			type="button"
			class="wishlist-btn"
			class:active={isWishlisted}
			onclick={() => wishlist.toggle(product)}
			aria-label={isWishlisted ? 'お気に入りから解除' : 'お気に入りに追加'}
		>
			<svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#ec4899' : 'none'} stroke={isWishlisted ? '#ec4899' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
			</svg>
		</button>
	</div>

	<!-- Product Image Area -->
	<div class="image-wrapper" onclick={() => onQuickView?.(product)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && onQuickView?.(product)}>
		<img
			src={product.images[0]}
			alt={product.name}
			class="product-img"
			loading="lazy"
		/>
		
		<!-- Quick View Floating Button on hover -->
		<div class="quick-view-overlay" class:visible={isHovered}>
			<span class="quick-view-text">クイックビュー</span>
		</div>
	</div>

	<!-- Product Details -->
	<div class="card-body">
		<!-- Color Swatches -->
		{#if product.colors.length > 1}
			<div class="color-swatches">
				{#each product.colors as color, index}
					<button
						type="button"
						class="swatch"
						class:active={selectedColorIndex === index}
						style="background-color: {color.hex};"
						title={color.name}
						onclick={() => (selectedColorIndex = index)}
					></button>
				{/each}
				<span class="swatch-name">{product.colors[selectedColorIndex].name}</span>
			</div>
		{/if}

		<!-- Category & Rating -->
		<div class="meta-row">
			<span class="category-name">{product.category.toUpperCase()}</span>
			<div class="rating-box">
				<span class="star-icon">★</span>
				<span class="rating-num">{product.rating}</span>
				<span class="review-count">({product.reviewCount})</span>
			</div>
		</div>

		<!-- Title & Tagline -->
		<h3 class="product-title">
			<button type="button" class="title-link-btn" onclick={() => onQuickView?.(product)}>
				{product.name}
			</button>
		</h3>
		<p class="product-tagline">{product.tagline}</p>

		<!-- Price & Action -->
		<div class="price-action-row">
			<div class="price-box">
				<span class="current-price">¥{product.price.toLocaleString()}</span>
				{#if product.originalPrice}
					<span class="original-price">¥{product.originalPrice.toLocaleString()}</span>
				{/if}
			</div>

			<button
				type="button"
				class="add-to-cart-btn"
				onclick={() => cart.addItem(product, product.colors[selectedColorIndex])}
				aria-label="カートに追加"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<line x1="5" y1="12" x2="19" y2="12"></line>
				</svg>
				<span>カートへ</span>
			</button>
		</div>
	</div>
</article>

<style>
	.product-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-md);
		overflow: hidden;
		position: relative;
		transition: all var(--transition-normal);
		background: rgba(18, 24, 40, 0.7);
	}

	.product-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.6), 0 0 25px -5px var(--accent-glow);
		border-color: var(--border-highlight);
	}

	.card-header {
		position: absolute;
		top: 14px;
		left: 14px;
		right: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2;
		pointer-events: none;
	}

	.badges-row {
		display: flex;
		gap: 6px;
	}

	.wishlist-btn {
		pointer-events: auto;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(10, 14, 25, 0.85);
		backdrop-filter: blur(8px);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.wishlist-btn:hover {
		transform: scale(1.1);
		color: #ec4899;
		border-color: rgba(236, 72, 153, 0.4);
	}

	.wishlist-btn.active {
		background: rgba(236, 72, 153, 0.2);
		border-color: #ec4899;
	}

	/* Image */
	.image-wrapper {
		position: relative;
		aspect-ratio: 1 / 1;
		width: 100%;
		overflow: hidden;
		background: #0f1422;
		cursor: pointer;
	}

	.product-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.product-card:hover .product-img {
		transform: scale(1.06);
	}

	.quick-view-overlay {
		position: absolute;
		inset: 0;
		background: rgba(10, 14, 25, 0.45);
		backdrop-filter: blur(2px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity var(--transition-normal);
		pointer-events: none;
	}

	.quick-view-overlay.visible {
		opacity: 1;
	}

	.quick-view-text {
		padding: 0.5rem 1.2rem;
		background: rgba(255, 255, 255, 0.95);
		color: #0b0f19;
		font-size: 0.85rem;
		font-weight: 700;
		border-radius: var(--radius-full);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
		transform: translateY(10px);
		transition: transform 0.3s ease;
	}

	.quick-view-overlay.visible .quick-view-text {
		transform: translateY(0);
	}

	/* Body */
	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		flex: 1;
	}

	.color-swatches {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.swatch {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.3);
		cursor: pointer;
		transition: transform var(--transition-fast);
	}

	.swatch.active {
		transform: scale(1.3);
		outline: 2px solid var(--accent-primary);
		outline-offset: 1px;
	}

	.swatch-name {
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-left: 4px;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.75rem;
	}

	.category-name {
		color: var(--accent-secondary);
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.rating-box {
		display: flex;
		align-items: center;
		gap: 3px;
		color: var(--text-secondary);
	}

	.star-icon {
		color: #fbbf24;
		font-size: 0.85rem;
	}

	.rating-num {
		font-weight: 700;
		color: var(--text-primary);
	}

	.review-count {
		color: var(--text-muted);
	}

	.product-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.title-link-btn {
		font-size: inherit;
		font-weight: inherit;
		font-family: inherit;
		color: inherit;
		text-align: left;
		padding: 0;
		cursor: pointer;
		transition: color var(--transition-fast);
	}

	.title-link-btn:hover {
		color: #a5b4fc;
	}

	.product-tagline {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.4;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		min-height: 2.3em;
	}

	/* Price and Action */
	.price-action-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: auto;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border-subtle);
	}

	.price-box {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.current-price {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 800;
		color: #ffffff;
	}

	.original-price {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-decoration: line-through;
	}

	.add-to-cart-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 0.5rem 0.9rem;
		font-size: 0.85rem;
		font-weight: 600;
		border-radius: var(--radius-sm);
		background: rgba(99, 102, 241, 0.15);
		color: #a5b4fc;
		border: 1px solid rgba(99, 102, 241, 0.3);
		transition: all var(--transition-fast);
	}

	.add-to-cart-btn:hover {
		background: var(--accent-gradient);
		color: #ffffff;
		border-color: transparent;
		box-shadow: 0 4px 14px var(--accent-glow);
		transform: scale(1.04);
	}
</style>
