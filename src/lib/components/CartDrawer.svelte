<script lang="ts">
	import { cart } from '$lib/state/cart.svelte';
	import { FREE_SHIPPING_THRESHOLD } from '$lib/data/products';

	let inputCoupon = $state('');

	function handleApplyCoupon() {
		if (cart.applyCoupon(inputCoupon)) {
			inputCoupon = '';
		}
	}
</script>

{#if cart.isOpen}
	<div
		class="drawer-backdrop"
		onclick={() => cart.close()}
		onkeydown={(e) => e.key === 'Escape' && cart.close()}
		role="button"
		tabindex="0"
		aria-label="カートを閉じる"
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
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
						<line x1="3" y1="6" x2="21" y2="6"></line>
						<path d="M16 10a4 4 0 0 1-8 0"></path>
					</svg>
					<h2 class="drawer-title">ショッピングカート</h2>
					<span class="count-pill">{cart.itemCount}</span>
				</div>
				<button type="button" class="drawer-close-btn" onclick={() => cart.close()} aria-label="カートを閉じる">
					✕
				</button>
			</div>

			<!-- Free Shipping Bar -->
			<div class="shipping-bar-box">
				<div class="shipping-status-text">
					{#if cart.isFreeShipping}
						<span class="free-text">🎉 おめでとうございます！<strong>送料無料</strong>が適用されます</span>
					{:else}
						<span>あと <strong>¥{cart.freeShippingRemaining.toLocaleString()}</strong> の購入で<strong>送料無料</strong></span>
					{/if}
				</div>
				<div class="shipping-track">
					<div class="shipping-fill" style="width: {cart.freeShippingProgress}%;"></div>
				</div>
			</div>

			<!-- Items List -->
			<div class="drawer-items">
				{#if cart.items.length === 0}
					<div class="empty-cart-state">
						<div class="empty-icon">🛍️</div>
						<h3>カートは空です</h3>
						<p>お気に入りのプロダクトを見つけてカートに追加してください。</p>
						<button type="button" class="btn btn-secondary" onclick={() => cart.close()}>
							買い物を続ける
						</button>
					</div>
				{:else}
					{#each cart.items as item (item.id)}
						<div class="cart-item-card">
							<img src={item.product.images[0]} alt={item.product.name} class="item-thumbnail" />
							
							<div class="item-info">
								<div class="item-title-row">
									<h4 class="item-name">{item.product.name}</h4>
									<button
										type="button"
										class="item-remove-btn"
										onclick={() => cart.removeItem(item.id)}
										aria-label="削除"
									>
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<polyline points="3 6 5 6 21 6"></polyline>
											<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
										</svg>
									</button>
								</div>

								<div class="item-color-pill">
									<span class="color-dot" style="background-color: {item.selectedColor.hex};"></span>
									<span>{item.selectedColor.name}</span>
								</div>

								<div class="item-bottom-row">
									<div class="qty-stepper">
										<button
											type="button"
											onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
											class="stepper-btn"
										>-</button>
										<span class="stepper-val">{item.quantity}</span>
										<button
											type="button"
											onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
											class="stepper-btn"
										>+</button>
									</div>

									<div class="item-price-col">
										<span class="item-unit-price">¥{(item.product.price * item.quantity).toLocaleString()}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Footer / Summary -->
			{#if cart.items.length > 0}
				<div class="drawer-footer">
					<!-- Coupon Box -->
					<div class="coupon-section">
						{#if cart.couponCode}
							<div class="applied-coupon-pill">
								<span class="coupon-tag">🏷️ {cart.couponCode} ({cart.couponLabel})</span>
								<button type="button" class="remove-coupon-btn" onclick={() => cart.removeCoupon()}>✕ 解除</button>
							</div>
						{:else}
							<div class="coupon-input-row">
								<input
									type="text"
									placeholder="クーポンコード (例: LUMEN10)"
									bind:value={inputCoupon}
									class="coupon-input"
									onkeydown={(e) => e.key === 'Enter' && handleApplyCoupon()}
								/>
								<button type="button" class="apply-coupon-btn" onclick={handleApplyCoupon}>
									適用
								</button>
							</div>
							{#if cart.couponError}
								<p class="coupon-error">{cart.couponError}</p>
							{/if}
						{/if}
					</div>

					<!-- Price Rows -->
					<div class="summary-rows">
						<div class="summary-row">
							<span>小計</span>
							<span>¥{cart.subtotal.toLocaleString()}</span>
						</div>

						{#if cart.discountAmount > 0}
							<div class="summary-row discount-row">
								<span>クーポン割引</span>
								<span>- ¥{cart.discountAmount.toLocaleString()}</span>
							</div>
						{/if}

						<div class="summary-row">
							<span>送料</span>
							<span>{cart.isFreeShipping ? '無料' : `¥${cart.shippingFee.toLocaleString()}`}</span>
						</div>

						<div class="summary-row total-row">
							<span>合計 (税込)</span>
							<span class="total-amount">¥{cart.total.toLocaleString()}</span>
						</div>
					</div>

					<!-- Checkout Button -->
					<button
						type="button"
						class="btn btn-primary checkout-btn"
						onclick={() => cart.startCheckout()}
					>
						<span>ご購入手続きへ進む</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<line x1="5" y1="12" x2="19" y2="12"></line>
							<polyline points="12 5 19 12 12 19"></polyline>
						</svg>
					</button>

					<p class="safe-checkout-note">🔒 SSL暗号化通信による安全な決済</p>
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
		max-width: 460px;
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
		background: rgba(99, 102, 241, 0.2);
		color: #a5b4fc;
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

	/* Shipping bar */
	.shipping-bar-box {
		padding: 0.9rem 1.5rem;
		background: rgba(23, 30, 51, 0.7);
		border-bottom: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.shipping-status-text {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.free-text {
		color: var(--accent-success);
	}

	.shipping-track {
		width: 100%;
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		overflow: hidden;
	}

	.shipping-fill {
		height: 100%;
		background: var(--accent-gradient-cyan);
		transition: width 0.3s ease;
	}

	/* Items */
	.drawer-items {
		flex: 1;
		overflow-y: auto;
		padding: 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.empty-cart-state {
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

	.empty-cart-state h3 {
		font-size: 1.3rem;
		color: #ffffff;
	}

	.empty-cart-state p {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.cart-item-card {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: rgba(23, 30, 51, 0.6);
		border: 1px solid var(--border-subtle);
	}

	.item-thumbnail {
		width: 72px;
		height: 72px;
		object-fit: cover;
		border-radius: var(--radius-sm);
		background: #0b0f19;
		flex-shrink: 0;
	}

	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.item-title-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.item-name {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.item-remove-btn {
		color: var(--text-muted);
		padding: 2px;
		transition: color var(--transition-fast);
	}

	.item-remove-btn:hover {
		color: var(--accent-sale);
	}

	.item-color-pill {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.color-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.item-bottom-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.25rem;
	}

	.qty-stepper {
		display: flex;
		align-items: center;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
	}

	.stepper-btn {
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.stepper-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.1);
	}

	.stepper-val {
		min-width: 24px;
		text-align: center;
		font-size: 0.85rem;
		font-weight: 700;
	}

	.item-unit-price {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 0.95rem;
		color: #ffffff;
	}

	/* Footer */
	.drawer-footer {
		padding: 1.25rem 1.5rem;
		border-top: 1px solid var(--border-subtle);
		background: rgba(14, 18, 32, 0.95);
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.coupon-section {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.coupon-input-row {
		display: flex;
		gap: 0.5rem;
	}

	.coupon-input {
		flex: 1;
		padding: 0.45rem 0.75rem;
		font-size: 0.85rem;
	}

	.apply-coupon-btn {
		padding: 0.45rem 0.9rem;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-primary);
		transition: all var(--transition-fast);
	}

	.apply-coupon-btn:hover {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
	}

	.applied-coupon-pill {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.45rem 0.75rem;
		border-radius: var(--radius-sm);
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		color: #34d399;
		font-size: 0.85rem;
	}

	.remove-coupon-btn {
		font-size: 0.75rem;
		color: var(--text-secondary);
		cursor: pointer;
	}

	.remove-coupon-btn:hover {
		color: var(--accent-sale);
	}

	.coupon-error {
		font-size: 0.75rem;
		color: var(--accent-sale);
	}

	.summary-rows {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
	}

	.discount-row {
		color: #34d399;
	}

	.total-row {
		font-size: 1.15rem;
		font-weight: 800;
		color: #ffffff;
		padding-top: 0.5rem;
		border-top: 1px solid var(--border-subtle);
		margin-top: 0.25rem;
	}

	.total-amount {
		color: var(--accent-secondary);
		font-family: var(--font-heading);
	}

	.checkout-btn {
		width: 100%;
		padding: 0.85rem;
		font-size: 1rem;
	}

	.safe-checkout-note {
		text-align: center;
		font-size: 0.75rem;
		color: var(--text-muted);
	}
</style>
