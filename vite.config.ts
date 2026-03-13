import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import ruby from 'vite-plugin-ruby'
import extractorSvelte from '@unocss/extractor-svelte'
import inertia from '@inertiajs/vite'

export default defineConfig({
  plugins: [
    unocss({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    ruby(),
    inertia({
      ssr: {
        entry: 'entrypoints/inertia.js',
      },
    }),
  ],
})
