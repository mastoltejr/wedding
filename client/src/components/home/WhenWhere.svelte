<script lang="ts">
  import { navigate } from 'svelte-navigator';
  import { onMount } from 'svelte';
  import Title from '../Title.svelte';
</script>

<section>
  <Title color="var(--color-paper)" accentColor="var(--color-tertiary)"
    ><h1>Welcome</h1></Title
  >
  <p class="text">
    To all our loved ones: we're so excited to celebrate our big day with you!<br
    /><br />Our wedding website is here to help you plan your trip for our
    wedding. Reserve your stay through our hotel block, find local
    recommendations, and see our engagement photos.<br /><br />We are now
    accepting responses for our virtual Save the Date. You can access it by
    clicking the button below, finding your name on the guest list, and filling
    out the form! We can't wait to see you all on March 25th!<br /><br />Love,
    Bianca and Michael
  </p>
  <div id="saveTheDate" on:click={() => navigate('/saveTheDate')}>
    Open our Save The Date
  </div>
  <div class="grid">
    <div class="row">
      <div class="titleSection">
        <img src="/images/watchIcon.svg" width="54px" alt="When" />
        <h1>WHEN</h1>
        <p class="text">March 25<sup>th</sup>, 2023</p>
        <p class="text">4 o<sup>'</sup>clock in the afternoon</p>
      </div>
    </div>
    <div class="row">
      <div class="titleSection">
        <img src="/images/mountainIcon.svg" width="54px" alt="Where" />
        <h1>WHERE</h1>
        <p class="text">Camp Lucy</p>
        <p class="text">Dripping Springs, Texas</p>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    position: relative;
    width: 100vw;
    padding: var(--spacing-6) var(--spacing-4);

    background-color: var(--color-paper);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .row {
    margin-bottom: 3em;
  }

  h1 {
    display: block;
    margin: 1rem 0;
    /* color: rgb(177, 143, 58); */
    color: var(--color-primary);
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: 0.2em;
  }

  #saveTheDate {
    padding: var(--spacing-1) var(--spacing-3);
    border: 2px solid var(--color-primary);
    background-color: var(--color-primary);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");
    color: var(--color-paper);
    margin: var(--spacing-6) auto;
    max-width: 50vw;
    text-align: center;
    font-size: var(--typography-3);
    cursor: pointer;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
  }

  #saveTheDate:hover {
    /* text-decoration: underline; */
    border: 2px solid var(--color-tertiary);
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-7px);
  }

  @media only screen and (min-width: 700px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
