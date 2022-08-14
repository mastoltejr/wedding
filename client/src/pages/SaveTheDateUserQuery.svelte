<script lang="ts">
  import { onMount } from 'svelte';
  import { useFocus } from 'svelte-navigator';

  import AutoComplete from '../components/AutoComplete.svelte';
  import ScrollDown from '../components/ScrollDown.svelte';
  export let path: string;

  const registerFocus = useFocus();
</script>

<div class="box userQuery">
  <div id="card" use:registerFocus>
    <img src="/images/saveTheDate.jpg" alt="SaveTheDateImage" />
    <div>
      <div id="infoGrid">
        <div id="letters">
          <div>B</div>
          <div id="borderLetter">M</div>
        </div>
        <span id="svd">SAVE the DATE</span>
        <div>
          Bianca Gabriela Garza<br />&<br />Michael Allen Stolte Jr.
        </div>
        <div>
          Dripping Springs, TX<br />
          March 25<sup>th</sup>, 2023
        </div>
      </div>
    </div>
  </div>
  <div class="search">
    <h2
      style="text-align: center;text-transform: uppercase; font-weight: 400; color: white"
    >
      Search the guest list<br />to fill out the Save The Date
    </h2>
    <AutoComplete {path} />
  </div>
</div>

<style>
  #card {
    background: var(--color-paper);
    display: grid;
    grid-template-columns: auto minmax(350px, 1fr);
    /* grid-template-rows: minmax(80vh, 600px); */
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.25),
      0px 10px 10px rgba(0, 0, 0, 0.22);
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  #card > div {
    display: grid;
    place-content: center;
    position: relative;
  }

  #card > img {
    height: 100%;
  }

  #infoGrid {
    position: relative;
    display: grid;
    grid-template-rows: 1fr;
    gap: var(--spacing-4);
    padding: var(--spacing-4) var(--spacing-2) var(--spacing-2) var(--spacing-2);
    text-align: center;
    font-size: var(--typography-5);
    font-family: Futura, sans-serif;
  }

  #letters {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  #letters > div {
    position: relative;
    display: grid;
    place-content: center;
    font-size: var(--typography-1);
    height: 20%;
    padding: var(--spacing-3) 0;
    color: var(--color-tertiary);
  }

  #borderLetter::after {
    content: '';
    position: absolute;
    top: -20%;
    left: -1px;
    height: 140%;
    width: 2px;
    background-color: var(--color-tertiary);
  }

  #infoGrid > span {
    font-size: var(--typography-3);
  }

  .userQuery {
    padding-top: 5vh;
  }

  .search {
    position: relative;
    /* width: 600px; */
    margin: var(--spacing-6) auto auto auto;
    display: grid;
  }

  .box {
    background-image: url('/images/blobs.svg');
    background-size: cover;
    background-position: center;
  }

  @media (max-width: 1100px) {
    #card {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }

    #card > img {
      width: 100%;
      height: auto;
    }

    #infoGrid {
      gap: var(--spacing-2);
    }
  }
</style>
