<script lang="ts">
  import { closeModal } from 'svelte-modals';
  import { imageGallery } from '../../stores/images';
  import type { IData } from '../../stores/images';
  import Image from './Image.svelte';
  // provided by Modals
  export let isOpen;

  let image: IData | undefined = undefined;

  document.onkeydown = function (e) {
    // console.log(e.code);
    if (e.code === 'ArrowRight') {
      move(1)();
    } else if (e.code === 'ArrowLeft') {
      move(-1)();
    }
  };

  const move = (i: number) => () => {
    $imageGallery.index =
      $imageGallery.index === 1
        ? $imageGallery.images.length - 1
        : ($imageGallery.index + i) % $imageGallery.images.length;
  };

  $: {
    image = $imageGallery.images[$imageGallery.index ?? 0];
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <img
      src="/images/arrow.png"
      alt="<<"
      id="arrow-left"
      class="arrow"
      on:click={move(-1)}
    />
    {#if !!image}
      <img
        src={import.meta.env.VITE_CMS_URL + image.full}
        alt={image.name}
        on:click={closeModal}
      />
    {:else}
      <div>{$imageGallery.status} {$imageGallery.index}</div>
    {/if}
    <img
      src="/images/arrow.png"
      alt=">>"
      id="arrow-right"
      class="arrow"
      on:click={move(1)}
    />
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
    z-index: 100;
  }

  img {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 6px;
    pointer-events: none;
  }

  .arrow {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: 35px;
    height: 35px;
    border-style: solid;
    border: 2px solid black;
    padding: 2px;
    background-color: var(--color-paper);
    z-index: 2000;
    pointer-events: all;
  }

  #arrow-left {
    left: 10px;
    transform: rotateY(180deg);
  }

  #arrow-right {
    right: 10px;
  }
</style>
