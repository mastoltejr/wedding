<div class="section">
  <div id="wedding">The Wedding</div>
  <div id="lowerGrid">
    <div>
      <span class="title">When</span>
      <p>
        March 25th, 2023<br /><br />
        4 o'clock in the afternoon
      </p>
    </div>
    <div>
      <span class="title">Where</span>
      <p>
        Camp Lucy<br />
        3509 Creek Rd<br />
        Dripping Springs, TX 78620
      </p>
    </div>
  </div>
</div>

<style>
  .section {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
    min-height: 30vh;
    text-align: center;
    color: white;
    background-color: var(--color-primary);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpolygon fill-rule='evenodd' points='8 4 12 6 8 8 6 12 4 8 0 6 4 4 6 0 8 4'/%3E%3C/g%3E%3C/svg%3E");
  }

  #wedding {
    font-size: var(--typography-1);
    font-weight: 900;
  }

  #lowerGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  #lowerGrid div {
    position: relative;
    padding: var(--spacing-4);
  }

  #lowerGrid div:first-child::after {
    content: '';
    position: absolute;
    inset: 0 0 0 auto;
    border-right: 1px solid var(--color-paper);
  }

  .title {
    font-size: var(--typography-3);
    font-weight: 600;
  }
</style>
