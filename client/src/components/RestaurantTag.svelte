<script type="ts">
  import LinkText from './LinkText.svelte';

  export let title = 'Homespun Kitchen and Bar';
  export let link = 'https://google.com';
</script>

<LinkText color="var(--color-tertiary)">
  <a href={link} target="_blank">{title}</a>
</LinkText>

<style>
  a {
    font-weight: 800;
    font-family: Futura, sans-serif;
  }
</style>
