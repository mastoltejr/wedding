<script lang="ts">
  import axios from 'axios';
  import { onMount } from 'svelte';
  import type { StrapiGallery, ImageData, StrapiGalleryItem } from './types';
  import Title from '../Title.svelte';
  import Image from './Image.svelte';
  import { imageGallery } from '../../stores/images';

  let clientWidth;

  const sizes: Array<keyof ImageData['formats']> = [
    'thumbnail',
    'small',
    'medium',
    'large'
  ];
</script>

<section>
  <Title color="var(--color-paper)" accentColor="var(--color-paper)"
    ><h1 id="gallery" style:padding-bottom="var(--spacing-4)">
      Gallery
    </h1></Title
  >
  {#if $imageGallery.status === 'loading'}
    loading...
  {:else if $imageGallery.status === 'error'}
    error loading gallery...
  {/if}
  <div class="grid-wrapper" bind:clientWidth>
    {#each $imageGallery.images as image}
      <!-- {@const cls =
        image.height > image.width
          ? ['', 'tall'][Math.floor(Math.random() * 3)]
          : ['', 'wide', '', 'big'][Math.floor(Math.random() * 4)]} -->
      {@const size =
        sizes.find(
          (s) =>
            image[s]?.width >=
            Math.min(
              clientWidth,
              250 * (image.class === 'wide' || image.class === 'big' ? 2 : 1)
            )
        ) ?? 'medium'}
      <div class={image.class}>
        <Image
          src={import.meta.env.VITE_CMS_URL +
            (image['large']?.url ?? image.full)}
          alt={image.name}
          index={image.index}
        />
      </div>
    {/each}
  </div>
</section>

<style>
  section {
    background-color: var(--color-tertiary);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .grid-wrapper > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
    grid-gap: var(--spacing-2);
    grid-auto-flow: dense;
  }

  .grid-wrapper .tall,
  .grid-wrapper .big {
    grid-row: span 2;
  }

  @media (min-width: 740px) {
    .grid-wrapper {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .grid-wrapper .wide,
    .grid-wrapper .big {
      grid-column: span 2;
    }
  }
</style>
