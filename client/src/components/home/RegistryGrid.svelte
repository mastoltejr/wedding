<script lang="ts">
  import Title from '../Title.svelte';
  import LinkText from '../LinkText.svelte';
  import { Link } from 'svelte-navigator';
</script>

<section id="registry">
  <h5 style="color: var(--color-paper)">Where to shop</h5>
  <h2>
    <Title color="var(--color-paper)" accentColor="var(--color-tertiary"
      >Our Registry</Title
    >
  </h2>
  <p class="inset">
    Coming soon...
    <!-- The best present you could possibly give us is celebrating our marriage with
    us. However, if you'd like to spoil us, we've picked out a few items &
    activities below at the following stores. -->
  </p>
  <!-- <div class="grid">
    <a
      href="https://www.crateandbarrel.com/gift-registry/bianca-garza-and-michael-stolte/r6494306"
      target="__blank"
      class="store"
    >
      <div class="wrapper">
        <div class="logo">
          <img src="/images/crateBarrel.webp" alt="Crate & Barrel" />
        </div>
      </div>
    </a>
    <a
      href="https://www.bedbathandbeyond.com/store/giftregistry/viewregistryguest/551415067?selectedRLVFilters=_recommended"
      target="__blank"
      class="store"
    >
      <div class="wrapper">
        <div class="logo">
          <img src="/images/bedBathBeyond.webp" alt="Bed Bath and Beyond" />
        </div>
      </div>
    </a>
    <a
      href="https://www.amazon.com/wedding/share/stoltewedding2023"
      target="__blank"
      class="store"
    >
      <div class="wrapper">
        <div class="logo">
          <img src="/images/amazon.webp" alt="Amazon Registry" />
        </div>
      </div>
    </a>
  </div> -->
  <!-- <Link to="/registry"
    ><LinkText color="var(--color-paper)"
      >Explore all three registries at once</LinkText
    ></Link
  > -->
</section>

<style>
  section {
    background-color: var(--color-primary);
    padding: var(--spacing-6) var(--spacing-4);
  }

  /* .grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1100px;
    margin: var(--spacing-4) auto;
    gap: var(--spacing-1);
  }

  a {
    display: block;
    padding: 16px 16px 56px;
    border: 1px solid transparent;
    box-sizing: border-box;
    padding: 36px 16px;
    position: relative;
    width: 100%;
  }

  a:hover {
    border: 1px solid var(--color-paper);
  }

  @media (min-width: 768px) {
    a {
      width: calc((100% - 2 * var(--spacing-1)) / 3);
    }
  }

  .wrapper {
    height: 0;
    overflow: hidden;
    padding-top: 34.55285%;
    position: relative;
  }

  .logo {
    align-items: center;
    display: flex;
    font-size: 0;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  } */
</style>
