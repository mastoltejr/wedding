<script lang="ts">
  export let src;
  export let alt;
  export let index;
  import { onMount } from 'svelte';
  import { openModal } from 'svelte-modals';
  import ImageModal from './ImageModal.svelte';
  import { imageGallery } from '../../stores/images';
  import type { IData } from '../../stores/images';

  let loaded = false;
  let thisImage;
  let image: IData | null = null;

  const openImage = () => {
    $imageGallery.index = index;
    openModal(ImageModal);
  };

  onMount(() => {
    image = $imageGallery.images[index];
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<div id="wrapper" class="lazy-img">
  <img
    {src}
    {alt}
    class:loaded
    bind:this={thisImage}
    on:click={openImage}
    loading="lazy"
  />
  <div id="cover">
    <div>
      {image?.date ?? ''}<br /><br />
      {@html image?.description ?? ''}
    </div>
  </div>
</div>

<style>
  #wrapper {
    position: relative;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 1200ms ease-out;

    object-fit: cover;
  }
  img.loaded {
    opacity: 1;
  }

  #cover {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    top: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  #cover > div {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    top: auto;
  }

  #wrapper:hover #cover {
    top: 0%;
  }
</style>
