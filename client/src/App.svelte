<script lang="ts">
  import { Router } from 'svelte-navigator';
  import Routes from './routing/Routes.svelte';
  import NavBar2 from './components/NavBar.svelte';
  import Footer from './components/Footer.svelte';
  import { onMount } from 'svelte';
  import { getUserData } from './stores/user';
  import { loadImages } from './stores/images';
  import { Modals, closeModal } from 'svelte-modals';

  onMount(async () => {
    const userCode = window.localStorage.getItem('userCode');
    !!userCode && getUserData(userCode);
    loadImages();
  });
</script>

<Router>
  <NavBar2 />
  <Routes />
  <Footer />
  <Modals>
    <div slot="backdrop" class="backdrop" on:click={closeModal} />
  </Modals>
</Router>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;
  }
</style>
