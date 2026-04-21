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
  <h2>New upload</h2>
  <input type="file" {oninput} />
</main>
