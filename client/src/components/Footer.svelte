<script lang="ts">
  import { Link, useLocation } from 'svelte-navigator';
  import { intervalToDuration, formatDuration, parse } from 'date-fns';
  import LinkText from './LinkText.svelte';

  const location = useLocation();
  let backToHome = false;
  $: backToHome = $location.pathname.startsWith('/saveTheDate');

  const wedding = parse(
    '2023-03-25 04:30:00 PM',
    'yyyy-LL-dd hh:mm:ss aa',
    new Date()
  );
  let segments: { label: string; value: any }[] = [];

  const f = () => {
    const interval = intervalToDuration({ start: new Date(), end: wedding });
    segments = [
      { label: 'years', value: interval.years },
      { label: 'months', value: interval.months },
      { label: 'days', value: interval.days },
      { label: 'hours', value: interval.hours },
      { label: 'minutes', value: interval.minutes },
      { label: 'seconds', value: interval.seconds }
    ];

    while (segments.length > 0 && segments[0].value === 0) {
      segments.shift();
    }
    segments = segments.slice(0, 3).map((s) => ({
      label: s.label,
      value: s.value < 10 ? '0' + s.value : String(s.value)
    }));
  };
  f();
  setInterval(f, 1000);
</script>

<div class="background__image" id="hero">
  <div>
    We're so excited to celebrate with you!
    <div id="timebox">
      <div style="z-index: 2">
        <div class="countdown-container">
          {#each segments as segment}
            <div>
              <p>{segment.value}</p>
              <span>{segment.label}</span>
            </div>
          {/each}
        </div>
        Till we say I do...
      </div>
    </div>
    <!-- <div id="saveTheDate">{backToHome ? 'Home' : 'Save The Date'}</div> -->
    <!-- <div class="box">
      <Link to={backToHome ? '/' : '/saveTheDate'}
        ><LinkText color="white"
          >{backToHome ? 'Home' : 'Save The Date'}</LinkText
        ></Link
      >
    </div> -->
  </div>
</div>

<style>
  .background__image {
    position: relative;
    display: grid;
    place-content: center;
    text-align: center;
    text-decoration: none;
    padding: var(--spacing-2) var(--spacing-4);
  }
  .background__image > div {
    z-index: 2;
  }

  #hero {
    min-height: 20vh;
    color: #20303c;
    font-size: 1.8rem;
    padding: var(--spacing-5) 0px;
  }

  #hero::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: var(--color-paper);
  }

  #timebox {
    position: relative;
    text-align: center;
    /* font-family: 'Poppins', serif; */
    letter-spacing: 0.085rem;
    padding: var(--spacing-3) var(--spacing-1);
    color: #20303c;
  }

  .countdown-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15vw;
    align-items: center;
    justify-content: center;
    margin: var(--spacing-6) 0px;
  }

  .countdown-container div {
    display: grid;
    gap: var(--spacing-1);
    min-width: 80px;
  }

  .countdown-container p {
    padding: var(--spacing-1);
    border: 1px solid #20303c;
    margin: 0;
  }

  .countdown-container span {
    font-size: var(--typography-5);
  }

  /* #saveTheDate {
    padding: var(--spacing-1) var(--spacing-3);
    border: 0.5rem solid #20303c;
    background-color: #20303c;
    color: white;
    margin: var(--spacing-2);
  } */

  /* .box {
    padding: var(--spacing-2) var(--spacing-4) var(--spacing-3) var(--spacing-2);
    border: 2px solid white;
  } */
</style>
