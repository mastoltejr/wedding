<script lang="ts">
  import { Router } from 'svelte-navigator';
  import Routes from './routing/Routes.svelte';
  import NavBar from './components/NavBar.svelte';
  import Footer from './components/Footer.svelte';
  import { user } from './stores/user';
  import { onMount } from 'svelte';
  import { getUserData } from './stores/user';

  onMount(async () => {
    const userCode = window.localStorage.getItem('userCode');
    !!userCode && getUserData(userCode);
  });
</script>

<Router>
  <NavBar />
  <Routes />
  <Footer />
</Router>
