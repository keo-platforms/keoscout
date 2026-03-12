<script>
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '~/styles/default.css'

  const { children } = $props()
</script>

{@render children?.()}