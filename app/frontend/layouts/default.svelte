<script>
  import { setLocale } from '~/i18n/runtime'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '../styles/default.css'

  const { children, locale } = $props()
  setLocale(locale)
</script>

<header>
  <img src="~/assets/logo.svg" alt="Keo">
</header>

{@render children?.()}

<footer>
  <p>
    © 2026 Keo Platforms | <a href="/legal" class="underline">Legal Information</a>

  </p>
</footer>