document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('options-form') as HTMLFormElement | null
  const input = document.getElementById('invidious-instance') as HTMLInputElement | null

  if (!form || !input) {
    throw new Error('Form element or input element not found, aborting!')
  }

  // Load saved options
  try {
    const result = await browser.storage.local.get()
    input.value = result.invidiousBaseUrl || ''
  } catch (error) {
    console.error('Error reading from browser local storage.', error)
    alert('Error reading from browser local storage.')
  }

  // Save options on form submit
  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
      await browser.storage.local.set({
        invidiousBaseUrl: input.value,
      })
    } catch (error) {
      console.error('Error saving form data to local storage.', error)
      alert('Error saving form data to local storage.')
    }
  })
})
