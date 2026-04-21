import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '../styles/default.css'

import { createInertiaApp, page, router } from '@inertiajs/svelte'
import Default from "../layouts/default.svelte"
import Dashboard from "../layouts/dashboard.svelte"

import { setLocale } from '~/i18n/runtime'

$effect.root(() => {
  $effect(() => {
    if (page.props.locale) setLocale(page.props.locale)
  })
})

createInertiaApp({
  pages: "../pages",
  layout: (name) => name.startsWith('/dashboard') ? Dashboard : Default,
})

window.addEventListener('message', function(event) {
  if (event.data == 'logged-in') {
    router.reload()
  }
})