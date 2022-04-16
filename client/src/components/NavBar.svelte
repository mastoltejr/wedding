<script lang="ts">
  import { Link } from 'svelte-navigator';

  let scrollY;
  let previousScroll = 0;
  let scrollStop = 0;
  let scrollingDown = true;
  let hide = false;
  let threshold = 150;
  let delta = 0;
  let open = false;

  const toggleOpen = () => {
    open = !open;
  };

  $: {
    if (scrollY > threshold) {
      delta = Math.abs(scrollY - scrollStop);
      if (scrollingDown !== scrollY > previousScroll) {
        // i.e. direction change
        scrollStop = scrollY;
        scrollingDown = scrollY > previousScroll;
      }

      if (delta > threshold) {
        hide = scrollingDown;
      }

      previousScroll = scrollY;
    } else {
      hide = false;
    }
  }
</script>

<header class:hide>
  <nav id="navbar">
    <ul>
      <li><Link to="/#hero"><span class="link">Home</span></Link></li>
      <li><Link to="/#ourStory"><span class="link">Our Story</span></Link></li>
      <li><Link to="/#travel"><span class="link">Getting Here</span></Link></li>
      <li><Link to="/#registry"><span class="link">Registry</span></Link></li>
      <li>
        <Link to="/#invite"><span class="link">Save The Date</span></Link>
      </li>
    </ul>
  </nav>
  <div id="hamburger-icon" class:open on:click={toggleOpen}>
    <div class="bar1" />
    <div class="bar2" />
    <div class="bar3" />
    <ul class="mobile-menu">
      <li><a href="/home">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/about">About</a></li>
      <li id="login"><a href="/login">Login</a></li>
      <li id="signup"><a href="/signup">Signup</a></li>
    </ul>
  </div>
</header>

<svelte:window bind:scrollY />

<style>
  header {
    position: fixed;
    z-index: 3;
    top: 0;
    height: 64px;
    width: 100vw;
    padding: 0 var(--spacing-4);
    background-color: white;
    box-shadow: 0px 0px 9px 3px rgb(41 41 41 / 18%);
    transition: top 0.8s;
    display: flex;
    justify-content: center;
  }

  header.hide {
    top: -100%;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: var(--spacing-2);
    padding-inline-start: 0;
    margin: 0;
  }

  li {
    padding: var(--spacing-2) var(--spacing-1);
    text-align: center;
  }

  .link {
    text-decoration: none;
    color: var(--color-secondary);
    font-size: var(--typography-fluid-1);
  }

  li:hover .link {
    color: var(--color-primary);
  }

  /* other */

  #hamburger-icon {
    margin: auto 0;
    display: none;
    cursor: pointer;
  }

  #hamburger-icon div {
    width: 35px;
    height: 3px;
    background-color: var(--color-secondary);
    margin: 6px 0;
    transition: 0.4s;
  }

  #hamburger-icon div.bar2 {
    width: 10px;
  }

  #hamburger-icon.open div.bar2 {
    width: 35px;
  }

  .mobile-menu {
    display: none;
    position: absolute;
    top: 64px;
    left: 100%;
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    transition: left 0.4s;
    background-color: white;
    color: var(--color-secondary);
    font-size: var(--typography-fluid-1);
  }

  .open .mobile-menu {
    left: 0;
  }

  .mobile-menu li {
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 700px) {
    header {
      justify-content: flex-end;
    }
    header nav {
      display: none;
    }

    #hamburger-icon {
      display: block;
    }
  }
</style>
