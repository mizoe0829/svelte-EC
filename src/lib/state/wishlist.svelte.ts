import type { Product } from '../types';
import { toast } from './toast.svelte';

class WishlistState {
	items = $state<Product[]>([]);
	isOpen = $state<boolean>(false);

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('lumen_wishlist');
			if (saved) {
				try {
					this.items = JSON.parse(saved);
				} catch {
					// fallback
				}
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('lumen_wishlist', JSON.stringify(this.items));
		}
	}

	has(productId: string): boolean {
		return this.items.some((item) => item.id === productId);
	}

	toggle(product: Product) {
		if (this.has(product.id)) {
			this.items = this.items.filter((item) => item.id !== product.id);
			toast.show('お気に入りから削除しました', product.name, 'info');
		} else {
			this.items = [...this.items, product];
			toast.show('お気に入りに追加しました', product.name, 'success');
		}
		this.save();
	}

	remove(productId: string) {
		this.items = this.items.filter((item) => item.id !== productId);
		this.save();
	}

	clear() {
		this.items = [];
		this.save();
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}
}

export const wishlist = new WishlistState();
