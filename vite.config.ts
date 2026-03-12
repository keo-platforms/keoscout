import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import RubyPlugin from 'vite-plugin-ruby'
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
  plugins: [
    UnoCSS({
      extractors: [
        extractorSvelte(),
      ],
    }),
    svelte(),
    RubyPlugin(),
  ],
})
