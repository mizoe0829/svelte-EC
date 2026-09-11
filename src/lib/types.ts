export type ProductCategory = 'all' | 'audio' | 'workspace' | 'wearables' | 'lifestyle';

export interface ProductColor {
	name: string;
	hex: string;
}

export interface Product {
	id: string;
	name: string;
	tagline: string;
	description: string;
	price: number;
	originalPrice?: number;
	category: Exclude<ProductCategory, 'all'>;
	badge?: 'NEW' | 'SALE' | 'BESTSELLER';
	rating: number;
	reviewCount: number;
	images: string[];
	colors: ProductColor[];
	inStock: boolean;
	features: string[];
	specs: Record<string, string>;
}

export interface CartItem {
	id: string; // unique cart item id: product.id + color
	product: Product;
	quantity: number;
	selectedColor: ProductColor;
}

export interface ToastMessage {
	id: string;
	type: 'success' | 'info' | 'warning';
	title: string;
	description?: string;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
	category: ProductCategory;
	searchQuery: string;
	sortBy: SortOption;
	maxPrice: number;
	inStockOnly: boolean;
}

export interface UserProfile {
	id: string;
	fullName: string;
	email: string;
	postalCode: string;
	address: string;
	phone?: string;
	memberRank: 'Standard' | 'Silver' | 'Gold' | 'Black VIP';
	points: number;
	memberSince: string;
	avatar?: string;
}

export interface OrderRecord {
	orderId: string;
	userId?: string;
	date: string;
	status: 'processing' | 'shipped' | 'delivered';
	items: CartItem[];
	subtotal: number;
	discount: number;
	shipping: number;
	total: number;
	fullName: string;
	email: string;
	postalCode: string;
	address: string;
	paymentMethod: 'credit' | 'apple-pay' | 'convenience';
}

export interface OrderDetails {
	orderId: string;
	fullName: string;
	email: string;
	address: string;
	postalCode: string;
	city: string;
	paymentMethod: 'credit' | 'apple-pay' | 'convenience';
	items: CartItem[];
	subtotal: number;
	discount: number;
	shipping: number;
	total: number;
	date: string;
}
