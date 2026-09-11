<script lang="ts">
	const REVIEWS = [
		{
			id: 1,
			name: 'Kenji S.',
			title: 'プロダクトデザイナー',
			rating: 5,
			product: 'Aurora Sound Pro',
			comment: 'デザインと音質のバランスが別次元。ノイズキャンセリングの圧迫感がなく、一日中集中して作業できます。デスクの景観も格段に洗練されました。',
			date: '2026年8月購入'
		},
		{
			id: 2,
			name: 'Emi T.',
			title: 'ソフトウェアエンジニア',
			rating: 5,
			product: 'Keyflow 75 Custom',
			comment: 'キーキャップの質感とCNCアルミの打鍵感が極上です。コトコトというタイピング音が心地よく、コーディングのモチベーションが上がります。',
			date: '2026年9月購入'
		},
		{
			id: 3,
			name: 'Daiki M.',
			title: 'クリエイティブディレクター',
			rating: 5,
			product: 'Aether Bar Light',
			comment: 'Ra98の高演色LEDのおかげで、紙のプリント校正や画面確認時の目の疲れが劇的に軽減しました。ミニマルな造形美が素晴らしい。',
			date: '2026年7月購入'
		}
	];
</script>

<section class="testimonials-section">
	<div class="container">
		<div class="section-header">
			<span class="sub-badge">VERIFIED REVIEWS</span>
			<h2 class="section-title">世界中のクリエイターやプロフェッショナルが愛用</h2>
			<p class="section-desc">妥協のないプロダクト作りが、クリエイティブな日常を刺激します。</p>
		</div>

		<div class="reviews-grid">
			{#each REVIEWS as review}
				<div class="review-card glass-card">
					<div class="review-stars">
						{#each Array(review.rating) as _}
							<span>★</span>
						{/each}
					</div>

					<p class="review-comment">“{review.comment}”</p>

					<div class="review-footer">
						<div class="author-info">
							<span class="author-name">{review.name}</span>
							<span class="author-title">{review.title}</span>
						</div>
						<div class="product-tag-wrap">
							<span class="verified-tag">✓ 購入済み</span>
							<span class="product-target">{review.product}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.testimonials-section {
		padding: 4.5rem 0;
		position: relative;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.sub-badge {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: var(--accent-secondary);
	}

	.section-title {
		font-size: clamp(1.8rem, 3.5vw, 2.4rem);
		color: #ffffff;
	}

	.section-desc {
		font-size: 0.95rem;
		color: var(--text-secondary);
	}

	.reviews-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.review-card {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		border-radius: var(--radius-md);
	}

	.review-stars {
		color: #fbbf24;
		font-size: 1.1rem;
		letter-spacing: 0.1em;
	}

	.review-comment {
		font-size: 0.95rem;
		color: var(--text-primary);
		line-height: 1.6;
		font-style: italic;
		flex: 1;
	}

	.review-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		border-top: 1px solid var(--border-subtle);
		padding-top: 1rem;
	}

	.author-info {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-weight: 700;
		font-size: 0.95rem;
		color: #ffffff;
	}

	.author-title {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.product-tag-wrap {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.2rem;
	}

	.verified-tag {
		font-size: 0.7rem;
		color: var(--accent-success);
		font-weight: 600;
	}

	.product-target {
		font-size: 0.75rem;
		color: var(--accent-primary);
		font-weight: 500;
	}

	@media (max-width: 900px) {
		.reviews-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
