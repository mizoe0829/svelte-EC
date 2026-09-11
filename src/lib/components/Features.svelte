<section class="features-section">
	<div class="container">
		<div class="features-grid">
			<div class="feature-item glass-card">
				<div class="feature-icon-box">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<rect x="1" y="3" width="15" height="13"></rect>
						<polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
						<circle cx="5.5" cy="18.5" r="2.5"></circle>
						<circle cx="18.5" cy="18.5" r="2.5"></circle>
					</svg>
				</div>
				<div class="feature-text">
					<h3 class="feature-title">¥15,000以上で全国送料無料</h3>
					<p class="feature-desc">最短当日発送。丁寧な精密機器専用梱包でお手元へ安全にお届けします。</p>
				</div>
			</div>

			<div class="feature-item glass-card">
				<div class="feature-icon-box">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
					</svg>
				</div>
				<div class="feature-text">
					<h3 class="feature-title">30日間無条件返品保証</h3>
					<p class="feature-desc">ご自宅でじっくりお試しいただけます。ご満足いただけない場合は全額返金。</p>
				</div>
			</div>

			<div class="feature-item glass-card">
				<div class="feature-icon-box">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
					</svg>
				</div>
				<div class="feature-text">
					<h3 class="feature-title">2年間公式製品保証</h3>
					<p class="feature-desc">全プロダクトに長期2年保証が付属。自然故障時の無償交換・修理に対応。</p>
				</div>
			</div>

			<div class="feature-item glass-card">
				<div class="feature-icon-box">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
					</svg>
				</div>
				<div class="feature-text">
					<h3 class="feature-title">専任スペシャリストサポート</h3>
					<p class="feature-desc">製品選定から初期設定まで、専門知識をもったコンシェルジュがサポート。</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.features-section {
		padding: 2.5rem 0;
		position: relative;
		z-index: 2;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	.feature-item {
		padding: 1.25rem;
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		border-radius: var(--radius-md);
	}

	.feature-icon-box {
		width: 44px;
		height: 44px;
		border-radius: var(--radius-sm);
		background: rgba(99, 102, 241, 0.12);
		border: 1px solid rgba(99, 102, 241, 0.25);
		color: var(--accent-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.feature-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.feature-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.feature-desc {
		font-size: 0.8rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
