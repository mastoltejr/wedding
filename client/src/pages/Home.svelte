<script>
  import { Link } from 'svelte-navigator';
  import Slideshow from '../components/Slideshow.svelte';
  import TimeBox from '../components/TimeBox.svelte';
  import Title from '../components/Title.svelte';

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
      <span id="info">March 25th, 2023 | Dripping Springs TX</span>
      <div id="saveTheDate">Save The Date</div>
    </div>
  </div>
</Link>
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
  <Link to="/ourStory"><span>Read more</span></Link>
</div>
<Slideshow {images} />
<div class="section" id="travel">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque inventore
  atque incidunt pariatur odit, sed reiciendis eos corrupti laudantium nobis
  laboriosam illum magni ipsa deserunt molestias debitis quo similique facilis
  molestiae neque eum sapiente doloremque? Autem amet consequuntur explicabo ad
  eos obcaecati accusantium optio tenetur repellat omnis? Quam, nihil id.
</div>
<TimeBox />

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

  #hero #info {
    font-weight: 600;
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
