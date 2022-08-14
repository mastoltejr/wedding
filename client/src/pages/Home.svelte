<script>
  import { Link } from 'svelte-navigator';
  import Slideshow from '../components/Slideshow.svelte';
  import TimeBox from '../components/home/TimeBox.svelte';
  import Title from '../components/Title.svelte';
  import WhenWhereWho from '../components/home/WhenWhere.svelte';
  import RegistryGrid from '../components/home/RegistryGrid.svelte';
  import LinkText from '../components/LinkText.svelte';
  import Travel from '../components/home/Travel.svelte';
  import Hero from '../components/home/Hero.svelte';
  import Lodging from '../components/home/Lodging.svelte';
  import Activities from '../components/home/Activities.svelte';
  import FunFacts from '../components/home/FunFacts.svelte';
  import Gallery from '../components/gallery/Gallery.svelte';
  import Parallax from '../components/Parallax.svelte';
</script>

<Hero />
<WhenWhereWho />
<!-- <section
  style="padding: var(--spacing-1) var(--spacing-3); background-color: rgb(173, 143, 58)"
>
  <h5 style="color: white">Our Important Moments</h5>
  <h2><Title color="white">Gallery</Title></h2>
</section>
<Slideshow {images} /> -->

<Travel />
<Lodging />
<div style:background="var(--color-secondary)">
  <Parallax
    src="/images/parallax1.jpg"
    height="100vh"
    backgroundPosition="bottom"
  />
</div>

<Activities />
<!-- <div class="section" id="ourStory">
  <h5 style="color: #555">For those who don't know</h5>
  <h2><Title>Our Story</Title></h2>
  <p class="inset">
    We met 9 years ago in London for the first time. Dave was in a supermarket,
    in the frozen aisle trying to figure out what vegan ice cream is and a girl
    walks up and says: "Hey, do you know where to find vegan ice cream?"". As a
    couple we've been are together for 8 years now & we're getting married next
    year.
  </p>
  <Link to="/ourStory"><LinkText>Read more</LinkText></Link>
</div> -->
<RegistryGrid />
<FunFacts />
<Gallery />
