<script lang="ts">
  import FlipCard from '../FlipCard.svelte';
  import Title from '../Title.svelte';

  let manualFlip = false;

  const toggleFlip = () => {
    manualFlip = !manualFlip;
  };
</script>

<section>
  <div class="container">
    <div class="tall">
      <h5 style="color: var(--color-tertiary)">About our relationship</h5>
      <Title><h1>Fun Facts</h1></Title>
      <p class="text">A quick little quiz about the happy couple</p>
      <button id="hoverAnswers">Hover for Answers</button>
      <button id="clickAnswers" on:click={toggleFlip}
        >Click {#if manualFlip} to hide {:else} for {/if}Answers</button
      >
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/palmTree.svg" alt="palm tree" />
          <p class="text">Where did we get engaged ?</p>
        </div>
        <div class="back" slot="back">
          <h3 class="nm">South Padre Island, TX</h3>
        </div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/pasta.svg" alt="pasta" />
          <p class="text">What's our favorite date night meal ?</p>
        </div>
        <div class="back" slot="back"><h3 class="nm">SUSHI</h3></div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/atm.svg" alt="atm" />
          <p class="text">Where did we first meet ?</p>
        </div>
        <div class="back" slot="back">
          <h3 class="nm">Texas A&M University</h3>
        </div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/calendar.svg" alt="calendar" />
          <p class="text">How long have we been dating ?</p>
        </div>
        <div class="back" slot="back">
          <h3 class="nm">5+ years since June 2<sup>nd</sup>, 2017</h3>
        </div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/paws.svg" alt="paws" />
          <p class="text">What's a Mosasaurus ?</p>
        </div>
        <div class="back special" slot="back">
          <img src="/images/IMG_7334.jpg" alt="mosa" />
          <h3 class="nm">Mosa, our dog</h3>
        </div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/drink.svg" alt="pasta" />
          <p class="text">What's our go-to drink order ?</p>
        </div>
        <div class="back" slot="back">
          <h3 class="nm">A spicy margarita and a Moscow Mule</h3>
        </div>
      </FlipCard>
    </div>
    <div>
      <FlipCard {manualFlip}>
        <div class="front" slot="front">
          <img src="/images/plants.svg" alt="pasta" />
          <p class="text">Most common object in our house ?</p>
        </div>
        <div class="back" slot="back">
          <h3 class="nm">Plants... We have over 30 of them</h3>
        </div>
      </FlipCard>
    </div>
  </div>
</section>

<style>
  section {
    padding: var(--spacing-6) var(--spacing-4);
    background-color: var(--color-paper);
  }
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    grid-template-rows: 1fr;
    gap: var(--spacing-4);
  }

  .container > div {
    display: flex;
    aspect-ratio: 1;
  }

  .tall {
    display: block !important;
    grid-row: 1 / span 2;
    aspect-ratio: 0.5;
    padding-bottom: 20px;
  }

  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 75%;
    box-sizing: border-box;
    padding: var(--spacing-2) var(--spacing-1);
  }

  .front {
    display: flex;
    flex-direction: column;
  }

  .front > img {
    height: 55%;
  }

  .back > img {
    width: 40%;
  }

  .nm {
    font-size: var(--typography-5);
  }

  @media (max-width: 850px) {
    .front > img {
      height: 75%;
    }
  }

  @media (max-width: 460px) {
    .nm {
      font-size: var(--typography-3);
    }
  }

  .back {
    display: grid;
    place-content: center;
    padding: var(--spacing-2);
  }

  .special {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: var(--color-paper);
    color: var(--color-primary);
    text-transform: uppercase;
    border: none;
    outline: none;
  }

  #clickAnswers {
    display: none;
  }

  @media (hover: none) {
    #hoverAnswers {
      display: none;
    }
    #clickAnswers {
      display: block;
    }
  }
</style>
