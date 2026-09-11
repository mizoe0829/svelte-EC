import type { ToastMessage } from '../types';

class ToastState {
	items = $state<ToastMessage[]>([]);

	show(title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') {
		const id = Math.random().toString(36).substring(2, 9);
		const toast: ToastMessage = { id, type, title, description };
		
		this.items = [...this.items, toast];

		setTimeout(() => {
			this.remove(id);
		}, 4000);
	}

	remove(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
	}
}

export const toast = new ToastState();
