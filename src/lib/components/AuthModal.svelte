<script lang="ts">
	import { auth } from '$lib/state/auth.svelte';

	let loginEmail = $state('sota.tanaka@lumen-studio.jp');
	let loginPassword = $state('password123');

	let regName = $state('');
	let regEmail = $state('');
	let regPostal = $state('');
	let regAddress = $state('');
	let regPassword = $state('');

	function handleLogin(e: Event) {
		e.preventDefault();
		auth.login(loginEmail, loginPassword);
	}

	function handleRegister(e: Event) {
		e.preventDefault();
		auth.register({
			fullName: regName,
			email: regEmail,
			postalCode: regPostal,
			address: regAddress
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			auth.closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if auth.isModalOpen}
	<div
		class="modal-backdrop"
		onclick={() => auth.closeModal()}
		onkeydown={(e) => e.key === 'Escape' && auth.closeModal()}
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
			<button
				type="button"
				class="close-btn"
				onclick={() => auth.closeModal()}
				aria-label="閉じる"
			>
				✕
			</button>

			<div class="modal-header">
				<span class="brand-tag">LUMEN MEMBERSHIP</span>
				<h2 class="modal-title">
					{auth.modalTab === 'login' ? 'アカウントにログイン' : '新規メンバーシップ登録'}
				</h2>
			</div>

			<!-- Tabs -->
			<div class="auth-tabs">
				<button
					type="button"
					class="tab-btn"
					class:active={auth.modalTab === 'login'}
					onclick={() => (auth.modalTab = 'login')}
				>
					ログイン
				</button>
				<button
					type="button"
					class="tab-btn"
					class:active={auth.modalTab === 'register'}
					onclick={() => (auth.modalTab = 'register')}
				>
					新規登録 (500pt進呈)
				</button>
			</div>

			<!-- Quick Demo Login Button -->
			<div class="demo-box">
				<button
					type="button"
					class="demo-login-btn"
					onclick={() => auth.loginAsDemo()}
				>
					<span class="sparkle">✦</span>
					<span>デモアカウント（ゴールド会員）でワンクリックログイン</span>
				</button>
			</div>

			<div class="divider">
				<span>または</span>
			</div>

			<!-- Login Form -->
			{#if auth.modalTab === 'login'}
				<form onsubmit={handleLogin} class="auth-form animate-fade-in">
					<div class="form-group">
						<label for="login-email">メールアドレス</label>
						<input
							id="login-email"
							type="email"
							bind:value={loginEmail}
							required
							placeholder="you@example.com"
						/>
					</div>

					<div class="form-group">
						<label for="login-pw">パスワード</label>
						<input
							id="login-pw"
							type="password"
							bind:value={loginPassword}
							required
							placeholder="••••••••"
						/>
					</div>

					<button type="submit" class="btn btn-primary submit-btn">
						ログインする
					</button>
				</form>
			{:else}
				<!-- Register Form -->
				<form onsubmit={handleRegister} class="auth-form animate-fade-in">
					<div class="form-group">
						<label for="reg-name">お名前 <span class="req">*</span></label>
						<input
							id="reg-name"
							type="text"
							bind:value={regName}
							required
							placeholder="山田 太郎"
						/>
					</div>

					<div class="form-group">
						<label for="reg-email">メールアドレス <span class="req">*</span></label>
						<input
							id="reg-email"
							type="email"
							bind:value={regEmail}
							required
							placeholder="you@example.com"
						/>
					</div>

					<div class="form-grid-2">
						<div class="form-group">
							<label for="reg-postal">郵便番号</label>
							<input
								id="reg-postal"
								type="text"
								bind:value={regPostal}
								placeholder="150-0001"
							/>
						</div>
						<div class="form-group">
							<label for="reg-pw">パスワード <span class="req">*</span></label>
							<input
								id="reg-pw"
								type="password"
								bind:value={regPassword}
								required
								placeholder="8文字以上"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="reg-addr">お届け先住所</label>
						<input
							id="reg-addr"
							type="text"
							bind:value={regAddress}
							placeholder="東京都渋谷区..."
						/>
					</div>

					<button type="submit" class="btn btn-primary submit-btn">
						登録して会員特典を受け取る
					</button>
				</form>
			{/if}
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
		z-index: 2200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		animation: fadeIn 0.2s ease-out;
	}

	.modal-card {
		position: relative;
		width: 100%;
		max-width: 480px;
		background: rgba(16, 21, 36, 0.98);
		border-radius: var(--radius-lg);
		border: 1px solid var(--border-medium);
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px var(--accent-glow);
		padding: 2.25rem;
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.close-btn {
		position: absolute;
		top: 18px;
		right: 18px;
		font-size: 1.2rem;
		color: var(--text-secondary);
		padding: 4px;
		transition: color var(--transition-fast);
	}

	.close-btn:hover {
		color: #ffffff;
	}

	.modal-header {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin-bottom: 1.5rem;
	}

	.brand-tag {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--accent-secondary);
	}

	.modal-title {
		font-size: 1.4rem;
		font-weight: 800;
		color: #ffffff;
	}

	/* Tabs */
	.auth-tabs {
		display: flex;
		background: var(--bg-surface-elevated);
		border-radius: var(--radius-sm);
		padding: 4px;
		margin-bottom: 1.25rem;
		border: 1px solid var(--border-subtle);
	}

	.tab-btn {
		flex: 1;
		padding: 0.5rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--text-secondary);
		border-radius: 6px;
		transition: all var(--transition-fast);
	}

	.tab-btn.active {
		background: rgba(255, 255, 255, 0.12);
		color: #ffffff;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	/* Demo button */
	.demo-box {
		margin-bottom: 1rem;
	}

	.demo-login-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: var(--radius-sm);
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(217, 70, 239, 0.2) 100%);
		border: 1px solid rgba(99, 102, 241, 0.4);
		color: #c7d2fe;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.demo-login-btn:hover {
		background: linear-gradient(135deg, rgba(99, 102, 241, 0.35) 0%, rgba(217, 70, 239, 0.35) 100%);
		border-color: var(--accent-primary);
		transform: translateY(-1px);
		color: #ffffff;
	}

	.sparkle {
		color: #fbbf24;
	}

	.divider {
		display: flex;
		align-items: center;
		text-align: center;
		margin: 1rem 0 1.25rem;
		color: var(--text-muted);
		font-size: 0.75rem;
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		border-bottom: 1px solid var(--border-subtle);
	}

	.divider span {
		padding: 0 0.75rem;
	}

	/* Forms */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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

	.req {
		color: var(--accent-sale);
	}

	.form-group input {
		padding: 0.65rem 0.85rem;
		font-size: 0.9rem;
	}

	.form-grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.submit-btn {
		width: 100%;
		margin-top: 0.5rem;
		padding: 0.85rem;
	}
</style>
