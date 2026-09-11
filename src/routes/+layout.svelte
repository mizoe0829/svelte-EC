<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import WishlistDrawer from '$lib/components/WishlistDrawer.svelte';
	import CheckoutModal from '$lib/components/CheckoutModal.svelte';
	import AuthModal from '$lib/components/AuthModal.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<!-- Global Drawers & Modals -->
<CartDrawer />
<WishlistDrawer />
<CheckoutModal />
<AuthModal />
<ToastContainer />

