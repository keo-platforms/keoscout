import { createInertiaApp } from '@inertiajs/svelte'

import Layout from "~/layouts/default.svelte"

createInertiaApp({
  // Disable progress bar
  //
  // see https://inertia-rails.dev/guide/progress-indicators
  // progress: false,
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.svelte', {
      eager: true,
    })
    const page = pages[`../pages/${name}.svelte`]
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.svelte'`)
    }

    // To use a default layout, import the Layout component
    // and use the following line.
    // see https://inertia-rails.dev/guide/pages#default-layouts
    //
    return { default: page.default, layout: page.layout || Layout }
  }
})
