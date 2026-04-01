<script>
  import { setLocale } from '~/i18n/runtime'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '../styles/default.css'
  
  import { login } from '~/lib/auth.js'
  
  const { children, locale } = $props()
  
  // svelte-ignore state_referenced_locally
  setLocale(locale)
</script>

<header class="py-2">
  <a href="/">
    <img src="~/assets/logo.svg" alt="Keo" class="h-12">
  </a>
  <button class="btn" onclick={login}>
    Log in
  </button>
</header>

{@render children?.()}

<footer>
  <p>
    © 2026 Keo Platforms | <a href="/legal">Legal Information</a>
  </p>
</footer>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>