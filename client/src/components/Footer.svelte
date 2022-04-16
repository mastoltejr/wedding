<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator';

  const location = useLocation();
  let backToHome = false;
  $: backToHome = $location.pathname === '/saveTheDate';
</script>

<Link to={backToHome ? '/' : '/saveTheDate'}>
  <div class="background__image" id="hero">
    <div>
      We're so excited<br />
      to celebrate with you
      <div id="saveTheDate">{backToHome ? 'Home' : 'Save The Date'}</div>
    </div>
  </div>
</Link>

<style>
  .background__image {
    position: relative;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-content: center;
    text-align: center;
    text-decoration: none;
    padding: var(--spacing-1) var(--spacing-2);
  }
  .background__image > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    z-index: 2;
  }

  #hero {
    min-height: 20vh;
    color: #20303c;
    font-size: 1.8rem;
    cursor: pointer;
    background-image: url('/images/sacredOaks.jpeg');
  }

  #hero::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(214, 187, 110, 0.8);
  }

  #saveTheDate {
    padding: var(--spacing-1) var(--spacing-3);
    border: 0.5rem solid #20303c;
    background-color: #20303c;
    color: white;
    margin: var(--spacing-2);
  }
</style>
