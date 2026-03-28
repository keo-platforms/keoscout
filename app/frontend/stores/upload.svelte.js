let rememberedFile = null

export function rememberFileForUpload(file) {
  rememberedFile = file ?? null
}

export function uploadRememberedFile(attachURL) {
  if (!rememberedFile) return null
  const file = rememberedFile
  rememberedFile = null
  return upload(file, attachURL)
}

export function upload(file, attachURL) {
  const state = $state({
    fileName: file?.name ?? null,
    status: file ? 'idle' : 'empty',
    progress: 0,
    error: null,
    file: null,
  })

  if (file) {
    state.status = 'uploading'
    state.progress = 0
    state.error = null

    state.task = createDirectUpload(file, state)
      .then((blob) => {
        state.status = 'attaching'
        state.progress = 100

        return fetch(attachURL, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken(),
          },
          credentials: 'same-origin',
          body: JSON.stringify({ signed_blob_id: blob.signed_id }),
        })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not attach uploaded file to post')
        }

        return response.json()
      })
      .then((file) => {
        state.file = file ?? null
        state.status = 'complete'
        state.progress = 100
        return Promise.resolve(file)
      })
      .catch((error) => {
        state.status = 'error'
        state.error = error instanceof Error ? error.message : 'Upload failed'
      })
  }

  return state
}

async function createDirectUpload(file, state) {
  const { DirectUpload } = await import('@rails/activestorage')

  return new Promise((resolve, reject) => {
    const directUpload = new DirectUpload(file, '/rails/active_storage/direct_uploads', {
      directUploadWillStoreFileWithXHR(xhr) {
        xhr.upload.addEventListener('progress', (event) => {
          if (!event.lengthComputable) {
            return
          }

          state.progress = Math.round((event.loaded / event.total) * 100)
        })
      },
    })

    directUpload.create((error, blob) => {
      if (error) {
        reject(error)
        return
      }

      resolve(blob)
    })
  })
}

function csrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content ?? ''
}