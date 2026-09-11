import type { CartItem, Product, ProductColor } from '../types';
import { DISCOUNT_CODES, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../data/products';
import { toast } from './toast.svelte';

class CartState {
	items = $state<CartItem[]>([]);
	isOpen = $state<boolean>(false);
	couponCode = $state<string>('');
	discountRate = $state<number>(0);
	couponLabel = $state<string>('');
	couponError = $state<string>('');
	isCheckingOut = $state<boolean>(false);

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('lumen_cart');
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
			localStorage.setItem('lumen_cart', JSON.stringify(this.items));
		}
	}

	get itemCount(): number {
		return this.items.reduce((sum, item) => sum + item.quantity, 0);
	}

	get subtotal(): number {
		return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
	}

	get discountAmount(): number {
		if (this.discountRate <= 0) return 0;
		return Math.round(this.subtotal * this.discountRate);
	}

	get isFreeShipping(): boolean {
		return this.subtotal >= FREE_SHIPPING_THRESHOLD;
	}

	get freeShippingRemaining(): number {
		return Math.max(0, FREE_SHIPPING_THRESHOLD - this.subtotal);
	}

	get freeShippingProgress(): number {
		if (this.subtotal <= 0) return 0;
		return Math.min(100, Math.round((this.subtotal / FREE_SHIPPING_THRESHOLD) * 100));
	}

	get shippingFee(): number {
		if (this.items.length === 0) return 0;
		return this.isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
	}

	get total(): number {
		return Math.max(0, this.subtotal - this.discountAmount + this.shippingFee);
	}

	addItem(product: Product, color?: ProductColor, quantity = 1) {
		const selectedColor = color || product.colors[0];
		const cartItemId = `${product.id}-${selectedColor.name}`;

		const existing = this.items.find((item) => item.id === cartItemId);
		if (existing) {
			existing.quantity += quantity;
		} else {
			this.items = [
				...this.items,
				{
					id: cartItemId,
					product,
					quantity,
					selectedColor
				}
			];
		}
		this.save();
		toast.show('カートに追加しました', `${product.name} (${selectedColor.name}) × ${quantity}`, 'success');
	}

	updateQuantity(id: string, newQuantity: number) {
		if (newQuantity <= 0) {
			this.removeItem(id);
			return;
		}
		const item = this.items.find((i) => i.id === id);
		if (item) {
			item.quantity = newQuantity;
			this.save();
		}
	}

	removeItem(id: string) {
		const item = this.items.find((i) => i.id === id);
		this.items = this.items.filter((i) => i.id !== id);
		this.save();
		if (item) {
			toast.show('商品を削除しました', item.product.name, 'info');
		}
	}

	clear() {
		this.items = [];
		this.couponCode = '';
		this.discountRate = 0;
		this.couponLabel = '';
		this.couponError = '';
		this.save();
	}

	applyCoupon(code: string): boolean {
		const trimmed = code.trim().toUpperCase();
		this.couponError = '';
		
		if (!trimmed) {
			this.couponError = 'クーポンコードを入力してください';
			return false;
		}

		const coupon = DISCOUNT_CODES[trimmed];
		if (coupon) {
			this.couponCode = trimmed;
			this.discountRate = coupon.rate;
			this.couponLabel = coupon.label;
			toast.show('クーポンを適用しました！', `${coupon.label}`, 'success');
			return true;
		} else {
			this.couponError = '無効なクーポンコードです (有効例: LUMEN10)';
			return false;
		}
	}

	removeCoupon() {
		this.couponCode = '';
		this.discountRate = 0;
		this.couponLabel = '';
		this.couponError = '';
		toast.show('クーポンを解除しました', '', 'info');
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

	startCheckout() {
		if (this.items.length === 0) return;
		this.isOpen = false;
		this.isCheckingOut = true;
	}

	closeCheckout() {
		this.isCheckingOut = false;
	}
}

export const cart = new CartState();
