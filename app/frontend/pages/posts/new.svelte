<script>
  import * as m from '~/i18n/messages.js'

  import { router } from '@inertiajs/svelte'
  import { rememberFileForUpload } from '~/stores/upload.svelte.js'

  function oninput(e) {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    rememberFileForUpload(file)
    router.post('/posts')
  }
</script>

<main>
  <h1>Turn your passion into income</h1>
  <h2>Start with your first photo</h2>
  <input type="file" {oninput} />
</main>
