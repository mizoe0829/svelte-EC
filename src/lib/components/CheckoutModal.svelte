<script lang="ts">
	/**
	 * CheckoutModal.svelte
	 * -------------------------------------------------------------------------
	 * ショッピングカートからの購入手続きを行う3ステップのモーダルダイアログ。
	 * 
	 * 【主な機能】
	 * 1. ステップ1: 配送先住所・連絡先の入力（ログイン中はプロフィール情報を自動補完）
	 * 2. ステップ2: 決済方法の選択（クレカ、Apple Pay、コンビニ決済）および模擬決済
	 * 3. ステップ3: 注文完了画面（注文番号の発行、注文履歴への自動保存、カートの初期化）
	 * -------------------------------------------------------------------------
	 */
	import { cart } from '$lib/state/cart.svelte';
	import { toast } from '$lib/state/toast.svelte';
	import { auth } from '$lib/state/auth.svelte';
	import { orders } from '$lib/state/orders.svelte';

	// 現在のチェックアウトステップ (1: 配送先, 2: 決済, 3: 完了)
	let currentStep = $state<1 | 2 | 3>(1);

	// 決済処理中のスピナー表示フラグ
	let isProcessing = $state(false);

	// -------------------------------------------------------------------------
	// 配送先フォームのリアクティブ状態
	// -------------------------------------------------------------------------
	let fullName = $state('山田 太郎');
	let email = $state('user@example.com');
	let postalCode = $state('100-0001');
	let address = $state('東京都千代田区千代田1-1');

	// -------------------------------------------------------------------------
	// 決済関連の状態
	// -------------------------------------------------------------------------
	let paymentMethod = $state<'credit' | 'apple-pay' | 'convenience'>('credit');
	let cardNumber = $state('•••• •••• •••• 4242');
	let cardExpiry = $state('12/28');
	let cardCvc = $state('•••');

	// 発行された注文番号
	let orderNumber = $state('');

	/**
	 * ユーザーがログインしている場合、チェックアウト起動時に登録済みプロフィールから自動入力
	 */
	$effect(() => {
		if (cart.isCheckingOut && auth.user) {
			fullName = auth.user.fullName;
			email = auth.user.email;
			postalCode = auth.user.postalCode;
			address = auth.user.address;
		}
	});

	/**
	 * ステップ1 -> ステップ2 (決済選択) への進行処理
	 * 必須項目の入力チェックを行う
	 */
	function proceedToPayment(e: Event) {
		e.preventDefault();
		if (!fullName || !email || !address) {
			toast.show('必須項目を入力してください', '', 'warning');
			return;
		}
		currentStep = 2;
	}

	/**
	 * ステップ2 -> ステップ3 (注文確定) の処理
	 * 模擬決済ディレイ(1.2秒)を経て注文番号を発行し、注文履歴へ保存する
	 */
	function handleCompleteOrder() {
		isProcessing = true;

		setTimeout(() => {
			isProcessing = false;
			orderNumber = 'LMN-' + Math.floor(100000 + Math.random() * 900000);

			// 注文履歴ストア (orders) へ新しい注文を記録
			orders.addOrder({
				orderId: orderNumber,
				userId: auth.user?.id,
				date: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }),
				status: 'processing', // 初期ステータスは「出荷準備中」
				items: [...cart.items],
				subtotal: cart.subtotal,
				discount: cart.discountAmount,
				shipping: cart.shippingFee,
				total: cart.total,
				fullName,
				email,
				postalCode,
				address,
				paymentMethod
			});

			// ステップを完了画面へ移行し、カートを初期化
			currentStep = 3;
			cart.clear();
			toast.show('ご注文が完了しました！', `注文番号: ${orderNumber}`, 'success');
		}, 1200);
	}

	/**
	 * モーダルを閉じ、ステップを最初(1)に戻す
	 */
	function handleClose() {
		cart.closeCheckout();
		currentStep = 1;
	}
</script>

<!-- =========================================================================
     チェックアウト モーダルダイアログ
     cart.isCheckingOut が true の時に画面最前面に表示
     ========================================================================= -->
{#if cart.isCheckingOut}
	<div
		class="checkout-backdrop"
		onclick={handleClose}
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
		role="button"
		tabindex="0"
		aria-label="チェックアウトを閉じる"
	>
		<div
			class="checkout-modal glass"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- -----------------------------------------------------------------
			     ヘッダー (ステップに応じたタイトル表示)
			     ----------------------------------------------------------------- -->
			<div class="modal-header">
				<div class="header-left">
					<span class="brand-tag">LUMEN CHECKOUT</span>
					<h2 class="modal-title">
						{#if currentStep === 1}
							配送先情報の入力
						{:else if currentStep === 2}
							お支払い方法の選択
						{:else}
							ご注文ありがとうございます！
						{/if}
					</h2>
				</div>
				{#if currentStep !== 3}
					<button type="button" class="close-btn" onclick={handleClose} aria-label="閉じる">✕</button>
				{/if}
			</div>

			<!-- -----------------------------------------------------------------
			     ステップインジケーター (ステップ1〜2で進行状況を視覚化)
			     ----------------------------------------------------------------- -->
			{#if currentStep !== 3}
				<div class="step-indicator">
					<div class="step-badge" class:active={currentStep === 1} class:done={currentStep > 1}>
						<span>1</span>
						<span class="step-name">配送先</span>
					</div>
					<div class="step-line" class:done={currentStep > 1}></div>
					<div class="step-badge" class:active={currentStep === 2}>
						<span>2</span>
						<span class="step-name">お支払い</span>
					</div>
					<div class="step-line"></div>
					<div class="step-badge">
						<span>3</span>
						<span class="step-name">完了</span>
					</div>
				</div>
			{/if}

			<!-- -----------------------------------------------------------------
			     ステップ1: 配送先フォーム (氏名・メール・郵便番号・住所)
			     ----------------------------------------------------------------- -->
			{#if currentStep === 1}
				<form onsubmit={proceedToPayment} class="step-content">
					<div class="form-grid">
						<div class="form-group">
							<label for="fullName">お名前 <span class="required">*</span></label>
							<input id="fullName" type="text" bind:value={fullName} required />
						</div>

						<div class="form-group">
							<label for="email">メールアドレス <span class="required">*</span></label>
							<input id="email" type="email" bind:value={email} required />
						</div>

						<div class="form-group">
							<label for="postalCode">郵便番号 <span class="required">*</span></label>
							<input id="postalCode" type="text" bind:value={postalCode} required />
						</div>

						<div class="form-group full-width">
							<label for="address">お届け先住所 <span class="required">*</span></label>
							<input id="address" type="text" bind:value={address} required />
						</div>
					</div>

					<!-- カート内サマリー (アイテム数 & 税込請求合計額) -->
					<div class="order-brief glass-card">
						<div class="brief-row">
							<span>合計アイテム数:</span>
							<strong>{cart.itemCount} 点</strong>
						</div>
						<div class="brief-row">
							<span>ご請求額 (税込):</span>
							<strong class="highlight-total">¥{cart.total.toLocaleString()}</strong>
						</div>
					</div>

					<!-- フッターアクション (戻る / お支払いへ進む) -->
					<div class="footer-actions">
						<button type="button" class="btn btn-secondary" onclick={handleClose}>
							カートに戻る
						</button>
						<button type="submit" class="btn btn-primary next-btn">
							<span>お支払いへ進む</span>
							<span>→</span>
						</button>
					</div>
				</form>
			{/if}

			<!-- -----------------------------------------------------------------
			     ステップ2: お支払い方法の選択 (クレカ / Apple Pay / コンビニ払い)
			     ----------------------------------------------------------------- -->
			{#if currentStep === 2}
				<div class="step-content">
					<div class="payment-methods">
						<!-- オプション1: クレジットカード -->
						<label class="method-card" class:selected={paymentMethod === 'credit'}>
							<input type="radio" name="payment" value="credit" bind:group={paymentMethod} />
							<div class="method-info">
								<span class="method-title">💳 クレジットカード (VISA / Mastercard / JCB / AMEX)</span>
								<span class="method-sub">即時決済・手数料無料</span>
							</div>
						</label>

						<!-- クレジットカード選択時のみ展開されるカード情報入力欄 -->
						{#if paymentMethod === 'credit'}
							<div class="card-details-box animate-slide-down">
								<div class="form-group full-width">
									<label for="cardNum">カード番号</label>
									<input id="cardNum" type="text" bind:value={cardNumber} />
								</div>
								<div class="form-grid-half">
									<div class="form-group">
										<label for="cardExp">有効期限</label>
										<input id="cardExp" type="text" bind:value={cardExpiry} />
									</div>
									<div class="form-group">
										<label for="cardCvc">セキュリティコード (CVC)</label>
										<input id="cardCvc" type="text" bind:value={cardCvc} />
									</div>
								</div>
							</div>
						{/if}

						<!-- オプション2: Apple Pay / Google Pay -->
						<label class="method-card" class:selected={paymentMethod === 'apple-pay'}>
							<input type="radio" name="payment" value="apple-pay" bind:group={paymentMethod} />
							<div class="method-info">
								<span class="method-title">🍏 Apple Pay / Google Pay</span>
								<span class="method-sub">ワンタップで安全にお支払い</span>
							</div>
						</label>

						<!-- オプション3: コンビニ後払い / 銀行振込 -->
						<label class="method-card" class:selected={paymentMethod === 'convenience'}>
							<input type="radio" name="payment" value="convenience" bind:group={paymentMethod} />
							<div class="method-info">
								<span class="method-title">🏪 コンビニ後払い / 銀行振込</span>
								<span class="method-sub">商品到着後のお支払い (手数料 ¥250)</span>
							</div>
						</label>
					</div>

					<!-- フッターアクション (前ステップに戻る / 注文確定ボタン) -->
					<div class="footer-actions">
						<button type="button" class="btn btn-secondary" onclick={() => (currentStep = 1)}>
							← 配送先を修正
						</button>
						<button
							type="button"
							class="btn btn-primary next-btn"
							onclick={handleCompleteOrder}
							disabled={isProcessing}
						>
							{#if isProcessing}
								<span class="spinner"></span>
								<span>決済を処理中...</span>
							{:else}
								<span>¥{cart.total.toLocaleString()} を支払って注文確定</span>
							{/if}
						</button>
					</div>
				</div>
			{/if}

			<!-- -----------------------------------------------------------------
			     ステップ3: 注文完了サンクス画面
			     ----------------------------------------------------------------- -->
			{#if currentStep === 3}
				<div class="step-content success-step animate-slide-up">
					<div class="success-icon-wrap">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
							<polyline points="22 4 12 14.01 9 11.01"></polyline>
						</svg>
					</div>

					<h3 class="success-title">ご注文が正常に完了しました</h3>
					<p class="success-msg">
						ご登録いただいたメールアドレス（<strong>{email}</strong>）へ注文確認メールをお送りしました。
					</p>

					<!-- 注文情報カード -->
					<div class="order-info-card glass-card">
						<div class="info-row">
							<span>注文番号:</span>
							<strong class="highlight-code">{orderNumber}</strong>
						</div>
						<div class="info-row">
							<span>配送先:</span>
							<span>〒{postalCode} {address} ({fullName} 様)</span>
						</div>
						<div class="info-row">
							<span>お届け予定:</span>
							<strong class="green-text">最短明日午前中にお届け</strong>
						</div>
					</div>

					<button type="button" class="btn btn-primary complete-btn" onclick={handleClose}>
						トップページに戻って買い物を続ける
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* -------------------------------------------------------------------------
	   モーダル オーバーレイ & メインコンテナ (グラスモーフィズム)
	   ------------------------------------------------------------------------- */
	.checkout-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(5, 7, 13, 0.88);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		z-index: 2100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		animation: fadeIn 0.2s ease-out;
	}

	.checkout-modal {
		position: relative;
		width: 100%;
		max-width: 620px;
		background: rgba(16, 21, 36, 0.98);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-medium);
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
		padding: 2rem;
		max-height: 90vh;
		overflow-y: auto;
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* -------------------------------------------------------------------------
	   ヘッダー (ブランドバッジ・タイトル・閉じるボタン)
	   ------------------------------------------------------------------------- */
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.brand-tag {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: var(--accent-secondary);
	}

	.modal-title {
		font-size: 1.4rem;
		font-weight: 800;
		color: #ffffff;
		margin-top: 2px;
	}

	.close-btn {
		font-size: 1.2rem;
		color: var(--text-secondary);
		padding: 4px;
	}

	.close-btn:hover {
		color: #ffffff;
	}

	/* -------------------------------------------------------------------------
	   ステップインジケーター (3段階のステップ進行プログレス)
	   ------------------------------------------------------------------------- */
	.step-indicator {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
		padding: 0 1rem;
	}

	.step-badge {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.step-badge span {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.step-badge.active span {
		background: var(--accent-primary);
		color: #ffffff;
		border-color: var(--accent-primary);
		box-shadow: 0 0 12px var(--accent-glow);
	}

	.step-badge.done span {
		background: var(--accent-success);
		color: #ffffff;
		border-color: var(--accent-success);
	}

	.step-name {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.step-badge.active .step-name {
		color: var(--text-primary);
		font-weight: 600;
	}

	.step-line {
		flex: 1;
		height: 2px;
		background: var(--border-subtle);
		margin: 0 10px;
		margin-bottom: 18px;
	}

	.step-line.done {
		background: var(--accent-success);
	}

	/* -------------------------------------------------------------------------
	   ステップ1: 配送先入力フォーム & カート内要約カード
	   ------------------------------------------------------------------------- */
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.form-group label {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.required {
		color: var(--accent-sale);
	}

	.form-group input {
		padding: 0.65rem 0.85rem;
		font-size: 0.9rem;
	}

	.order-brief {
		padding: 1rem;
		border-radius: var(--radius-sm);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		font-size: 0.9rem;
	}

	.brief-row {
		display: flex;
		justify-content: space-between;
	}

	.highlight-total {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		color: var(--accent-secondary);
	}

	.footer-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.next-btn {
		margin-left: auto;
	}

	/* -------------------------------------------------------------------------
	   ステップ2: 決済方法選択カード (ラジオ選択)
	   ------------------------------------------------------------------------- */
	.payment-methods {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.method-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.method-card:hover {
		border-color: var(--border-medium);
	}

	.method-card.selected {
		border-color: var(--accent-primary);
		background: rgba(99, 102, 241, 0.1);
	}

	.method-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.method-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.method-sub {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.card-details-box {
		padding: 1rem;
		background: rgba(10, 14, 25, 0.6);
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.form-grid-half {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	/* 決済処理中アニメーションスピナー */
	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: #ffffff;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* -------------------------------------------------------------------------
	   ステップ3: 注文完了サンクス画面 & 注文控えカード
	   ------------------------------------------------------------------------- */
	.success-step {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 1rem 0;
	}

	.success-icon-wrap {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: rgba(16, 185, 129, 0.15);
		border: 1px solid rgba(16, 185, 129, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.success-title {
		font-size: 1.4rem;
		color: #ffffff;
		margin-bottom: 0.5rem;
	}

	.success-msg {
		font-size: 0.9rem;
		color: var(--text-secondary);
		max-width: 480px;
		margin-bottom: 1.5rem;
	}

	.order-info-card {
		width: 100%;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		text-align: left;
		font-size: 0.85rem;
		margin-bottom: 1.5rem;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
	}

	.green-text {
		color: var(--accent-success);
	}

	.highlight-code {
		color: var(--accent-secondary);
		font-family: monospace;
		font-size: 1rem;
	}

	.complete-btn {
		width: 100%;
		padding: 0.9rem;
	}

	@media (max-width: 600px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
