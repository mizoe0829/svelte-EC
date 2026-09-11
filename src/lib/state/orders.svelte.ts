import type { OrderRecord } from '../types';
import { PRODUCTS } from '../data/products';
import { cart } from './cart.svelte';
import { toast } from './toast.svelte';

const SAMPLE_ORDERS: OrderRecord[] = [
	{
		orderId: 'LMN-892144',
		date: '2026年9月4日',
		status: 'delivered',
		items: [
			{
				id: 'aurora-headphones-Matte Charcoal',
				product: PRODUCTS[0],
				quantity: 1,
				selectedColor: PRODUCTS[0].colors[0]
			}
		],
		subtotal: 38800,
		discount: 3880,
		shipping: 0,
		total: 34920,
		fullName: '田中 蒼太',
		email: 'sota.tanaka@lumen-studio.jp',
		postalCode: '150-0001',
		address: '東京都渋谷区神宮前4-12-10 LUMEN表参道 502',
		paymentMethod: 'credit'
	},
	{
		orderId: 'LMN-773821',
		date: '2026年9月9日',
		status: 'shipped',
		items: [
			{
				id: 'keyflow-keyboard-Dark Slate & Amber',
				product: PRODUCTS[2],
				quantity: 1,
				selectedColor: PRODUCTS[2].colors[0]
			},
			{
				id: 'soundsphere-speaker-Graphite Mesh',
				product: PRODUCTS[4],
				quantity: 1,
				selectedColor: PRODUCTS[4].colors[0]
			}
		],
		subtotal: 54600,
		discount: 0,
		shipping: 0,
		total: 54600,
		fullName: '田中 蒼太',
		email: 'sota.tanaka@lumen-studio.jp',
		postalCode: '150-0001',
		address: '東京都渋谷区神宮前4-12-10 LUMEN表参道 502',
		paymentMethod: 'apple-pay'
	}
];

class OrdersState {
	orders = $state<OrderRecord[]>([]);

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('lumen_orders');
			if (saved) {
				try {
					this.orders = JSON.parse(saved);
				} catch {
					this.orders = [...SAMPLE_ORDERS];
				}
			} else {
				this.orders = [...SAMPLE_ORDERS];
			}
		} else {
			this.orders = [...SAMPLE_ORDERS];
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('lumen_orders', JSON.stringify(this.orders));
		}
	}

	addOrder(order: OrderRecord) {
		this.orders = [order, ...this.orders];
		this.save();
	}

	reorder(order: OrderRecord) {
		for (const item of order.items) {
			cart.addItem(item.product, item.selectedColor, item.quantity);
		}
		cart.open();
		toast.show('再注文アイテムをカートに追加しました', `${order.items.length} 点の商品`, 'success');
	}
}

export const orders = new OrdersState();
