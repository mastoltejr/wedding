<script lang="ts">
  import RestaurantTag from '../RestaurantTag.svelte';
  import Title from '../Title.svelte';
</script>

<section>
  <h5 style="color: var(--color-paper)">Explore Dripping Springs</h5>
  <Title color="var(--color-paper)" accentColor="var(--color-tertiary)"
    ><h1>Activities</h1></Title
  >
  <p class="text">
    Here are a few of our favorite local spots for you to check out while you're
    in town.
  </p>
  <div class="grid">
    <div>
      <h4 class="header">breakfast / brunch</h4>
      <ul>
        <li>
          <RestaurantTag
            title="Crêpe Crazy"
            link="https://www.crepecrazy.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Rolling in Thyme & Dough"
            link="https://www.thymeanddough.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Drippin Donuts"
            link="http://www.KBB2WUuFhHucSFfU6.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Le Muse Coffee Bar"
            link="http://www.lemusecoffeeandwinebar.com/"
          />
        </li>
      </ul>
    </div>
    <div>
      <h4 class="header">lunch / dinner</h4>
      <ul>
        <li>
          <RestaurantTag
            title="Homespun Kitchen and Bar"
            link="http://www.homespunkitchenandbar.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Rolling in Thyme & Dough"
            link="https://www.thymeanddough.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Pig Pen BBQ"
            link="https://www.pigpenbbq.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Tillies at Camp Lucy"
            link="https://www.tilliesdrippingsprings.com/"
          />
        </li>
        <li>
          <RestaurantTag title="Le Vacher" link="https://www.levachertx.com/" />
        </li>
      </ul>
    </div>
    <div>
      <h4 class="header">drinks</h4>
      <ul>
        <li>
          <RestaurantTag
            title="Treaty Oaks Distilling"
            link="https://www.treatyoakdistilling.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Deep Eddy Vodka Tasting Room"
            link="https://www.deepeddyvodka.com/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Desert Door Distillery"
            link="https://www.desertdoor.com/"
          />
        </li>
      </ul>
    </div>
    <div>
      <h4 class="header">activities</h4>
      <ul>
        <li>
          <RestaurantTag
            title="Downtown Wimberly"
            link="https://goo.gl/maps/4iiTjzj63tTYvrxu6"
          />
        </li>
        <li>
          <RestaurantTag
            title="Enchanted Rock"
            link="https://www.tpwd.state.tx.us/"
          />
        </li>
        <li>
          <RestaurantTag
            title="Hamilton Pool"
            link="https://goo.gl/maps/b8ZWbQkXtpZZ7Rsq6"
          />
        </li>
      </ul>
    </div>
  </div>
</section>

<style>
  section {
    background-color: var(--color-secondary);
    padding: var(--spacing-6) var(--spacing-4);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10vw;
    margin: 0px auto;
  }

  .header {
    color: var(--color-paper);
    margin-bottom: var(--spacing-1);
  }

  ul {
    padding: 0;
    margin-bottom: var(--spacing-2);
  }
  li {
    margin-top: var(--spacing-2);
  }

  @media (max-width: 1250px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 740px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
