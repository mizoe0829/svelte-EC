<script lang="ts">
	import { cart } from '$lib/state/cart.svelte';
	import { PRODUCTS } from '$lib/data/products';

	// Featured product for direct CTA
	const featured = PRODUCTS[0]; // Aurora Sound Pro

	function scrollToCatalog() {
		const el = document.getElementById('catalog-section');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section class="hero-section">
	<div class="hero-backdrop">
		<img src="/images/hero.jpg" alt="LUMEN Workspace Showcase" class="hero-bg-img" />
		<div class="hero-overlay"></div>
		<div class="hero-glow"></div>
	</div>

	<div class="container hero-content">
		<div class="hero-badge">
			<span class="badge-sparkle">✦</span>
			<span>2026 NEW COLLECTION LAUNCH</span>
		</div>

		<h1 class="hero-title">
			Form Meets Function.<br />
			<span class="gradient-text">Engineered for Living.</span>
		</h1>

		<p class="hero-description">
			研ぎ澄まされたミニマリズムと、妥協なき音響・ハードウェア工学の調和。<br class="br-desktop" />
			毎日のデスクワークと日常を劇的にアップデートする、プレミアム・テックコレクション。
		</p>

		<!-- Offer Banner -->
		<div class="promo-banner glass">
			<div class="promo-icon">🎁</div>
			<div class="promo-text">
				<span class="promo-title">オープン記念 10% OFF クーポン配布中</span>
				<span class="promo-code">クーポンコード: <strong class="highlight-code">LUMEN10</strong></span>
			</div>
			<button class="promo-apply-btn" onclick={() => cart.applyCoupon('LUMEN10')}>
				適用する
			</button>
		</div>

		<!-- Action Buttons -->
		<div class="hero-actions">
			<button type="button" class="btn btn-primary" onclick={scrollToCatalog}>
				<span>製品一覧を見る</span>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<polyline points="19 12 12 19 5 12"></polyline>
				</svg>
			</button>
			<button
				type="button"
				class="btn btn-secondary"
				onclick={() => cart.addItem(featured)}
			>
				<span>ベストセラーをカートに追加</span>
				<span class="btn-price">¥{featured.price.toLocaleString()}</span>
			</button>
		</div>

		<!-- Trust metrics -->
		<div class="hero-stats">
			<div class="stat-item">
				<span class="stat-num">4.95</span>
				<span class="stat-stars">★★★★★</span>
				<span class="stat-label">ユーザー総合評価</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-num">30 DAYS</span>
				<span class="stat-label">全額返品保証</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-num">2 YEARS</span>
				<span class="stat-label">公式製品保証</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 85vh;
		display: flex;
		align-items: center;
		padding: 4rem 0 5rem;
		overflow: hidden;
	}

	.hero-backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		filter: brightness(0.6) contrast(1.1);
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(9, 12, 21, 0.4) 0%,
			rgba(9, 12, 21, 0.85) 65%,
			rgba(9, 12, 21, 1) 100%
		);
	}

	.hero-glow {
		position: absolute;
		top: 20%;
		left: 10%;
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
		filter: blur(60px);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		max-width: 860px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.5rem;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.9rem;
		border-radius: var(--radius-full);
		background: rgba(99, 102, 241, 0.15);
		border: 1px solid rgba(99, 102, 241, 0.35);
		color: #a5b4fc;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.badge-sparkle {
		color: #fbbf24;
	}

	.hero-title {
		font-size: clamp(2.5rem, 5.5vw, 4.2rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.03em;
		color: #ffffff;
	}

	.gradient-text {
		background: linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #38bdf8 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-description {
		font-size: clamp(1rem, 1.8vw, 1.2rem);
		color: var(--text-secondary);
		max-width: 680px;
		line-height: 1.6;
	}

	/* Promo Banner */
	.promo-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.25rem;
		border-radius: var(--radius-md);
		border-color: rgba(99, 102, 241, 0.3);
		background: rgba(23, 30, 51, 0.75);
		flex-wrap: wrap;
	}

	.promo-icon {
		font-size: 1.3rem;
	}

	.promo-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.85rem;
	}

	.promo-title {
		color: var(--text-primary);
		font-weight: 600;
	}

	.promo-code {
		color: var(--text-secondary);
	}

	.highlight-code {
		color: #a5b4fc;
		background: rgba(99, 102, 241, 0.2);
		padding: 2px 6px;
		border-radius: 4px;
		letter-spacing: 0.05em;
	}

	.promo-apply-btn {
		margin-left: auto;
		padding: 0.4rem 0.9rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #ffffff;
		background: var(--accent-primary);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.promo-apply-btn:hover {
		background: var(--accent-primary-hover);
		transform: scale(1.04);
	}

	/* Actions */
	.hero-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	.btn-price {
		font-size: 0.85rem;
		color: var(--accent-secondary);
		margin-left: 0.25rem;
	}

	/* Stats */
	.hero-stats {
		display: flex;
		align-items: center;
		gap: 2rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-subtle);
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.stat-num {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		color: #ffffff;
	}

	.stat-stars {
		font-size: 0.85rem;
		color: #fbbf24;
		letter-spacing: 0.1em;
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-divider {
		width: 1px;
		height: 36px;
		background: var(--border-subtle);
	}

	@media (max-width: 768px) {
		.hero-section {
			min-height: auto;
			padding: 2.5rem 0 3.5rem;
		}
		.promo-apply-btn {
			margin-left: 0;
			width: 100%;
		}
		.br-desktop {
			display: none;
		}
		.stat-divider {
			display: none;
		}
		.hero-stats {
			gap: 1.5rem;
		}
	}
</style>
