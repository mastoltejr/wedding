<script lang="ts">
  import { intervalToDuration, formatDuration, parse } from 'date-fns';
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
    segments = segments.slice(0, 3);
  };
  f();
  setInterval(f, 1000);
</script>

<div id="timebox">
  <div id="dark-layer" />
  <div style="z-index: 2">
    <span id="title">Till we say I do...</span>
    <div class="countdown-container">
      {#each segments as segment}
        <div>
          <p>{segment.value}</p>
          <span>{segment.label}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  #timebox {
    position: relative;
    display: grid;
    place-content: center;
    text-align: center;
    font-family: 'Poppins', serif;
    letter-spacing: 0.085rem;
    margin: 0;
    padding: var(--spacing-3) var(--spacing-1);
    font-weight: bold;
    font-size: var(--typography-2);
    color: white;
    background-image: url('/images/sacredOaks.jpeg');
    background-size: cover;
    background-position: center 60%;
    height: 50vh;
  }

  #title {
    font-size: 120%;
    display: block;
    margin-bottom: 5rem;
  }

  #dark-layer {
    position: absolute;
    inset: 0 0 0 0;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }

  .countdown-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15vw;
    align-items: center;
    justify-content: center;
    margin-top: var(--spacing-4);
  }

  .countdown-container div {
    display: grid;
    gap: var(--spacing-1);
  }

  .countdown-container p {
    padding: var(--spacing-1);
    border: 1px solid white;
    margin: 0;
  }

  .countdown-container span {
    font-size: var(--typography-5);
  }
</style>
