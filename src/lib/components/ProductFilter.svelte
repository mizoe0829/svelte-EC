<script lang="ts">
	import { CATEGORIES } from '$lib/data/products';
	import type { ProductCategory, SortOption } from '$lib/types';

	let {
		category = $bindable('all' as ProductCategory),
		sortBy = $bindable('popular' as SortOption),
		maxPrice = $bindable(60000),
		inStockOnly = $bindable(false),
		itemCount = 0
	} = $props<{
		category?: ProductCategory;
		sortBy?: SortOption;
		maxPrice?: number;
		inStockOnly?: boolean;
		itemCount?: number;
	}>();

	let isFilterExpanded = $state(false);
</script>

<div class="filter-wrapper glass-card">
	<!-- Top Bar: Category Pills + Sort -->
	<div class="filter-top-bar">
		<div class="category-tabs">
			{#each CATEGORIES as cat}
				<button
					type="button"
					class="category-tab-btn"
					class:active={category === cat.id}
					onclick={() => (category = cat.id as ProductCategory)}
				>
					<span class="tab-icon">{cat.icon}</span>
					<span class="tab-label">{cat.label}</span>
				</button>
			{/each}
		</div>

		<div class="filter-right-controls">
			<!-- Sort Dropdown -->
			<div class="sort-select-wrapper">
				<label for="sort-select" class="sort-label">並び替え:</label>
				<select id="sort-select" bind:value={sortBy} class="sort-select">
					<option value="popular">おすすめ人気順</option>
					<option value="price-asc">価格の安い順</option>
					<option value="price-desc">価格の高い順</option>
					<option value="rating">カスタマー評価順</option>
				</select>
			</div>

			<!-- Toggle Advanced Filter Button -->
			<button
				type="button"
				class="filter-toggle-btn"
				class:active={isFilterExpanded}
				onclick={() => (isFilterExpanded = !isFilterExpanded)}
				aria-label="詳細フィルター"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
				</svg>
				<span>絞り込み</span>
			</button>
		</div>
	</div>

	<!-- Collapsible Filter Panel (Price Slider & In Stock) -->
	{#if isFilterExpanded}
		<div class="filter-panel animate-slide-down">
			<div class="filter-group">
				<div class="filter-group-header">
					<span class="filter-title">予算上限（価格）</span>
					<span class="price-value">〜 ¥{maxPrice.toLocaleString()}</span>
				</div>
				<input
					type="range"
					min="5000"
					max="60000"
					step="1000"
					bind:value={maxPrice}
					class="price-slider"
				/>
				<div class="slider-marks">
					<span>¥5,000</span>
					<span>¥30,000</span>
					<span>¥60,000</span>
				</div>
			</div>

			<div class="filter-group toggle-group">
				<label class="toggle-label">
					<input type="checkbox" bind:checked={inStockOnly} class="toggle-checkbox" />
					<span class="toggle-switch"></span>
					<span class="toggle-text">即日発送可能（在庫あり）のみ表示</span>
				</label>
			</div>

			<div class="filter-summary">
				<span>該当商品: <strong>{itemCount}</strong> 件</span>
				{#if maxPrice < 60000 || inStockOnly}
					<button
						type="button"
						class="reset-btn"
						onclick={() => {
							maxPrice = 60000;
							inStockOnly = false;
						}}
					>
						条件をリセット
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.filter-wrapper {
		margin-bottom: 2rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-md);
	}

	.filter-top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.category-tabs {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.category-tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-full);
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-secondary);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border-subtle);
		transition: all var(--transition-fast);
	}

	.category-tab-btn:hover {
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.08);
	}

	.category-tab-btn.active {
		color: #ffffff;
		background: var(--accent-gradient);
		border-color: transparent;
		box-shadow: 0 4px 12px var(--accent-glow);
	}

	.filter-right-controls {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-left: auto;
	}

	.sort-select-wrapper {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-label {
		font-size: 0.8rem;
		color: var(--text-secondary);
		white-space: nowrap;
	}

	.sort-select {
		padding: 0.45rem 0.75rem;
		font-size: 0.85rem;
		border-radius: var(--radius-sm);
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		color: var(--text-primary);
	}

	.filter-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 0.85rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-secondary);
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		transition: all var(--transition-fast);
	}

	.filter-toggle-btn:hover,
	.filter-toggle-btn.active {
		color: var(--text-primary);
		border-color: var(--border-highlight);
		background: rgba(99, 102, 241, 0.15);
	}

	/* Panel */
	.filter-panel {
		margin-top: 1.25rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--border-subtle);
		display: grid;
		grid-template-columns: 1.5fr 1fr auto;
		gap: 2rem;
		align-items: center;
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.filter-group-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.85rem;
	}

	.filter-title {
		color: var(--text-secondary);
	}

	.price-value {
		font-weight: 700;
		color: var(--accent-secondary);
	}

	.price-slider {
		width: 100%;
		accent-color: var(--accent-primary);
		cursor: pointer;
	}

	.slider-marks {
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		cursor: pointer;
		user-select: none;
	}

	.toggle-checkbox {
		display: none;
	}

	.toggle-switch {
		width: 38px;
		height: 22px;
		border-radius: 11px;
		background: var(--bg-surface-elevated);
		border: 1px solid var(--border-subtle);
		position: relative;
		transition: all var(--transition-fast);
		flex-shrink: 0;
	}

	.toggle-switch::after {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--text-secondary);
		transition: transform var(--transition-fast);
	}

	.toggle-checkbox:checked + .toggle-switch {
		background: var(--accent-primary);
		border-color: var(--accent-primary);
	}

	.toggle-checkbox:checked + .toggle-switch::after {
		transform: translateX(16px);
		background: #ffffff;
	}

	.toggle-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.filter-summary {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
		text-align: right;
	}

	.reset-btn {
		font-size: 0.8rem;
		color: var(--accent-sale);
		text-decoration: underline;
		cursor: pointer;
	}

	@media (max-width: 860px) {
		.filter-panel {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.filter-summary {
			text-align: left;
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
