<span class="title">
  <slot />
</span>

<style>
  .title {
    position: relative;
    display: inline-block;
    color: var(--color-primary);
  }

  .title::before {
    content: '';
    position: absolute;
    bottom: -8px;
    height: 2px;
    background-color: var(--color-primary);
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
    opacity: 0;
    right: -8px;
    height: 10px;
    bottom: -12px;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 65% 100%, 90% 50%, 65% 0%);
    background-color: var(--color-primary);
    transition: opacity 0.5s;
  }

  .title:hover::after {
    opacity: 1;
  }
</style>
