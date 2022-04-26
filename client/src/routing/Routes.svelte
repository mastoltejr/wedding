<script lang="ts">
  import { Route } from 'svelte-navigator';
  import PrivateRoute from './PrivateRoute.svelte';

  import Login from '../pages/Login.svelte';
  import Home from '../pages/Home.svelte';
  import ScrollToFragment from '../components/ScrollToFragment.svelte';
  import SaveTheDate from '../pages/SaveTheDate.svelte';
  import UserQuery from '../components/UserQuery.svelte';
</script>

<main style="padding-top: 64px">
  <ScrollToFragment>
    <Route path="/">
      <Home />
    </Route>

    <Route path="login">
      <Login />
    </Route>

    <Route path="registry">
      <h3>Registry</h3>
      <p>That's what it's all about!</p>
    </Route>

    <Route path="saveTheDate">
      <UserQuery />
    </Route>
    <Route path="saveTheDate/:groupCode" let:params>
      <SaveTheDate groupCode={params.groupCode} />
    </Route>

    <PrivateRoute path="admin" let:location>
      <h1>Profile</h1>
    </PrivateRoute>
  </ScrollToFragment>
</main>
