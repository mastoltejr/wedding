<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator';
  import BM from './BM.svelte';
  let open = false;

  const toggleOpen = () => {
    open = !open;
  };

  const location = useLocation();

  $: {
    // console.log($location);
    open = false;
  }
</script>

<header>
  <Link to="/">
    <div style="padding: 4px; box-sizing: border-box">
      <BM />
    </div>
  </Link>

  <nav>
    <ul class:open>
      <li on:click={toggleOpen}><Link to="/"><span>Home</span></Link></li>
      <li on:click={toggleOpen}>
        <Link to="/saveTheDate"><span>Save The Date</span></Link>
      </li>
      <li on:click={toggleOpen}>
        <Link to="/#travel"><span>Travel</span></Link>
      </li>
      <li on:click={toggleOpen}>
        <Link to="/#registry"><span>Registry</span></Link>
      </li>
      <li on:click={toggleOpen}>
        <Link to="/#gallery"><span>Gallery</span></Link>
      </li>
    </ul>
  </nav>
  <div id="hamburger-icon" on:click={toggleOpen}>
    <div class="bar1" />
    <div class="bar2" class:open />
    <div class="bar3" />
  </div>
</header>

<style>
  header {
    position: fixed;
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    width: 100vw;
    height: 48px;
    z-index: 3;
    background-color: var(--color-paper);
    box-shadow: 0px 0px 9px 3px rgb(41 41 41 / 18%);
    text-transform: uppercase;
    overflow: hidden;
    font-family: Futura, sans-serif;
  }

  ul {
    display: flex;
    text-align: center;
    margin: 0px auto;
    padding: 0px;
    transition: left 0.3s ease-in-out 0s;
  }

  li {
    flex-grow: 1;
    padding-left: 1em;
    padding-right: 1em;
    line-height: 3rem;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.2em;
  }

  span {
    color: rgb(51, 51, 51);
    transition: color 0.1s linear 0s;
  }

  li:hover span {
    color: var(--color-primary);
  }

  #hamburger-icon {
    margin: auto 0;
    display: none;
    cursor: pointer;
  }

  #hamburger-icon div {
    width: 35px;
    height: 3px;
    background-color: var(--color-primary);
    margin: 6px 0;
    transition: width 0.3s ease-in-out 0s;
  }

  #hamburger-icon div.bar2 {
    width: 10px;
  }

  #hamburger-icon div.bar2.open {
    width: 35px;
  }

  /* .mobile-menu {
    position: absolute;
    top: 48px;
    left: 100%;
    height: calc(100vh - 48px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: left 0.4s;
    background-color: var(--color-paper);
    color: var(--color-primary);
    font-size: var(--typography-fluid-1);
  } */

  @media only screen and (max-width: 700px) {
    header nav ul {
      width: 100vw;
      position: fixed;
      height: calc(100vh - 48px);
      left: 100%;
      top: 48px;
      flex-direction: column;
      background-color: var(--color-paper);
    }

    header nav ul li {
      flex-grow: 0;
    }

    header nav ul.open {
      left: 0;
    }

    #hamburger-icon {
      display: block;
    }
  }
</style>
