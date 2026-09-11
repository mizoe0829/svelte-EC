<script lang="ts">
	import type { Product, ProductColor } from '$lib/types';
	import { cart } from '$lib/state/cart.svelte';
	import { wishlist } from '$lib/state/wishlist.svelte';

	let { product = null, onClose } = $props<{
		product: Product | null;
		onClose: () => void;
	}>();

	let selectedColor = $state<ProductColor | null>(null);
	let quantity = $state(1);

	$effect(() => {
		if (product) {
			selectedColor = product.colors[0];
			quantity = 1;
		}
	});

	function handleAddToCart() {
		if (!product || !selectedColor) return;
		cart.addItem(product, selectedColor, quantity);
		onClose();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if product}
	<div
		class="modal-backdrop"
		onclick={onClose}
		onkeydown={(e) => e.key === 'Escape' && onClose()}
		role="button"
		tabindex="0"
		aria-label="モーダルを閉じる"
	>
		<div
			class="modal-card glass"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- Close Button -->
			<button class="modal-close-btn" onclick={onClose} aria-label="閉じる">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>

			<div class="modal-grid">
				<!-- Left: Image Gallery -->
				<div class="modal-gallery">
					<div class="main-image-box">
						<img src={product.images[0]} alt={product.name} class="modal-main-img" />
						{#if product.badge}
							<span class="badge badge-{product.badge.toLowerCase()} modal-badge">
								{product.badge}
							</span>
						{/if}
					</div>
				</div>

				<!-- Right: Product Info & Actions -->
				<div class="modal-details">
					<div class="details-header">
						<span class="category-badge">{product.category.toUpperCase()}</span>
						<div class="rating-strip">
							<span class="star-icon">★</span>
							<span class="rating-val">{product.rating}</span>
							<span class="review-val">({product.reviewCount} 件のカスタマーレビュー)</span>
						</div>
						<h2 class="modal-title">{product.name}</h2>
						<p class="modal-tagline">{product.tagline}</p>
					</div>

					<!-- Pricing -->
					<div class="pricing-box">
						<span class="modal-price">¥{product.price.toLocaleString()}</span>
						{#if product.originalPrice}
							<span class="modal-orig-price">¥{product.originalPrice.toLocaleString()}</span>
							<span class="discount-badge">
								{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
							</span>
						{/if}
					</div>

					<p class="modal-description">{product.description}</p>

					<!-- Color Selector -->
					<div class="selection-section">
						<div class="selection-label">
							カラー: <strong>{selectedColor?.name}</strong>
						</div>
						<div class="color-options">
							{#each product.colors as color}
								<button
									type="button"
									class="color-btn"
									class:selected={selectedColor?.name === color.name}
									style="background-color: {color.hex};"
									onclick={() => (selectedColor = color)}
									title={color.name}
								></button>
							{/each}
						</div>
					</div>

					<!-- Quantity & Actions -->
					<div class="action-section">
						<div class="quantity-control">
							<button
								type="button"
								class="qty-btn"
								onclick={() => (quantity = Math.max(1, quantity - 1))}
								disabled={quantity <= 1}
							>-</button>
							<span class="qty-display">{quantity}</span>
							<button
								type="button"
								class="qty-btn"
								onclick={() => (quantity += 1)}
							>+</button>
						</div>

						<button type="button" class="btn btn-primary modal-cart-btn" onclick={handleAddToCart}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<path d="M16 10a4 4 0 0 1-8 0"></path>
							</svg>
							<span>¥{(product.price * quantity).toLocaleString()} でカートに追加</span>
						</button>

						<button
							type="button"
							class="btn-icon wishlist-action"
							onclick={() => wishlist.toggle(product!)}
							aria-label="ウィッシュリスト"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.has(product.id) ? '#ec4899' : 'none'} stroke={wishlist.has(product.id) ? '#ec4899' : 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
							</svg>
						</button>
					</div>

					<!-- Features & Specs accordion/list -->
					<div class="features-list">
						<h4 class="section-subtitle">主な特長</h4>
						<ul>
							{#each product.features as feature}
								<li>✦ {feature}</li>
							{/each}
						</ul>
					</div>

					{#if Object.keys(product.specs).length > 0}
						<div class="specs-table-wrapper">
							<h4 class="section-subtitle">基本仕様</h4>
							<div class="specs-grid">
								{#each Object.entries(product.specs) as [key, val]}
									<div class="spec-row">
										<span class="spec-key">{key}</span>
										<span class="spec-val">{val}</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(5, 7, 13, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		z-index: 2000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		animation: fadeIn 0.2s ease-out;
	}

	.modal-card {
		position: relative;
		width: 100%;
		max-width: 960px;
		max-height: 90vh;
		background: rgba(16, 21, 36, 0.95);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-medium);
		box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px -5px var(--accent-glow);
		overflow-y: auto;
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.modal-close-btn {
		position: absolute;
		top: 18px;
		right: 18px;
		z-index: 10;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid var(--border-subtle);
		color: var(--text-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.modal-close-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.15);
		transform: scale(1.08);
	}

	.modal-grid {
		display: grid;
		grid-template-columns: 1.1fr 1.3fr;
		gap: 2.5rem;
		padding: 2.5rem;
	}

	.modal-gallery {
		display: flex;
		flex-direction: column;
	}

	.main-image-box {
		position: relative;
		aspect-ratio: 1 / 1;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: #0d111d;
		border: 1px solid var(--border-subtle);
	}

	.modal-main-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-badge {
		position: absolute;
		top: 14px;
		left: 14px;
	}

	.modal-details {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.details-header {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.category-badge {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--accent-secondary);
	}

	.rating-strip {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 0.85rem;
	}

	.star-icon {
		color: #fbbf24;
	}

	.rating-val {
		font-weight: 700;
		color: var(--text-primary);
	}

	.review-val {
		color: var(--text-muted);
		font-size: 0.8rem;
		margin-left: 4px;
	}

	.modal-title {
		font-size: 1.8rem;
		font-weight: 800;
		color: #ffffff;
		line-height: 1.2;
	}

	.modal-tagline {
		font-size: 0.95rem;
		color: var(--text-secondary);
	}

	.pricing-box {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 0.75rem 0;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.modal-price {
		font-family: var(--font-heading);
		font-size: 1.7rem;
		font-weight: 800;
		color: #ffffff;
	}

	.modal-orig-price {
		font-size: 1.1rem;
		color: var(--text-muted);
		text-decoration: line-through;
	}

	.discount-badge {
		font-size: 0.8rem;
		font-weight: 700;
		color: #fb7185;
		background: rgba(244, 63, 94, 0.15);
		padding: 2px 8px;
		border-radius: var(--radius-full);
	}

	.modal-description {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.selection-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.selection-label {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.color-options {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.color-btn {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 2px solid transparent;
		cursor: pointer;
		transition: transform var(--transition-fast);
	}

	.color-btn.selected {
		transform: scale(1.2);
		border-color: #ffffff;
		box-shadow: 0 0 10px var(--accent-glow);
	}

	.action-section {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.quantity-control {
		display: flex;
		align-items: center;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	.qty-btn {
		width: 38px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.1rem;
		color: var(--text-secondary);
		transition: background var(--transition-fast);
	}

	.qty-btn:hover:not(:disabled) {
		background: rgba(255, 255, 255, 0.08);
		color: #ffffff;
	}

	.qty-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.qty-display {
		min-width: 36px;
		text-align: center;
		font-weight: 700;
		font-size: 0.95rem;
	}

	.modal-cart-btn {
		flex: 1;
		height: 42px;
	}

	.wishlist-action {
		width: 42px;
		height: 42px;
	}

	.features-list {
		margin-top: 0.5rem;
	}

	.section-subtitle {
		font-size: 0.85rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	.features-list ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.specs-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.35rem;
		font-size: 0.8rem;
		background: var(--bg-surface-elevated);
		padding: 0.75rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
	}

	.spec-row {
		display: flex;
		justify-content: space-between;
		padding: 0.2rem 0;
	}

	.spec-key {
		color: var(--text-muted);
	}

	.spec-val {
		color: var(--text-primary);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.modal-grid {
			grid-template-columns: 1fr;
			padding: 1.5rem;
			gap: 1.5rem;
		}
	}
</style>
