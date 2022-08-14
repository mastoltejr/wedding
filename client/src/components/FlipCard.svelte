<script type="ts">
  export let manualFlip = false;
  export let backColor = 'var(--color-secondary)';
  export let backForeground = 'var(--color-paper)';

  const toggleFlip = () => {
    manualFlip = !manualFlip;
  };
</script>

<div class="flip-card" class:manualFlip tabIndex="0" on:click={toggleFlip}>
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <slot name="front" />
    </div>
    <div
      class="flip-card-back"
      style:background={backColor}
      style:color={backForeground}
    >
      <slot name="back" />
    </div>
  </div>
</div>

<style>
  .flip-card {
    /* aspect-ratio: 1;
    margin: auto 0px; */
    background-color: transparent;
    perspective: 1000px;
    width: 100%;
    height: 100%;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .flip-card:focus {
    outline: 0;
  }

  @media (hover: hover) {
    .flip-card:hover .flip-card-inner,
    .flip-card:focus .flip-card-inner {
      transform: rotateY(180deg);
    }
  }

  /* @media (hover: none) { */
  .flip-card.manualFlip > .flip-card-inner {
    transform: rotateY(180deg);
  }
  /* } */

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-front {
    z-index: 2;
  }

  .flip-card-back {
    transform: rotateY(180deg);
    z-index: 1;
  }
</style>
