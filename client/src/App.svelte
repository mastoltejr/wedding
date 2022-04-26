<script lang="ts">
  import { Router } from 'svelte-navigator';
  import Routes from './routing/Routes.svelte';
  import NavBar from './components/NavBar.svelte';
  import Footer from './components/Footer.svelte';
  import { user } from './stores/user';
  import { onMount } from 'svelte';
  import { getUserData } from './queries';

  onMount(async () => {
    const userCode = window.localStorage.getItem('userCode');
    if (userCode !== null) {
      const data = await getUserData(userCode);
      console.log(data);
      $user = data;
    } else {
      console.log('userCode is null');
    }
  });
</script>

<Router>
  <NavBar />
  <Routes />
  <Footer />
</Router>
