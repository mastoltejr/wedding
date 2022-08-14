<script>
  import { Link, useFocus } from 'svelte-navigator';
  import ScrollDown from '../ScrollDown.svelte';
  const registerFocus = useFocus();
</script>

<!-- <Link to="/saveTheDate"> -->
<div class="parallax__image" id="hero" use:registerFocus>
  <div>
    <span id="title">Bianca & Michael</span>
    <ScrollDown />
    <!-- <div id="saveTheDate">Save The Date</div> -->
  </div>
</div>

<!-- </Link> -->
<style>
  #hero > div {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    /* gap: var(--spacing-2); */
    padding-top: var(--spacing-3);
    z-index: 2;
  }

  #hero {
    min-height: calc(100vh - 48px);
    color: var(--color-paper);
    font-size: 1.8rem;
    cursor: pointer;
    background-image: url('/images/hero-1x.jpg');
  }

  #hero::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #hero #title {
    font-size: clamp(3.5rem, 10vw, 10rem);
    letter-spacing: 0.875rem;
    font-family: 'Aisyah';
    color: var(--color-paper);
    line-height: 170%;
  }

  @media (min-width: 1000px) {
    #hero {
      background-image: url('/images/hero-2x.jpg');
    }
  }

  @media (min-width: 2000px) {
    #hero {
      background-image: url('/images/hero-3x.jpg');
    }
  }

  @media (min-width: 3000px) {
    #hero {
      background-image: url('/images/hero-4x.jpg');
    }
  }

  @media (min-width: 4000px) {
    #hero {
      background-image: url('/images/hero-5x.jpg');
    }
  }
</style>
