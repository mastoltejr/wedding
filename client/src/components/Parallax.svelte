<script>
  export let src;
  export let height = '100vh';
  export let backgroundPosition = 'center';
</script>

<div
  class="parallax__image"
  id="hero"
  style:background-image={`url(${src})`}
  style:background-position={backgroundPosition}
  style={`--paralaxHeight: ${height}`}
>
  <div>
    <slot />
  </div>
</div>

<style>
  #hero > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  #hero {
    cursor: pointer;
    min-height: var(--paralaxHeight);
  }

  @media only screen and (max-width: 700px) {
    #hero {
      min-height: calc(0.66 * var(--paralaxHeight));
    }
  }
</style>
