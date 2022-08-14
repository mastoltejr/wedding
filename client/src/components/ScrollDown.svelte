<script>
  export let color = 'var(--color-paper)';
  export let block = false;
  let scrollY;
</script>

<svelte:window bind:scrollY />
<div class="scroll-down" class:hide={scrollY >= 30}>
  <div class="scroll-down-text" style:color class:block>SCROLL DOWN</div>
  <div class="scroll-down-bar" style:background={color} />
</div>

<style>
  .scroll-down {
    bottom: 0;
    height: 100px;
    left: 0;
    position: absolute;
    right: 0;
    text-align: center;
    z-index: 1;
  }

  .hide {
    display: none;
  }

  .scroll-down-text {
    font-size: var(--typography-6);
    font-weight: bold;
  }

  .block {
    display: table;
    margin: auto;
    border-radius: 8px;
    border: 1px solid var(--color-tertiary);
    background-color: var(--color-paper);
    padding: var(--spacing-1) var(--spacing-2);
  }
  .scroll-down-bar {
    animation: elasticus 1.4s cubic-bezier(1, 0, 0, 1) infinite;
    bottom: 0;
    display: inline-block;
    height: 65px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    width: 2px;
  }
  @-moz-keyframes elasticus {
    0% {
      transform: scale(1, 0);
      transform-origin: 0% 0%;
    }
    50% {
      transform: scale(1, 1);
      transform-origin: 0% 0%;
    }
    50.1% {
      transform: scale(1, 1);
      transform-origin: 0% 100%;
    }
    100% {
      transform: scale(1, 0);
      transform-origin: 0% 100%;
    }
  }
  @-webkit-keyframes elasticus {
    0% {
      transform: scale(1, 0);
      transform-origin: 0% 0%;
    }
    50% {
      transform: scale(1, 1);
      transform-origin: 0% 0%;
    }
    50.1% {
      transform: scale(1, 1);
      transform-origin: 0% 100%;
    }
    100% {
      transform: scale(1, 0);
      transform-origin: 0% 100%;
    }
  }
  @-o-keyframes elasticus {
    0% {
      transform: scale(1, 0);
      transform-origin: 0% 0%;
    }
    50% {
      transform: scale(1, 1);
      transform-origin: 0% 0%;
    }
    50.1% {
      transform: scale(1, 1);
      transform-origin: 0% 100%;
    }
    100% {
      transform: scale(1, 0);
      transform-origin: 0% 100%;
    }
  }
  @keyframes elasticus {
    0% {
      transform: scale(1, 0);
      transform-origin: 0% 0%;
    }
    50% {
      transform: scale(1, 1);
      transform-origin: 0% 0%;
    }
    50.1% {
      transform: scale(1, 1);
      transform-origin: 0% 100%;
    }
    100% {
      transform: scale(1, 0);
      transform-origin: 0% 100%;
    }
  }
</style>
