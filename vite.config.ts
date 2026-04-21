import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import ruby from 'vite-plugin-ruby'
import extractorSvelte from '@unocss/extractor-svelte'
import inertia from '@inertiajs/vite'

export default defineConfig({
  plugins: [
    paraglideVitePlugin({ project: './project.inlang', outdir: './app/frontend/i18n', outputStructure: 'locale-modules' }),
    inertia({
      // ssr: {
      //   entry: 'entrypoints/inertia.js',
      // },
    }),
    
    unocss({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    ruby(),
  ],
})
