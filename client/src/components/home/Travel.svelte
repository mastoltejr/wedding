<script type="ts">
  import { Link } from 'svelte-navigator';
  import Title from '../Title.svelte';
  import LinkText from '../LinkText.svelte';
</script>

<section>
  <h5 style="color: var(--color-paper)">Getting to Dripping Springs</h5>
  <Title color="var(--color-paper)" accentColor="var(--color-tertiary)"
    ><h1 id="travel">Travel</h1></Title
  >
  <div class="container">
    <div class="item">
      <img src="/images/airplaneIcon.svg" alt="Airplane" height="48px" />
      <h2 class="title">By Plane</h2>
      <p class="text">
        If you're traveling by plane you'll want to fly into Austin-Bergstrom
        Airport (AUS). Several car rental companies and car share options such
        as Uber & Lyft are available from the airport and abundant in Austin.
        Expect about a 30 minute drive to Dripping Springs.
      </p>
      <a
        href="https://www.google.com/travel/flights?tfs=CBwQARonagwIAhIIL20vMDJjbDESCjIwMjMtMDMtMjRyCwgDEgcvbS8wdnptGidqCwgDEgcvbS8wdnptEgoyMDIzLTAzLTI2cgwIAhIIL20vMDJjbDFwAYIBCwj___________8BQAFIAZgBAQ"
        class="action"
        target="__blank"
        ><LinkText color="var(--color-tertiary)">Look at Flights</LinkText></a
      >
    </div>
    <div class="item">
      <img src="/images/carIcon.svg" alt="" height="48px" />
      <h2 class="title">By Car</h2>
      <p class="text">
        If you're traveling by car there's nothing like driving through this
        beautiful part of Texas. Enjoy the hills,greenery, rivers, and quaint
        towns along the way as you make your way to Camp Lucy in Dripping
        Springs, Texas.<br /><br /><b>From Rio Grande City</b>, you'll want to
        take 755 N to 281 N past San Antonio to Blanco, then head east to
        Dripping Springs on 165. (~5 hours)<br /><br /><b>From Houston</b>, take
        Highway 290 W all the way to Dripping Springs. (~3.5 hours)
      </p>
      <a
        href="https://www.google.com/maps/dir//Camp+Lucy,+3509+Creek+Rd,+Dripping+Springs,+TX+78620/@30.181067,-98.146367,10z/data=!4m19!1m9!3m8!1s0x0:0x66d9224eae0ae83d!2sCamp+Lucy!5m2!4m1!1i2!8m2!3d30.1810668!4d-98.1463666!4m8!1m0!1m5!1m1!1s0x865b6bfac5bbe68d:0x66d9224eae0ae83d!2m2!1d-98.1463666!2d30.1810668!3e2?hl=en"
        class="action"
        target="__blank"
        ><LinkText color="var(--color-tertiary)">Get Directions</LinkText></a
      >
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
    width: 100vw;
    padding: var(--spacing-6) var(--spacing-4);
    text-align: justify;
    background-color: var(--color-primary);
    color: var(--color-paper);
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
    text-align: center;
    padding: var(--spacing-4) 0;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--spacing-4);
  }
  img {
    stroke: black !important;
  }
  .title {
    color: var(--color-tertiary);
    font-weight: 300;
  }

  a {
    padding-top: var(--spacing-5);
    margin-top: auto;
    font-size: 120%;
    font-weight: 600;
  }

  p {
    text-align: center;
    max-width: 475px;
    margin: 0px auto;
  }

  @media only screen and (max-width: 700px) {
    .container {
      grid-template-columns: 1fr;
    }
  }
</style>
