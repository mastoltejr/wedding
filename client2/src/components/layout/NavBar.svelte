<!-- <svelte:window bind:scrollY={scroll} /> -->
<nav id="navbar">
	<!--  class:sticky={scroll >= navBarTop} -->
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/#ourStory">Our Story</a></li>
		<li><a href="/#travel">Getting Here</a></li>
		<li><a href="/registry">Registry</a></li>
		<li><a href="/saveTheDate">Save The Date</a></li>
	</ul>
</nav>

<!-- <div style="height: {scroll >= navBarTop ? navBarHeight : 0}px" /> -->
<style>
	nav {
		position: fixed;
		z-index: 3;
		inset: 0 0 auto 0;
		padding: 0 var(--spacing-4);
		background-color: white;
		box-shadow: 0px 0px 9px 3px rgb(41 41 41 / 18%);
	}

	/* .sticky {
		position: fixed;
		top: 0;
		width: 100%;
	} */

	/* nav > span {
        font-size: clamp(1.5rem, 1rem + 5vw, 5rem);
    } */

	ul {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		gap: var(--spacing-2);
		padding-inline-start: 0;
		margin: 0;
	}

	li {
		padding: var(--spacing-2) var(--spacing-1);
		text-align: center;
	}

	a {
		text-decoration: none;
		color: var(--color-secondary);
		font-size: var(--typography-fluid-1);
	}

	a:hover {
		color: var(--color-primary);
	}
</style>
