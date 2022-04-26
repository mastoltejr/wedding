<script>
  import { Link } from 'svelte-navigator';
  import Slideshow from '../components/Slideshow.svelte';
  import TimeBox from '../components/TimeBox.svelte';
  import Title from '../components/Title.svelte';
  import WhenWhere from '../components/home/WhenWhere.svelte';
  import RegistryGrid from '../components/home/RegistryGrid.svelte';
  import LinkText from '../components/LinkText.svelte';

  let images = [
    '/images/sacredOaks.jpeg',
    '/images/bianca profile.jpeg',
    '/images/profile.jpg'
  ];
</script>

<Link to="/saveTheDate">
  <div class="background__image" id="hero">
    <div>
      <span id="title">Bianca & Michael</span>
      <div id="saveTheDate">Save The Date</div>
    </div>
  </div>
</Link>
<WhenWhere />
<TimeBox />
<div class="section" id="#travel">
  <h5 style="color: #555">Getting to Dripping Springs</h5>
  <h2><Title>Travel & Accomodations</Title></h2>
  <p class="inset">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
    obcaecati sed eius, ea suscipit, fuga neque assumenda cum consectetur iusto
    eos! Ut eaque vitae quod minus quia porro optio neque magnam quas, vel iste
    cum voluptatum accusantium ipsam autem aut suscipit nam earum atque dolores
    error molestiae dolorum nobis. Minima asperiores optio recusandae aspernatur
    totam facere quia cum, voluptatibus beatae laboriosam doloremque! Fugit
    maiores perferendis nam obcaecati temporibus quae rerum repellat vero ab,
    mollitia doloribus facere nostrum eius nisi. Repudiandae iure distinctio
    dolorem quam, pariatur temporibus ratione deleniti nesciunt vitae laboriosam
    voluptatem tempore. Commodi dolor sapiente eius sint! Maiores, itaque.
  </p>
  <Link to="/ourStory"><LinkText>Read more</LinkText></Link>
</div>
<Slideshow {images} />
<div class="section" id="registry">
  <h5 style="color: #555">Where to shop</h5>
  <h2><Title>Our Registry</Title></h2>
  <p class="inset">
    We have wedding registries set up at the following stores.
  </p>
  <RegistryGrid />
  <Link to="/registry"><LinkText>Explore the Registry</LinkText></Link>
</div>
<Slideshow {images} />
<div class="section" id="ourStory">
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
</div>

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
    min-height: 80vh;
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
    background-color: rgba(255, 255, 255, 0.4);
  }

  #hero #title {
    font-size: clamp(3.5rem, 10vw, 10rem);
    letter-spacing: 0.875rem;
    font-family: 'Aisyah';
  }

  #saveTheDate {
    padding: var(--spacing-1) var(--spacing-3);
    border: 0.5rem solid #20303c;
    background-color: #20303c;
    color: white;
    margin: var(--spacing-4);
  }

  #saveTheDate:hover {
    background-color: transparent;
    color: #20303c;
  }

  .section {
    padding: var(--spacing-4);
    background-color: white;
    text-align: justify;
    min-height: 30vh;
  }
</style>
