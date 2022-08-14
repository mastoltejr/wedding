<script type="ts">
  import LinkText from './LinkText.svelte';

  export let title = 'Homespun Kitchen and Bar';
  export let rating = 4.7;
  export let reviews = 613;
  export let cost = undefined;
  export let link = 'https://google.com';
  export let directions = 'https://google.com';
  export let foodType = 'American';

  let stars = Array.from({ length: 5 }, (_, i) =>
    rating >= i + 1 ? 1 : rating >= i + 0.5 ? 0.5 : 0
  );
</script>

<div class="container">
  <span class="title">{title}</span>

  <div>
    <span class="rating">{rating}</span>
    {#each stars as starClass}
      <span
        class="star {starClass == 1
          ? 'full'
          : starClass == 0.5
          ? 'half'
          : 'empty'}"
      />
    {/each}
    <span class="reviews">({reviews})</span>
    {#if !!cost}
      <span>·</span>
      <span>{cost}</span>
    {/if}
  </div>
  <div>{foodType}</div>
  <div class="linkContainer">
    <LinkText>
      <a href={link} target="_blank">Website</a>
    </LinkText>
    <LinkText>
      <a href={directions} target="_blank">Directions</a>
    </LinkText>
  </div>
</div>

<style>
  .container {
    color: #70757a;
    font-family: Roboto, Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.25rem;
    padding: var(--spacing-2);
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: var(--color-paper);
  }

  .container:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .title {
    line-height: 20px;
    color: #202124;
    white-space: normal;
    text-align: left;
    margin-bottom: 2px;
  }

  .rating {
    margin-right: 4px;
  }

  .star {
    background-size: 14px 14px;
    background-image: url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png);
    height: 14px;
    width: 14px;
    vertical-align: top;
    margin-top: 3px;
    display: inline-block;
    -ms-high-contrast-adjust: none;
  }

  .empty {
    background-image: url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_empty_14.png);
  }

  .half {
    background-image: url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_half_14.png);
  }

  .reviews {
    padding-left: 4px;
  }

  .linkContainer {
    display: flex;
    gap: var(--spacing-4);
  }
</style>
