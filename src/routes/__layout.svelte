
<style global>
*,
*::before,
*::after {
	box-sizing: border-box;
}

/* Remove list styles (bullets/numbers) */
ol,
ul,
menu {
	list-style: none;
}

/* For images to not be able to exceed their container */
img {
	max-width: 100%;
}

/* removes spacing between cells in tables */
table {
	border-collapse: collapse;
}

:root {
	--color-primary: #75464a;
	--color-secondary: #aa7c7a;
	--color-tertiary: #beaba7;

	--color-html: #e8e8e9;
	--color-background: #f3eeea;
	--color-paper: #e8d8d4;

	--spacing-1: 0.5rem;
	--spacing-2: 1rem;
	--spacing-3: 1.5rem;
	--spacing-4: 2rem;
	--spacing-5: 2.5rem;
	--spacing-6: 3rem;

	--typography-6: 0.8rem;
	--typography-5: 1rem;
	--typography-4: 1.5rem;
	--typography-3: 1.7rem;
	--typography-2: 2rem;
	--typography-1: 2.2rem;
}

html {
	background-color: var(--color-html);
}

body {
	background-color: var(--color-background);
	max-width: 1440px;
	margin: 0px auto;
	min-height: 100vh;
}

/* Color */

.color__primary {
	color: var(--color-primary);
}

.color__secondary {
	color: var(--color-secondary);
}

/* Typography */

h1 {
	font-size: var(--typography-1);
	margin: var(--spacing-3) 0;
	text-align: left;
}

h4 {
	font-size: var(--typography-4);
	margin: var(--spacing-2) 0;
	text-align: left;
}

.body1 {
	font-size: var(--typography-5);
	line-height: 1.3rem;
	letter-spacing: 0.04rem;
	text-align: left;
}

.caption {
	font-size: var(--typography-6);
}

/* Surfaces */

.background__primary {
	background-color: var(--color-primary);
}

.background__secondary {
	background-color: var(--color-secondary);
}

.background__paper {
	background-color: var(--color-paper);
}

/* Spacing */

.inset {
  padding-left: var(--spacing-2);
}

/* Container Layouts */

.grid {
  display: grid;
  align-items: center;
}

.flex__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flex__row {
  display: flex;
  gap: var(--spacing-2);
  align-items: center;
  justify-content: center;
}

/* NAV */ 

nav {
  position: sticky;
  padding: var(--spacing-1) var(--spacing-4);
  font-size: clamp(1rem, 0.5rem + 1vw, 2rem);
}
nav > span {
  font-size: clamp(1.5rem, 1rem + 5vw, 5rem);
}

nav > div {
  display: none;
  text-decoration: none;
}

@media (min-width: 500px) {
  nav > div {
    display: flex;
    gap: clamp(var(--spacing-2), var(--spacing-2) + 6vw, var(--spacing-5));
    align-items: center;
    justify-content: center;
  }
}

nav > div > a {
  text-decoration: none;
  color: var(--color-secondary);
}

nav > div > a:hover {
  color: var(--color-primary);
}
</style>

<nav
      class="[ background__paper flex__row padding__1 ]"
      style="justify-content: space-between"
    >
      <span class="[ color__primary ]">B&M</span>
      <div>
        <a href="/">Home</a>
        <a href="ourStory">Our Story</a>
        <a href="/rsvp">RSVP</a>
        <a href="/info">INFO</a>
      </div>
    </nav>
<slot></slot>