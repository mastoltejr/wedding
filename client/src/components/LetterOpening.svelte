<script lang="ts">
  import AutoComplete from 'simple-svelte-autocomplete';
  import { navigate } from 'svelte-navigator';
  import { getNames } from '../queries';
  import { onMount } from 'svelte';
  let selectedUser;
  let action = false;
  if (!!selectedUser) {
    alert(selectedUser);
  }

  onMount(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      if (entries.length === 0) return;
      const { isIntersecting } = entries[0];
      action = isIntersecting;
    };

    let observer = new IntersectionObserver(callback, {
      threshold: 0.5
    });

    observer.observe(document.querySelector('#invite'));
  });
</script>

<div id="invite" class:action>
  <div id="container">
    <div id="background" />
    <div id="inside" />
    <div id="paper">
      <div>
        <span>You're Invited!</span>
        <AutoComplete
          searchFunction={getNames}
          bind:selectedItem={selectedUser}
          labelFieldName="fullName"
          valueFieldName="code"
          minCharactersToSearch={4}
          maxItemsToShowInList={5}
          delay={200}
          localFiltering={false}
          placeholder="Search the Guest List..."
          showLoadingIndicator={true}
          noInputStyles={true}
          inputClassName="userQuery"
          dropdownClassName="userQueryDropDown"
          required
          hideArrow={true}
        />
      </div>
    </div>
    <div id="cover" />
  </div>
</div>

<style>
  #invite {
    padding: var(--spacing-6) 0;
    background-color: #20303c;
    /* overflow: hidden; */
  }

  #container {
    position: relative;
    width: 80vw;
    max-width: 800px;
    margin: 0 auto;
    height: 60vh;
  }

  #background {
    background-color: #efefef;
    position: absolute;
    inset: 0 0 0 0;
    clip-path: polygon(50% 0%, 100% 38%, 100% 100%, 0 100%, 0% 38%);
  }

  #inside {
    background-color: var(--color-secondary);
    position: absolute;
    inset: 0 0 0 0;
    clip-path: polygon(50% 4%, 98% 39%, 98% 46%, 50% 68%, 2% 46%, 2% 39%);
  }

  #paper {
    background-color: white;
    position: absolute;
    left: 5%;
    right: 5%;
    top: 38%;
    height: 62%;
    transition: top 1s ease-out;
    z-index: 2;
    padding: var(--spacing-1);
    color: var(--color-primary);
    text-align: center;
  }
  #paper > div {
    padding: var(--spacing-3);
    border: 3px solid var(--color-primary);
    width: 100%;
    height: 100%;
  }
  #paper > div > span {
    font-size: clamp(2.3rem, 6vw, 5rem);
    letter-spacing: 0.875rem;
    font-family: 'Aisyah';
    display: block;
  }

  #invite.action #paper {
    animation: popup 2s forwards 0s ease-in-out;
  }

  @keyframes popup {
    0% {
      transform: translateY(0%);
      height: 62%;
      z-index: 2;
    }
    50% {
      transform: translateY(-100%);
      height: 80%;
      z-index: 4;
    }
    100% {
      transform: translateY(-30%);
      height: 80%;
      z-index: 4;
    }
  }

  #cover {
    background-color: #efefef;
    position: absolute;
    inset: 0 0 0 0;
    clip-path: polygon(50% 68%, 100% 45%, 100% 100%, 0 100%, 0% 45%);
    z-index: 3;
  }

  .userQuery {
    width: 60vw;
    max-width: 600px;
  }
</style>
