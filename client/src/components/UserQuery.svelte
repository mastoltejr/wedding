<script lang="ts">
  import AutoComplete from '../components/AutoComplete.svelte';
</script>

<div class="box userQuery">
  <div class="search">
    <AutoComplete />
  </div>
</div>

<style>
  .userQuery {
    padding-top: 6rem;
    height: calc(100vh - 64px - 215px);
  }

  .search {
    position: relative;
    width: 300px;
    margin: auto;
  }
</style>
