<script>
  import { login } from '~/lib/auth.js'
  const { children } = $props()
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
    Proudly made in Vietnam 🇻🇳 | <a href="/legal">About KeoScout</a>
  </p>
</footer>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>