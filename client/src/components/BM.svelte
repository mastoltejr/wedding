<script lang="ts">
  import Title from './Title.svelte';
  import { onMount } from 'svelte';
  let width;
  onMount(() => {
    width = document.getElementById('b').offsetWidth;
  });
</script>

<div class="block">
  <div class="content">
    <div class="square" id="b" style="font-size: {width * 0.8}px">B</div>
    <div class="square" id="m" style="font-size: {width * 0.8}px">M</div>
  </div>
</div>

<style>
  .block {
    position: relative;
    width: 100%;
    max-width: 14rem;
    margin: var(--spacing-6) auto var(--spacing-2) auto;
  }

  .block:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  .content {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    width: 100%;
    height: 100%;
  }

  .square {
    display: grid;
    place-content: center;
  }

  #b {
    grid-column: 1 / 7;
    grid-row: 1 / 7;
    background-color: var(--color-primary);
    color: var(--color-paper);
  }

  #m {
    grid-column: 5 / 11;
    grid-row: 5 / 11;
    background-color: var(--color-paper);
    color: var(--color-primary);
  }
</style>
