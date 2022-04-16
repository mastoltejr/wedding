<script lang="ts">
  import { onMount } from 'svelte';
  let intersect = false;

  onMount(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries.length === 0) return;
      const { isIntersecting } = entries[0];
      intersect = isIntersecting;
      console.log(isIntersecting);
    };

    let observer = new IntersectionObserver(callback, {
      rootMargin: '-10% 0% -20% 0%',
      threshold: 0.9
    });

    observer.observe(document.querySelector('.title'));
  });
</script>

<div class="title" class:intersect>
  <slot />
</div>

<style>
  .title {
    position: relative;
    display: inline-block;
    color: var(--color-primary);
  }

  .title::before {
    content: '';
    position: absolute;
    top: -8px;
    height: 5px;
    background-color: var(--color-primary);
    left: 0px;
    width: 20%;
    border-radius: 2.5px;
    transition: width 0.5s;
  }

  .title:hover::before,
  .title.intersect::before {
    width: 60%;
  }
</style>
