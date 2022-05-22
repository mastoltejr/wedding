<script lang="ts">
  import AutoComplete from '../components/AutoComplete.svelte';
  export let path: string;
</script>

<div class="box userQuery">
  <div class="search">
    <h2
      style="text-align: center;text-transform: uppercase; font-weight: 400; color: white"
    >
      Search the guest list
    </h2>
    <AutoComplete {path} />
  </div>
</div>

<style>
  .userQuery {
    padding-top: 15vh;
    height: calc(100vh - 64px - 215px);
    min-height: 55vh;
  }

  .search {
    position: relative;
    width: 300px;
    margin: auto;
  }

  .box {
    background-image: url('/images/blobs.svg');
    background-size: cover;
    background-position: center;
  }
</style>
