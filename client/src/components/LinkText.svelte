<script lang="ts">
  export let color = 'var(--color-primary)';
</script>

<span class="title" style="--color: {color}">
  <slot />
</span>

<style>
  .title {
    position: relative;
    display: inline-block;
    color: var(--color);
  }

  .title::before {
    content: '';
    position: absolute;
    bottom: -8px;
    height: 2px;
    background-color: var(--color);
    left: 0px;
    width: 0%;
    border-radius: 2.5px;
    transition: width 0.5s;
  }

  .title:hover::before {
    width: 100%;
  }

  .title::after {
    content: '';
    position: absolute;
    width: 24px;
    top: calc(50% - 4px);
    right: -19px;
    height: 10px;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 65% 100%, 90% 50%, 65% 0%);
    background-color: var(--color);
  }

  .title:hover::after {
    opacity: 1;
  }
</style>
