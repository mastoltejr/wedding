<script lang="ts">
  import AutoCompleteItem from './AutoCompleteItem.svelte';
  import { onMount } from 'svelte';
  import { getGuestList, Guest, GuestList, escapeRegExp } from '../queries';
  import parse from 'autosuggest-highlight/parse';
  import match from 'autosuggest-highlight/match';
  import { navigate } from 'svelte-navigator';

  export let path: string;
  let guestList: GuestList = [];
  let searchInput;
  let inputValue: string = '';
  let currentIndex: number | null = null;

  onMount(() => {
    getGuestList().then((data) => {
      guestList = data;
    });
  });

  let filteredGuestList: GuestList = [];

  const filterGuestList = () => {
    const searchRegex = new RegExp(escapeRegExp(inputValue), 'i');
    filteredGuestList = !!inputValue
      ? guestList.filter(({ fullName }) => searchRegex.test(fullName))
      : [];
  };

  const setInputVal = (guest: Guest) => {
    inputValue = guest.fullName;
    filteredGuestList = [];
    currentIndex = null;
    document.querySelector<HTMLInputElement>('#guestList-input').focus();
    navigate(`/${path}/${guest.code}`);
  };

  const makeMatchBold = (str: string) => {
    const matches = match(str, inputValue, { insideWords: true });
    const parts = parse(str, matches);
    return parts.reduce(
      (s, { text, highlight }) =>
        s + (highlight ? `<strong>${text}</strong>` : text),
      ''
    );
  };

  const navigateList = (e) => {
    if (e.key === 'ArrowDown' && currentIndex <= filteredGuestList.length - 1) {
      currentIndex === null ? (currentIndex = 0) : (currentIndex += 1);
    } else if (e.key === 'ArrowUp' && currentIndex !== null) {
      currentIndex === 0
        ? (currentIndex = filteredGuestList.length - 1)
        : (currentIndex -= 1);
    } else if (e.key === 'Enter') {
      setInputVal(filteredGuestList[currentIndex]);
    } else {
      return;
    }
  };

  $: if (!!!inputValue) {
    filteredGuestList = [];
    currentIndex = null;
  }
</script>

<svelte:window on:keydown={navigateList} />

<div class="autocomplete">
  <input
    id="guestList-input"
    type="text"
    placeholder="My name is..."
    bind:this={searchInput}
    bind:value={inputValue}
    on:input={filterGuestList}
  />
  {#if filteredGuestList.length > 0}
    <ul id="autocomplete-items-list">
      {#each filteredGuestList as guest, i}
        <AutoCompleteItem
          itemLabel={makeMatchBold(guest.fullName)}
          highlighted={i === currentIndex}
          on:click={() => setInputVal(guest)}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  div.autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
    width: 300px;
    margin: 0px auto;
  }
  input {
    padding: 10px;
    font-size: var(--typography-6);
    margin: 0;
  }
  input[type='text'] {
    width: 100%;
  }

  #autocomplete-items-list {
    position: relative;
    margin: 0;
    padding: 0;
    top: 0;
    width: 297px;
    border: 1px solid #ddd;
    background-color: #ddd;
    max-height: 40vh;
    overflow-y: auto;
  }
</style>
