<script lang="ts">
	import { toast } from '$lib/state/toast.svelte';
</script>

{#if toast.items.length > 0}
	<div class="toast-container" aria-live="polite">
		{#each toast.items as item (item.id)}
			<div class="toast-card toast-{item.type}">
				<div class="toast-icon">
					{#if item.type === 'success'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					{:else if item.type === 'warning'}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
					{:else}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="16" x2="12" y2="12"></line>
							<line x1="12" y1="8" x2="12.01" y2="8"></line>
						</svg>
					{/if}
				</div>
				<div class="toast-content">
					<p class="toast-title">{item.title}</p>
					{#if item.description}
						<p class="toast-desc">{item.description}</p>
					{/if}
				</div>
				<button class="toast-close" onclick={() => toast.remove(item.id)} aria-label="閉じる">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.toast-container {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 12px;
		pointer-events: none;
		max-width: 380px;
		width: calc(100% - 48px);
	}

	.toast-card {
		pointer-events: auto;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 14px 16px;
		border-radius: var(--radius-md);
		background: rgba(18, 24, 40, 0.95);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--border-medium);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);
		animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	@keyframes toastIn {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.toast-success {
		border-left: 4px solid var(--accent-success);
	}
	.toast-success .toast-icon {
		color: var(--accent-success);
	}

	.toast-info {
		border-left: 4px solid var(--accent-primary);
	}
	.toast-info .toast-icon {
		color: var(--accent-primary);
	}

	.toast-warning {
		border-left: 4px solid var(--accent-warning);
	}
	.toast-warning .toast-icon {
		color: var(--accent-warning);
	}

	.toast-icon {
		display: flex;
		align-items: center;
		margin-top: 2px;
		flex-shrink: 0;
	}

	.toast-content {
		flex: 1;
		min-width: 0;
	}

	.toast-title {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--text-primary);
		line-height: 1.3;
	}

	.toast-desc {
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-top: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.toast-close {
		color: var(--text-muted);
		padding: 4px;
		margin: -4px -4px 0 0;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s ease;
	}

	.toast-close:hover {
		color: var(--text-primary);
	}
</style>
