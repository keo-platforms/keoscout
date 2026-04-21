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

<nav>
  <a href="/">
    Home
  </a>
</nav>

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