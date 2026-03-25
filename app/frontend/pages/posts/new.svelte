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
  <p>{m["app.title"]()}</p>

  <input type="file" {oninput} />
</main>
