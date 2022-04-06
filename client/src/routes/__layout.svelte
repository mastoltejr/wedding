<script>
import NavBar from "../components/layout/NavBar.svelte";

</script>

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
	background-color: white;
	max-width: 1440px;
	margin: 0px auto;
	min-height: 100vh;
}

.box {
    padding: var(--spacing-3) var(--spacing-2);
}

/* Color

.color__primary {
	color: var(--color-primary);
}

.color__secondary {
	color: var(--color-secondary);
}


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


.background__primary {
	background-color: var(--color-primary);
}

.background__secondary {
	background-color: var(--color-secondary);
}

.background__paper {
	background-color: var(--color-paper);
}

.inset {
  padding-left: var(--spacing-2);
}


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
*/
</style>

<NavBar />
<div class="box"><slot></slot></div>
