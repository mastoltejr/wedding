<script>
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
  {#each items as item}
    <li class={activeTabValue === item.value ? 'active' : ''}>
      <span on:click={handleClick(item.value)}>{item.label}</span>
    </li>
  {/each}
</ul>
{#each items as item}
  {#if activeTabValue == item.value}
    <div class="box">
      <svelte:component this={item.component} />
    </div>
  {/if}
{/each}

<style>
  .box {
    margin-bottom: 10px;
    padding: 40px;
    border: 1px solid #dee2e6;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: var(--spacing-1);
    grid-auto-rows: 80px;
  }
  li {
    text-align: center;
    text-transform: uppercase;
    text-overflow: wrap;
    color: var(--color-tertiary);
    border: 1px solid var(--color-paper);
    padding: var(--spacing-1);
    display: grid;
    place-content: center;
    color: var(--color-primary);
    font-weight: 500;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    background-color: var(--color-paper);
    border-bottom: 3px solid var(--color-primary);
  }

  @media only screen and (min-width: 700px) {
    /* .grid {
      grid-template-columns: 1fr 1fr;
    } */
  }
</style>
