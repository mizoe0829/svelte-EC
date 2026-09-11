<script lang="ts">
	import { toast } from '$lib/state/toast.svelte';

	let newsletterEmail = $state('');

	function handleNewsletter(e: Event) {
		e.preventDefault();
		if (!newsletterEmail) return;
		toast.show('ニュースレターにご登録いただきありがとうございます！', '10% OFF クーポンコードをお届けしました。', 'success');
		newsletterEmail = '';
	}
</script>

<footer class="footer-root">
	<!-- Newsletter Strip -->
	<div class="newsletter-wrap">
		<div class="container newsletter-inner glass-card">
			<div class="newsletter-text">
				<h3 class="newsletter-title">LUMEN Insider に参加する</h3>
				<p class="newsletter-sub">新製品の限定先行予約、特別なシークレットセール、ストーリーをお届けします。</p>
			</div>

			<form onsubmit={handleNewsletter} class="newsletter-form">
				<input
					type="email"
					placeholder="メールアドレスを入力..."
					bind:value={newsletterEmail}
					required
					class="newsletter-input"
				/>
				<button type="submit" class="btn btn-primary">
					登録する
				</button>
			</form>
		</div>
	</div>

	<!-- Main Footer Links -->
	<div class="container footer-main">
		<div class="footer-grid">
			<!-- Brand Column -->
			<div class="footer-col brand-col">
				<div class="footer-logo">
					<span class="logo-dot"></span>
					<span class="logo-name">LUMEN</span>
				</div>
				<p class="brand-desc">
					洗練されたミニマリズムと高精度エンジニアリングが織りなす、日常とワークスペースのための次世代プロダクトデザイン。
				</p>
				<div class="social-links">
					<a href="#twitter" class="social-btn" aria-label="X / Twitter">𝕏</a>
					<a href="#instagram" class="social-btn" aria-label="Instagram">📸</a>
					<a href="#github" class="social-btn" aria-label="GitHub">🐙</a>
				</div>
			</div>

			<!-- Col 1: Categories -->
			<div class="footer-col">
				<h4 class="col-title">コレクション</h4>
				<ul class="col-links">
					<li><a href="#catalog-section">オーディオ＆ヘッドホン</a></li>
					<li><a href="#catalog-section">ワークスペース＆キーボード</a></li>
					<li><a href="#catalog-section">スマートウォッチ＆ウェアラブル</a></li>
					<li><a href="#catalog-section">ライフスタイル＆ケア</a></li>
					<li><a href="#catalog-section">限定エディション</a></li>
				</ul>
			</div>

			<!-- Col 2: Support -->
			<div class="footer-col">
				<h4 class="col-title">カスタマーサポート</h4>
				<ul class="col-links">
					<li><a href="#support">配送とお届けについて</a></li>
					<li><a href="#support">30日間返品・交換ポリシー</a></li>
					<li><a href="#support">2年間公式製品保証規定</a></li>
					<li><a href="#support">よくあるご質問 (FAQ)</a></li>
					<li><a href="#support">お問い合わせコンシェルジュ</a></li>
				</ul>
			</div>

			<!-- Col 3: Company -->
			<div class="footer-col">
				<h4 class="col-title">ブランド情報</h4>
				<ul class="col-links">
					<li><a href="#about">ブランド哲学</a></li>
					<li><a href="#sustainability">サステナビリティの取り組み</a></li>
					<li><a href="#press">プレスルーム / メディア掲載</a></li>
					<li><a href="#terms">利用規約</a></li>
					<li><a href="#privacy">特定商取引法に基づく表記</a></li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="footer-bottom">
			<p class="copyright">
				&copy; 2026 LUMEN Design Inc. All rights reserved. Built with SvelteKit & Svelte 5.
			</p>
			<div class="payment-icons">
				<span class="pay-tag">VISA</span>
				<span class="pay-tag">Mastercard</span>
				<span class="pay-tag">JCB</span>
				<span class="pay-tag">Apple Pay</span>
				<span class="pay-tag">Google Pay</span>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-root {
		background: #06080e;
		border-top: 1px solid var(--border-subtle);
		margin-top: 5rem;
		position: relative;
	}

	.newsletter-wrap {
		margin-top: -3.5rem;
		padding: 0 1.5rem;
	}

	.newsletter-inner {
		padding: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		background: rgba(18, 24, 40, 0.9);
		border-radius: var(--radius-lg);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
	}

	.newsletter-text {
		max-width: 500px;
	}

	.newsletter-title {
		font-size: 1.5rem;
		color: #ffffff;
		margin-bottom: 0.25rem;
	}

	.newsletter-sub {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.newsletter-form {
		display: flex;
		gap: 0.75rem;
		flex: 1;
		max-width: 440px;
	}

	.newsletter-input {
		flex: 1;
		padding: 0.75rem 1rem;
		font-size: 0.9rem;
	}

	/* Footer Main */
	.footer-main {
		padding-top: 4rem;
		padding-bottom: 3rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: 3rem;
		margin-bottom: 3rem;
	}

	.brand-col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-dot {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		background: var(--accent-gradient);
	}

	.logo-name {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 800;
		letter-spacing: 0.15em;
		color: #ffffff;
	}

	.brand-desc {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.social-links {
		display: flex;
		gap: 0.75rem;
	}

	.social-btn {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.9rem;
		color: var(--text-secondary);
		transition: all var(--transition-fast);
	}

	.social-btn:hover {
		color: #ffffff;
		border-color: var(--border-highlight);
		background: rgba(99, 102, 241, 0.2);
		transform: translateY(-2px);
	}

	.col-title {
		font-size: 0.9rem;
		font-weight: 700;
		color: #ffffff;
		letter-spacing: 0.05em;
		margin-bottom: 1.25rem;
	}

	.col-links {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.col-links a {
		font-size: 0.85rem;
		color: var(--text-secondary);
		transition: color var(--transition-fast);
	}

	.col-links a:hover {
		color: #ffffff;
		text-decoration: underline;
	}

	/* Bottom */
	.footer-bottom {
		padding-top: 2rem;
		border-top: 1px solid var(--border-subtle);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.copyright {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.payment-icons {
		display: flex;
		gap: 0.5rem;
	}

	.pay-tag {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 3px 8px;
		border-radius: 4px;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		color: var(--text-secondary);
	}

	@media (max-width: 960px) {
		.newsletter-inner {
			flex-direction: column;
			align-items: stretch;
		}
		.newsletter-form {
			max-width: 100%;
		}
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 600px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}
		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
