<script>
  import { onMount, tick } from 'svelte';
  import { useLocation } from 'svelte-navigator';

  const location = useLocation();

  onMount(() => {
    // Don't use the `$` shorthand for store subscription here, since
    // we only want to run this when the app has mounted, not
    // when the component is created
    const unsubscribe = location.subscribe(async (newLocation) => {
      // If there's no hash, we don't need to scroll anywhere
      if (!newLocation.hash) return;
      // We need to wait for svelte to update the dom before atempting to
      // scroll to a specific element
      await tick();
      // Get the element referenced by the fragment. `location.hash`
      // always starts with `#` when a hash exists, so we already have a
      // valid id selector
      const fragmentReference = document.querySelector(newLocation.hash);
      // If the fragment does not reference an element, we can ignore it
      if (!fragmentReference) return;

      fragmentReference.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
      // const yOffset = 0;
      // const y =
      //   fragmentReference.getBoundingClientRect().top +
      //   window.pageYOffset +
      //   yOffset;
      // window.scrollTo({ top: y, behavior: 'smooth' });
      // Set a tabindex, so the element can be focused
      if (!fragmentReference.hasAttribute('tabindex')) {
        fragmentReference.setAttribute('tabindex', '-1');
        // Remove the tabindex on blur to prevent weird jumpy browser behaviour
        fragmentReference.addEventListener(
          'blur',
          () => fragmentReference.removeAttribute('tabindex'),
          { once: true }
        );
      }
      // @ts-ignore
      fragmentReference.focus();
      // By setting location.hash explictly, we ensure :target
      // selectors in CSS will work as expected
      window.location.hash = newLocation.hash;
    });
    return unsubscribe;
  });
</script>

<slot />
