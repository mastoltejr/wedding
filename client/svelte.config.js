import sveltePreprocess from 'svelte-preprocess'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  vite: {
     plugins: [
       (function LoadSecrets() {
         return {
           name: 'load-secrets',
           configureServer: async () => {
             ;(await import('dotenv')).config()
           }
         }
       })()
     ]
   }
}
