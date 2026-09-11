<script lang="ts">
	import { auth } from '$lib/state/auth.svelte';
	import { orders } from '$lib/state/orders.svelte';
	import { wishlist } from '$lib/state/wishlist.svelte';
	import { cart } from '$lib/state/cart.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let activeTab = $state<'orders' | 'profile' | 'wishlist'>('orders');

	// Profile form states
	let editName = $state(auth.user?.fullName || '');
	let editEmail = $state(auth.user?.email || '');
	let editPostal = $state(auth.user?.postalCode || '');
	let editAddress = $state(auth.user?.address || '');
	let editPhone = $state(auth.user?.phone || '090-1234-5678');

	$effect(() => {
		if (auth.user) {
			editName = auth.user.fullName;
			editEmail = auth.user.email;
			editPostal = auth.user.postalCode;
			editAddress = auth.user.address;
			editPhone = auth.user.phone || '';
		}
	});

	function handleSaveProfile(e: Event) {
		e.preventDefault();
		auth.updateProfile({
			fullName: editName,
			email: editEmail,
			postalCode: editPostal,
			address: editAddress,
			phone: editPhone
		});
	}
</script>

<svelte:head>
	<title>マイページ | LUMEN Studio</title>
</svelte:head>

<div class="site-wrapper">
	<Header />

	<main class="mypage-main container">
		<!-- Back to Store link -->
		<div class="top-nav-row">
			<a href="/" class="back-link">
				<span>←</span>
				<span>ストアトップに戻る</span>
			</a>
		</div>

		{#if !auth.isAuthenticated}
			<!-- Not Authenticated View -->
			<div class="guest-gate glass-card animate-slide-up">
				<div class="gate-icon">🔐</div>
				<h1 class="gate-title">マイページ</h1>
				<p class="gate-desc">
					注文履歴の確認、配送状況の追跡、会員特典をご利用いただくにはログインが必要です。
				</p>
				<div class="gate-actions">
					<button type="button" class="btn btn-primary" onclick={() => auth.openModal('login')}>
						ログインする
					</button>
					<button type="button" class="btn btn-secondary" onclick={() => auth.loginAsDemo()}>
						✦ デモアカウントで今すぐ体験
					</button>
				</div>
			</div>
		{:else}
			<!-- Authenticated MyPage Content -->
			<div class="user-header glass-card animate-slide-up">
				<div class="user-profile-left">
					<div class="user-avatar-large">
						{#if auth.user?.avatar}
							<img src={auth.user.avatar} alt={auth.user.fullName} class="avatar-large-img" />
						{:else}
							<span>👤</span>
						{/if}
					</div>
					<div class="user-profile-meta">
						<div class="rank-badge-row">
							<span class="rank-badge rank-{auth.user?.memberRank.toLowerCase()}">
								★ {auth.user?.memberRank.toUpperCase()} MEMBER
							</span>
							<span class="member-since">登録: {auth.user?.memberSince}</span>
						</div>
						<h1 class="user-greeting">{auth.user?.fullName} 様</h1>
						<p class="user-email-text">{auth.user?.email}</p>
					</div>
				</div>

				<!-- Stats cards -->
				<div class="user-stats-right">
					<div class="stat-pill">
						<span class="stat-pill-label">保有ポイント</span>
						<span class="stat-pill-val point-val">{auth.user?.points.toLocaleString()} pt</span>
						<span class="stat-pill-sub">1pt = ¥1 として利用可能</span>
					</div>
					<div class="stat-pill">
						<span class="stat-pill-label">総注文回数</span>
						<span class="stat-pill-val">{orders.orders.length} 回</span>
						<span class="stat-pill-sub">全品送料無料特典中</span>
					</div>
					<button type="button" class="btn-logout" onclick={() => auth.logout()}>
						ログアウト
					</button>
				</div>
			</div>

			<!-- Tab Navigation -->
			<div class="mypage-tabs">
				<button
					type="button"
					class="mypage-tab-btn"
					class:active={activeTab === 'orders'}
					onclick={() => (activeTab = 'orders')}
				>
					<span>📦 ご注文履歴</span>
					<span class="tab-count">{orders.orders.length}</span>
				</button>
				<button
					type="button"
					class="mypage-tab-btn"
					class:active={activeTab === 'profile'}
					onclick={() => (activeTab = 'profile')}
				>
					<span>👤 お届け先・会員情報</span>
				</button>
				<button
					type="button"
					class="mypage-tab-btn"
					class:active={activeTab === 'wishlist'}
					onclick={() => (activeTab = 'wishlist')}
				>
					<span>🤍 お気に入り</span>
					<span class="tab-count">{wishlist.items.length}</span>
				</button>
			</div>

			<!-- Tab Content: Orders -->
			{#if activeTab === 'orders'}
				<div class="orders-section animate-fade-in">
					{#if orders.orders.length === 0}
						<div class="empty-orders glass-card">
							<p class="empty-icon">📦</p>
							<h3>ご注文履歴はありません</h3>
							<p class="empty-desc">まだ商品をご注文いただいていません。</p>
							<a href="/" class="btn btn-primary">ストアで商品を探す</a>
						</div>
					{:else}
						<div class="orders-list">
							{#each orders.orders as order (order.orderId)}
								<div class="order-card glass-card">
									<!-- Order Header -->
									<div class="order-card-header">
										<div class="order-head-col">
											<span class="head-label">ご注文日</span>
											<span class="head-val">{order.date}</span>
										</div>
										<div class="order-head-col">
											<span class="head-label">注文番号</span>
											<span class="head-val order-num-tag">{order.orderId}</span>
										</div>
										<div class="order-head-col">
											<span class="head-label">ご請求合計</span>
											<span class="head-val total-price">¥{order.total.toLocaleString()}</span>
										</div>
										<div class="order-head-status">
											{#if order.status === 'delivered'}
												<span class="status-badge status-delivered">✓ 配達完了</span>
											{:else if order.status === 'shipped'}
												<span class="status-badge status-shipped">🚚 配送中</span>
											{:else}
												<span class="status-badge status-processing">⏳ 出荷準備中</span>
											{/if}
										</div>
									</div>

									<!-- Order Items -->
									<div class="order-items-grid">
										{#each order.items as item}
											<div class="order-item-row">
												<img src={item.product.images[0]} alt={item.product.name} class="order-item-thumb" />
												<div class="order-item-details">
													<h4 class="order-item-title">{item.product.name}</h4>
													<p class="order-item-color">
														カラー: {item.selectedColor.name} / 数量: {item.quantity} 点
													</p>
													<span class="order-item-price">¥{(item.product.price * item.quantity).toLocaleString()}</span>
												</div>
											</div>
										{/each}
									</div>

									<!-- Order Footer -->
									<div class="order-card-footer">
										<div class="shipping-address-snippet">
											<span>お届け先: 〒{order.postalCode} {order.address} ({order.fullName} 様)</span>
										</div>
										<button
											type="button"
											class="btn btn-secondary reorder-btn"
											onclick={() => orders.reorder(order)}
										>
											<span>再注文する</span>
											<span>↻</span>
										</button>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			<!-- Tab Content: Profile Form -->
			{#if activeTab === 'profile'}
				<div class="profile-section glass-card animate-fade-in">
					<div class="section-title-box">
						<h3>会員情報・お届け先の編集</h3>
						<p class="section-subtitle">ここで設定した内容は、次回のご注文時に自動で反映されます。</p>
					</div>

					<form onsubmit={handleSaveProfile} class="profile-edit-form">
						<div class="form-grid-2">
							<div class="form-group">
								<label for="prof-name">氏名</label>
								<input id="prof-name" type="text" bind:value={editName} required />
							</div>
							<div class="form-group">
								<label for="prof-email">メールアドレス</label>
								<input id="prof-email" type="email" bind:value={editEmail} required />
							</div>
						</div>

						<div class="form-grid-2">
							<div class="form-group">
								<label for="prof-phone">電話番号</label>
								<input id="prof-phone" type="text" bind:value={editPhone} />
							</div>
							<div class="form-group">
								<label for="prof-postal">郵便番号</label>
								<input id="prof-postal" type="text" bind:value={editPostal} required />
							</div>
						</div>

						<div class="form-group">
							<label for="prof-address">お届け先住所</label>
							<input id="prof-address" type="text" bind:value={editAddress} required />
						</div>

						<button type="submit" class="btn btn-primary save-btn">
							変更を保存する
						</button>
					</form>
				</div>
			{/if}

			<!-- Tab Content: Wishlist -->
			{#if activeTab === 'wishlist'}
				<div class="wishlist-section animate-fade-in">
					{#if wishlist.items.length === 0}
						<div class="empty-orders glass-card">
							<p class="empty-icon">🤍</p>
							<h3>お気に入りの商品はまだありません</h3>
							<p class="empty-desc">製品一覧でお気に入りのハートアイコンを押すと、ここに追加されます。</p>
							<a href="/" class="btn btn-primary">製品カタログを見る</a>
						</div>
					{:else}
						<div class="wishlist-grid">
							{#each wishlist.items as product (product.id)}
								<div class="wishlist-page-card glass-card">
									<img src={product.images[0]} alt={product.name} class="wl-img" />
									<div class="wl-content">
										<span class="wl-category">{product.category.toUpperCase()}</span>
										<h4 class="wl-title">{product.name}</h4>
										<span class="wl-price">¥{product.price.toLocaleString()}</span>
										<div class="wl-btn-row">
											<button
												type="button"
												class="btn btn-primary wl-add-btn"
												onclick={() => { cart.addItem(product); wishlist.remove(product.id); }}
											>
												カートへ移動
											</button>
											<button
												type="button"
												class="wl-del-btn"
												onclick={() => wishlist.remove(product.id)}
												aria-label="削除"
											>
												✕
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		{/if}
	</main>

	<Footer />
</div>

<style>
	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.mypage-main {
		flex: 1;
		padding-top: 2rem;
		padding-bottom: 5rem;
	}

	.top-nav-row {
		margin-bottom: 1.5rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--accent-secondary);
	}

	/* Guest Gate */
	.guest-gate {
		padding: 4rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1.25rem;
		max-width: 540px;
		margin: 2rem auto;
		border-radius: var(--radius-lg);
	}

	.gate-icon {
		font-size: 3.5rem;
	}

	.gate-title {
		font-size: 1.8rem;
		color: #ffffff;
	}

	.gate-desc {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.gate-actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}

	/* User Header */
	.user-header {
		padding: 2rem;
		border-radius: var(--radius-lg);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	.user-profile-left {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.user-avatar-large {
		width: 76px;
		height: 76px;
		border-radius: 50%;
		overflow: hidden;
		background: var(--bg-surface-elevated);
		border: 2px solid var(--accent-primary);
		box-shadow: 0 0 20px var(--accent-glow);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		flex-shrink: 0;
	}

	.avatar-large-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-profile-meta {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.rank-badge-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.rank-badge {
		font-size: 0.7rem;
		font-weight: 800;
		padding: 3px 8px;
		border-radius: var(--radius-full);
		letter-spacing: 0.08em;
	}

	.rank-gold {
		background: rgba(245, 158, 11, 0.2);
		color: #fbbf24;
		border: 1px solid rgba(245, 158, 11, 0.4);
	}

	.rank-standard {
		background: rgba(99, 102, 241, 0.2);
		color: #a5b4fc;
		border: 1px solid rgba(99, 102, 241, 0.4);
	}

	.member-since {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.user-greeting {
		font-size: 1.6rem;
		color: #ffffff;
	}

	.user-email-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	/* Stats Right */
	.user-stats-right {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		flex-wrap: wrap;
	}

	.stat-pill {
		display: flex;
		flex-direction: column;
		padding: 0.75rem 1.25rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.stat-pill-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.stat-pill-val {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 800;
		color: #ffffff;
	}

	.point-val {
		color: #fbbf24;
	}

	.stat-pill-sub {
		font-size: 0.65rem;
		color: var(--text-secondary);
	}

	.btn-logout {
		font-size: 0.8rem;
		color: var(--accent-sale);
		padding: 0.5rem 0.9rem;
		border: 1px solid rgba(244, 63, 94, 0.3);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.btn-logout:hover {
		background: rgba(244, 63, 94, 0.15);
	}

	/* Tabs */
	.mypage-tabs {
		display: flex;
		gap: 0.75rem;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--border-subtle);
		padding-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	.mypage-tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-secondary);
		border-radius: var(--radius-full);
		transition: all var(--transition-fast);
	}

	.mypage-tab-btn:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.06);
	}

	.mypage-tab-btn.active {
		color: #ffffff;
		background: var(--accent-gradient);
		box-shadow: 0 4px 12px var(--accent-glow);
	}

	.tab-count {
		font-size: 0.75rem;
		padding: 2px 6px;
		border-radius: var(--radius-full);
		background: rgba(0, 0, 0, 0.3);
	}

	/* Orders List */
	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.order-card {
		padding: 1.5rem;
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.order-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-subtle);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.order-head-col {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.head-label {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.head-val {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.order-num-tag {
		font-family: monospace;
		color: var(--accent-secondary);
	}

	.total-price {
		color: #ffffff;
		font-family: var(--font-heading);
	}

	.status-badge {
		font-size: 0.8rem;
		font-weight: 700;
		padding: 4px 12px;
		border-radius: var(--radius-full);
	}

	.status-delivered {
		background: rgba(16, 185, 129, 0.15);
		color: #34d399;
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.status-shipped {
		background: rgba(6, 182, 212, 0.15);
		color: #38bdf8;
		border: 1px solid rgba(6, 182, 212, 0.3);
	}

	.status-processing {
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.order-items-grid {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.order-item-row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.order-item-thumb {
		width: 60px;
		height: 60px;
		border-radius: var(--radius-sm);
		object-fit: cover;
		background: #0b0f19;
		flex-shrink: 0;
	}

	.order-item-details {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		flex: 1;
	}

	.order-item-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.order-item-color {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.order-item-price {
		font-size: 0.9rem;
		font-weight: 700;
		color: #ffffff;
	}

	.order-card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid var(--border-subtle);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.shipping-address-snippet {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	.reorder-btn {
		font-size: 0.85rem;
		padding: 0.5rem 1rem;
	}

	/* Profile Section */
	.profile-section {
		padding: 2rem;
		border-radius: var(--radius-lg);
		max-width: 680px;
	}

	.section-title-box {
		margin-bottom: 1.5rem;
	}

	.section-title-box h3 {
		font-size: 1.3rem;
		color: #ffffff;
		margin-bottom: 0.25rem;
	}

	.section-subtitle {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.profile-edit-form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
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

	.form-group input {
		padding: 0.65rem 0.85rem;
		font-size: 0.9rem;
	}

	.save-btn {
		margin-top: 0.5rem;
		padding: 0.75rem;
		max-width: 220px;
	}

	/* Wishlist */
	.wishlist-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1.5rem;
	}

	.wishlist-page-card {
		padding: 1rem;
		border-radius: var(--radius-md);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.wl-img {
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-sm);
		background: #0b0f19;
	}

	.wl-content {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.wl-category {
		font-size: 0.7rem;
		color: var(--accent-secondary);
		font-weight: 700;
	}

	.wl-title {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.wl-price {
		font-size: 1rem;
		font-weight: 700;
		color: #ffffff;
	}

	.wl-btn-row {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.wl-add-btn {
		flex: 1;
		font-size: 0.8rem;
		padding: 0.5rem;
	}

	.wl-del-btn {
		width: 34px;
		height: 34px;
		border-radius: var(--radius-sm);
		background: rgba(255, 255, 255, 0.08);
		color: var(--text-muted);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
	}

	.wl-del-btn:hover {
		color: var(--accent-sale);
		background: rgba(244, 63, 94, 0.15);
	}

	.empty-orders {
		padding: 3rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		border-radius: var(--radius-md);
	}

	.empty-icon {
		font-size: 3rem;
	}

	.empty-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 0.75rem;
	}

	@media (max-width: 768px) {
		.user-header {
			flex-direction: column;
			align-items: flex-start;
		}
		.form-grid-2 {
			grid-template-columns: 1fr;
		}
	}
</style>
