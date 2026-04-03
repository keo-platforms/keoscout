<script>
  import * as m from '~/i18n/messages.js'

</script>

<main>
  <section class="h-full grid place-items-center">
    <div class="text-center w-full">
      <img src={"/keo-white.svg"} alt="Keo">
      <p class="mt-6">{m['app.invite_only']()}</p>
    </div>
  </section>
</main>

<style>
  img {
    filter: drop-shadow(0 0 2rem rgb(195, 195, 195));
  }
</style>