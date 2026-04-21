<script>
  import * as m from '~/i18n/messages.js'
</script>

<main>
  <section class="h-full grid place-items-center">
    <div class="text-center w-full">
      <img src={"/keo-white.svg"} alt="Keo" class="opacity-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full -z-1">
      <h2 class="mt-12">{m['app.invite_only']()}</h2>
    </div>
  </section>
</main>

<style>
  img {
    filter: drop-shadow(0 0 2rem rgb(245, 253, 255));
  }
</style>