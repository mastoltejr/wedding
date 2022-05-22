<script lang="ts">
  import { Route } from 'svelte-navigator';
  import Home from '../pages/Home.svelte';
  import ScrollToFragment from '../components/ScrollToFragment.svelte';
  import SaveTheDate from '../pages/SaveTheDate.svelte';
  import UserQuery from '../pages/UserQuery.svelte';
</script>

<main style="padding-top: 64px">
  <ScrollToFragment>
    <Route path="/">
      <Home />
    </Route>

    <Route path="registry">
      <h3>Registry</h3>
      <p>That's what it's all about!</p>
    </Route>

    <Route path="saveTheDate">
      <UserQuery path="saveTheDate" />
    </Route>

    <Route path="saveTheDate/:groupCode" let:params>
      <SaveTheDate groupCode={params.groupCode} />
    </Route>

    <Route path="rsvp">
      <UserQuery path="rsvp" />
    </Route>

    <Route path="rsvp/:groupCode" let:params>
      <h3>RSVP: {params.groupCode}</h3>
    </Route>
  </ScrollToFragment>
</main>
