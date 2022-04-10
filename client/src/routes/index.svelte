<script lang="ts">
	import TimeBox from '../components/layout/TimeBox.svelte';
	import Slideshow from '../components/layout/Slideshow.svelte';
	let images = ['/images/sacredOaks.jpeg', '/images/bianca profile.jpeg', '/images/profile.jpg'];
	// import { goto } from '$app/navigation';

	// function routeToPage(route: string, replaceState: boolean) {
	// 	goto(`/${route}`, { replaceState });
	// }
	// const handleClick = (link: string) => () => {
	// 	window.location.replace(link);
	// };
</script>

<a class="background__image" id="hero" href="/saveTheDate">
	<div>
		<span>Bianca & Michael</span><br />
		March 25th, 2023 | Dripping Springs TX
		<div id="saveTheDate">Save The Date</div>
	</div>
</a>
<div class="section" id="ourStory">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate nostrum ex dolorem fuga
	voluptate. Velit neque sequi atque distinctio quae repellat numquam provident aspernatur qui
	praesentium, minus expedita ex labore commodi voluptates eligendi modi nihil. Pariatur eveniet
	reprehenderit ipsum harum dolorum atque provident, qui porro hic vel ipsam dolore!
</div>
<Slideshow {images} />
<div class="section" id="ourStory">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate nostrum ex dolorem fuga
	voluptate. Velit neque sequi atque distinctio quae repellat numquam provident aspernatur qui
	praesentium, minus expedita ex labore commodi voluptates eligendi modi nihil. Pariatur eveniet
	reprehenderit ipsum harum dolorum atque provident, qui porro hic vel ipsam dolore!
</div>
<TimeBox />
<div style="background-color: cyan; height: 150vh" />

<!-- <div class="hero1" style="background-image: url('/images/profile.jpg');">
	<div class="caption"><span class="border">Testing</span></div>
</div>
<div class="section" style:background="#777" style:color="white">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut cupiditate nostrum ex dolorem fuga
	voluptate. Velit neque sequi atque distinctio quae repellat numquam provident aspernatur qui
	praesentium, minus expedita ex labore commodi voluptates eligendi modi nihil. Pariatur eveniet
	reprehenderit ipsum harum dolorum atque provident, qui porro hic vel ipsam dolore!
</div> -->
<style>
	@import url('https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap');
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

	.section {
		padding: var(--spacing-4);
		background-color: white;
		color: #777;
		text-align: justify;
		min-height: 30vh;
	}

	.color {
		width: 100vw;
		height: 300px;
		display: grid;
		place-content: center;
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

	@font-face {
		font-family: Aisyah;
		src: url('fonts/Aisyah-Demo.otf') format('opentype');
	}

	#hero span {
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
</style>
