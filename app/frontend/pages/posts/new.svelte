<script>
  import * as m from '~/i18n/messages.js'

  import { useForm } from '@inertiajs/svelte'

  const form = useForm({
    image: null
  })

  function oninput(e) {
    form.image = e.target.files[0]
    form.post('/posts')
  }
</script>

<main>
  <p>{m["app.title"]()}</p>

  <input type="file" {oninput} />
  {#if form.progress}
    <progress value={form.progress.percentage} max="100">
        {form.progress.percentage}%
    </progress>
  {/if}
</main>
