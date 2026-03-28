<script>
  import { useForm } from '@inertiajs/svelte'
  import { uploadRememberedFile } from '../../stores/upload.svelte.js'

  const { post } = $props()
  // svelte-ignore state_referenced_locally
  const form = useForm(post)
  // svelte-ignore state_referenced_locally
  let files = $state(post.files ?? [])

  // svelte-ignore state_referenced_locally
  const uploadState = uploadRememberedFile(`/posts/${post.id}/attach_file`)
  uploadState?.task.then(function(file) {
    files = [...files, file]
  })

  const presetPrices = ['25000', '50000', '100000']
  const initialPrice = String(form.price ?? '')
  const hasInitialPaidPrice = initialPrice !== '' && initialPrice !== '0'
  const initialPaidPriceInput = hasInitialPaidPrice ? initialPrice : '25000'
  let selectedMode = $state(hasInitialPaidPrice ? 'paid' : 'free')
  let paidPriceInput = $state(initialPaidPriceInput)
  let selectedPreset = $state(presetPrices.includes(initialPaidPriceInput) ? initialPaidPriceInput : '')

  function selectFree() {
    selectedMode = 'free'
  }

  function selectPaid() {
    selectedMode = 'paid'
    if (!paidPriceInput) {
      paidPriceInput = '25000'
    }
  }

  function setPreset(value) {
    selectedMode = 'paid'
    paidPriceInput = value
    selectedPreset = value
  }

  $effect(() => {
    if (selectedMode === 'free') {
      form.price = '0'
      return
    }

    const value = String(paidPriceInput ?? '')
    form.price = value
    selectedPreset = presetPrices.includes(value) ? value : ''
  })
</script>

<main>
<section class="upload-status">
  <h2>
    Set a price to unlock this post.
  </h2>
  {#if files.length > 0}
    <h3>Attached files</h3>
    <ul>
      {#each files as file}
        <li>{file.filename}</li>
      {/each}
    </ul>
  {/if}
  
  {#if uploadState?.status === 'uploading' || uploadState?.status === 'attaching'}
    <h3>Uploading...</h3>
    <p>{uploadState.fileName}</p>
    <progress value={uploadState.progress} max="100">
      {uploadState.progress}%
    </progress>
    {#if uploadState.status === 'attaching'}
      <p>Finalizing upload...</p>
    {/if}

    {#if uploadState.error}
      <p class="upload-error">{uploadState.error}</p>
    {/if}
  {/if}
</section>
<section>

  <div class="mode-grid">
    <div class="mode-card" class:active={selectedMode === 'free'}>
      <button
        type="button"
        class="mode-trigger"
        onclick={selectFree}
      >
        Free
      </button>
    </div>
    
    <div class="mode-card" class:active={selectedMode === 'paid'}>
      <button
        type="button"
        class="mode-trigger"
        onclick={selectPaid}
      >
        Set a price
      </button>
      
      {#if selectedMode === 'paid'}
      <div class="mode-panel">
        <input
        class="amount-input"
        type="number"
        min="0"
        step="1000"
        placeholder="Enter amount"
        bind:value={paidPriceInput}
        >
        
        <div class="preset-buttons">
          <button
              type="button"
              class="preset-button"
              class:active={selectedPreset === '25000'}
              onclick={() => setPreset('25000')}
            >
              25,000
            </button>
            <button
              type="button"
              class="preset-button"
              class:active={selectedPreset === '50000'}
              onclick={() => setPreset('50000')}
            >
              50,000
            </button>
            <button
              type="button"
              class="preset-button"
              class:active={selectedPreset === '100000'}
              onclick={() => setPreset('100000')}
            >
              100,000
            </button>
          </div>
        </div>
        {/if}
      </div>
    </div>
  </section>

  <button class="btn" onclick={() => form.put(`/posts/${post.id}`)}>Save</button>
</main>

<style>
  .mode-grid {
    display: grid;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .mode-card {
    border: 1px solid #d6dae1;
    border-radius: 0.8rem;
    background: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .mode-card.active {
    border-color: #3f6ff4;
    box-shadow: 0 0 0 3px rgba(63, 111, 244, 0.12);
  }

  .mode-trigger {
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    padding: 0.9rem 1rem;
    font-size: 1rem;
    font-weight: 700;
    color: #1f2937;
    cursor: pointer;
  }

  .mode-trigger:focus-visible {
    outline: none;
  }

  .mode-panel {
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .amount-input {
    width: 100%;
    border: 1px solid #c9cfdb;
    border-radius: 0.75rem;
    padding: 0.75rem 0.9rem;
    font-size: 1rem;
    background: #fff;
    color: #1f2937;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .amount-input:focus {
    outline: none;
    border-color: #3f6ff4;
    box-shadow: 0 0 0 3px rgba(63, 111, 244, 0.12);
  }

  .preset-buttons {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
  }


  .upload-error {
    color: #b91c1c;
    font-weight: 600;
  }

  .preset-button {
    border: 1px solid #d6dae1;
    background: #fff;
    border-radius: 0.65rem;
    padding: 0.62rem 0.7rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .preset-button:hover {
    border-color: #a0a8b8;
    transform: translateY(-1px);
  }

  .preset-button.active {
    border-color: #3f6ff4;
    color: #2044a8;
    box-shadow: 0 0 0 3px rgba(63, 111, 244, 0.12);
  }

  .preset-button:focus-visible {
    outline: none;
    border-color: #3f6ff4;
    box-shadow: 0 0 0 3px rgba(63, 111, 244, 0.12);
  }

  @media (max-width: 640px) {
    .preset-buttons {
      grid-template-columns: 1fr;
    }
  }
</style>