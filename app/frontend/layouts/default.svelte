<script>
  import { setLocale } from '~/i18n/runtime'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '../styles/default.css'

  const { children, locale } = $props()
  setLocale(locale)
</script>

<header class="py-2">
  <a href="/">
    <img src="~/assets/logo.svg" alt="Keo" class="h-12">
  </a>
</header>

{@render children?.()}

<footer>
  <p>
    © 2026 Keo Platforms | <a href="/legal">Legal Information</a>
  </p>
</footer>