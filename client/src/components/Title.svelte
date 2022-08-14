<script lang="ts">
  import { onMount } from 'svelte';
  import { nanoid } from 'nanoid';
  let intersect = false;
  export let color = 'var(--color-primary)';
  export let accentColor = color;
  let titleID = `title-${nanoid(6)}`;

  onMount(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries.length === 0) return;
      const { isIntersecting } = entries[0];
      intersect = isIntersecting;
    };

    let observer = new IntersectionObserver(callback, {
      rootMargin: '-15% 0% -20% 0%',
      threshold: 0.9
    });

    observer.observe(document.querySelector('#' + titleID));
  });
</script>

<div
  id={titleID}
  class="title"
  class:intersect
  style="--color: {color}; --accent-color: {accentColor}"
>
  <slot />
</div>

<style>
  .title {
    position: relative;
    display: inline-block;
    color: var(--color);
    text-transform: uppercase;
  }

  .title::before {
    content: '';
    position: absolute;
    top: -8px;
    height: 5px;
    background-color: var(--accent-color);
    left: 0px;
    width: 20%;
    border-radius: 2.5px;
    transition: width 0.5s;
  }

  .title:hover::before,
  .title.intersect::before {
    width: 60%;
  }

  .title :global(*) {
    margin: 0.5rem !important;
    font-weight: 400 !important;
  }
</style>
