<script lang="ts">
  export let images: string[] = [];
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
</script>

<Splide
  aria-label="My Favorite Images"
  options={{
    arrows: false,
    height: '80vh',
    type: 'loop',
    autoplay: true,
    speed: 1500,
    interval: 4000,
    pauseOnHover: false
  }}
>
  {#if images.length > 0}
    {#each images as image}
      <SplideSlide>
        <div
          class="background__image"
          style="background-image: url('{image}')"
        />
      </SplideSlide>
    {/each}
  {:else}
    <SplideSlide>No Images</SplideSlide>
  {/if}
</Splide>

<style>
  .background__image {
    position: relative;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
  }
</style>
