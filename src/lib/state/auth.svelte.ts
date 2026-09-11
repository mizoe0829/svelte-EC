import type { UserProfile } from '../types';
import { toast } from './toast.svelte';

const DEMO_USER: UserProfile = {
	id: 'usr-lumen-01',
	fullName: '田中 蒼太',
	email: 'sota.tanaka@lumen-studio.jp',
	postalCode: '150-0001',
	address: '東京都渋谷区神宮前4-12-10 LUMEN表参道 502',
	phone: '090-1234-5678',
	memberRank: 'Gold',
	points: 3450,
	memberSince: '2025年11月',
	avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

class AuthState {
	user = $state<UserProfile | null>(null);
	isModalOpen = $state<boolean>(false);
	modalTab = $state<'login' | 'register'>('login');

	constructor() {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('lumen_user');
			if (saved) {
				try {
					this.user = JSON.parse(saved);
				} catch {
					// fallback
				}
			}
		}
	}

	get isAuthenticated(): boolean {
		return this.user !== null;
	}

	private save() {
		if (typeof window !== 'undefined') {
			if (this.user) {
				localStorage.setItem('lumen_user', JSON.stringify(this.user));
			} else {
				localStorage.removeItem('lumen_user');
			}
		}
	}

	login(email: string, _password: string): boolean {
		if (!email.includes('@')) {
			toast.show('有効なメールアドレスを入力してください', '', 'warning');
			return false;
		}

		// Mock login success
		this.user = {
			...DEMO_USER,
			email
		};
		this.save();
		this.isModalOpen = false;
		toast.show('ログインしました', `ようこそ、${this.user.fullName} 様`, 'success');
		return true;
	}

	loginAsDemo() {
		this.user = { ...DEMO_USER };
		this.save();
		this.isModalOpen = false;
		toast.show('デモアカウントでログインしました', `ゴールド会員: ${this.user.fullName} 様`, 'success');
	}

	register(data: {
		fullName: string;
		email: string;
		postalCode: string;
		address: string;
	}): boolean {
		this.user = {
			id: 'usr-' + Math.random().toString(36).substring(2, 9),
			fullName: data.fullName,
			email: data.email,
			postalCode: data.postalCode,
			address: data.address,
			memberRank: 'Standard',
			points: 500, // 新規入会ポイント
			memberSince: '2026年9月'
		};
		this.save();
		this.isModalOpen = false;
		toast.show('会員登録が完了しました！', '新規入会特典: 500ポイントプレゼント', 'success');
		return true;
	}

	updateProfile(data: Partial<UserProfile>) {
		if (!this.user) return;
		this.user = {
			...this.user,
			...data
		};
		this.save();
		toast.show('プロフィールを更新しました', '', 'success');
	}

	logout() {
		this.user = null;
		this.save();
		toast.show('ログアウトしました', '', 'info');
	}

	openModal(tab: 'login' | 'register' = 'login') {
		this.modalTab = tab;
		this.isModalOpen = true;
	}

	closeModal() {
		this.isModalOpen = false;
	}
}

export const auth = new AuthState();
