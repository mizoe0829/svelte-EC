<script lang="ts">
	import { wishlist } from '$lib/state/wishlist.svelte';
	import { cart } from '$lib/state/cart.svelte';
	import type { Product } from '$lib/types';

	let { onQuickView } = $props<{
		onQuickView?: (p: Product) => void;
	}>();

	function handleMoveToCart(product: Product) {
		cart.addItem(product);
		wishlist.remove(product.id);
	}

	function handleAddAllToCart() {
		wishlist.items.forEach((p) => {
			cart.addItem(p);
		});
		wishlist.clear();
	}
</script>

{#if wishlist.isOpen}
	<div
		class="drawer-backdrop"
		onclick={() => wishlist.close()}
		onkeydown={(e) => e.key === 'Escape' && wishlist.close()}
		role="button"
		tabindex="0"
		aria-label="お気に入り一覧を閉じる"
	>
		<div
			class="drawer-panel glass"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- Header -->
			<div class="drawer-header">
				<div class="title-wrap">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="#ec4899" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					<h2 class="drawer-title">お気に入り一覧</h2>
					<span class="count-pill">{wishlist.items.length}</span>
				</div>
				<button type="button" class="drawer-close-btn" onclick={() => wishlist.close()} aria-label="閉じる">
					✕
				</button>
			</div>

			<!-- Items List -->
			<div class="drawer-items">
				{#if wishlist.items.length === 0}
					<div class="empty-state">
						<div class="empty-icon">🤍</div>
						<h3>お気に入りは登録されていません</h3>
						<p>気になる商品のハートアイコンをクリックすると、ここに追加されます。</p>
						<button type="button" class="btn btn-secondary" onclick={() => wishlist.close()}>
							商品を探す
						</button>
					</div>
				{:else}
					{#each wishlist.items as product (product.id)}
						<div class="wishlist-item-card">
							<img src={product.images[0]} alt={product.name} class="item-img" />

							<div class="item-info">
								<div class="item-title-row">
									<button
										type="button"
										class="item-name-btn"
										onclick={() => { onQuickView?.(product); wishlist.close(); }}
									>
										{product.name}
									</button>
									<button
										type="button"
										class="item-remove-btn"
										onclick={() => wishlist.remove(product.id)}
										aria-label="削除"
									>
										✕
									</button>
								</div>

								<span class="item-category">{product.category.toUpperCase()}</span>
								<span class="item-price">¥{product.price.toLocaleString()}</span>

								<div class="item-actions">
									<button
										type="button"
										class="move-to-cart-btn"
										onclick={() => handleMoveToCart(product)}
									>
										<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
											<line x1="3" y1="6" x2="21" y2="6"></line>
											<path d="M16 10a4 4 0 0 1-8 0"></path>
										</svg>
										<span>カートへ移動</span>
									</button>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Footer -->
			{#if wishlist.items.length > 0}
				<div class="drawer-footer">
					<button type="button" class="btn btn-primary add-all-btn" onclick={handleAddAllToCart}>
						<span>すべてカートに追加</span>
					</button>
					<button type="button" class="clear-btn" onclick={() => wishlist.clear()}>
						お気に入りをすべて削除
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.drawer-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(5, 7, 13, 0.75);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		z-index: 2000;
		display: flex;
		justify-content: flex-end;
		animation: fadeIn 0.2s ease-out;
	}

	.drawer-panel {
		width: 100%;
		max-width: 440px;
		height: 100%;
		background: rgba(16, 21, 36, 0.98);
		border-left: 1px solid var(--border-medium);
		box-shadow: -10px 0 35px rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: column;
		animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.drawer-header {
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title-wrap {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.drawer-title {
		font-size: 1.2rem;
		font-weight: 700;
		color: #ffffff;
	}

	.count-pill {
		padding: 2px 8px;
		border-radius: var(--radius-full);
		background: rgba(236, 72, 153, 0.2);
		color: #f472b6;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.drawer-close-btn {
		font-size: 1.2rem;
		color: var(--text-secondary);
		padding: 4px;
		transition: color var(--transition-fast);
	}

	.drawer-close-btn:hover {
		color: #ffffff;
	}

	.drawer-items {
		flex: 1;
		overflow-y: auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: 100%;
		padding: 2rem;
		gap: 1rem;
	}

	.empty-icon {
		font-size: 3.5rem;
		opacity: 0.8;
	}

	.empty-state h3 {
		font-size: 1.25rem;
		color: #ffffff;
	}

	.empty-state p {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.wishlist-item-card {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: rgba(23, 30, 51, 0.6);
		border: 1px solid var(--border-subtle);
	}

	.item-img {
		width: 76px;
		height: 76px;
		object-fit: cover;
		border-radius: var(--radius-sm);
		background: #0b0f19;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		min-width: 0;
	}

	.item-title-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.item-name-btn {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		cursor: pointer;
		line-height: 1.3;
		text-align: left;
		padding: 0;
		transition: color var(--transition-fast);
	}

	.item-name-btn:hover {
		color: #a5b4fc;
	}

	.item-remove-btn {
		color: var(--text-muted);
		padding: 2px 4px;
		font-size: 0.9rem;
	}

	.item-remove-btn:hover {
		color: var(--accent-sale);
	}

	.item-category {
		font-size: 0.7rem;
		color: var(--accent-secondary);
		font-weight: 700;
	}

	.item-price {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1rem;
		color: #ffffff;
	}

	.item-actions {
		margin-top: 0.35rem;
	}

	.move-to-cart-btn {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 0.35rem 0.75rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #ffffff;
		background: var(--accent-gradient);
		border-radius: var(--radius-sm);
		box-shadow: 0 2px 8px var(--accent-glow);
		transition: transform var(--transition-fast);
	}

	.move-to-cart-btn:hover {
		transform: scale(1.03);
	}

	.drawer-footer {
		padding: 1.25rem 1.5rem;
		border-top: 1px solid var(--border-subtle);
		background: rgba(14, 18, 32, 0.95);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.add-all-btn {
		width: 100%;
	}

	.clear-btn {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-align: center;
	}

	.clear-btn:hover {
		color: var(--accent-sale);
		text-decoration: underline;
	}
</style>
