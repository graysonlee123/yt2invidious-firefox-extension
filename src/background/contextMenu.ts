import { extractVideoQueryParam } from '../lib/extractVideoQueryParam'

// Called when the user clicks on the context menu item
async function onClickHandler(
  { menuItemId, linkUrl }: browser.contextMenus.OnClickData,
  tab?: browser.tabs.Tab
) {
  if (menuItemId !== 'ytdinvidious') return

  if (!linkUrl) {
    console.log('No `linkUrl` was found.')
    return
  }

  const videoId = extractVideoQueryParam(linkUrl)

  if (videoId.length < 1) {
    console.log('No video ID was found.')
    return
  }

  let baseUrl = ''

  try {
    const storage = await browser.storage.local.get('invidiousBaseUrl')
    const storedBaseUrl = storage.invidiousBaseUrl

    if (typeof storedBaseUrl !== 'string' || storedBaseUrl === '') {
      throw new Error()
    }

    baseUrl = storedBaseUrl
  } catch (error) {
    console.error('Error reading base URL from browser local storage.', error)
    return
  }

  try {
    await browser.tabs.create({
      url: baseUrl + '/watch?v=' + videoId,
    })
  } catch (error) {
    console.error('Error creating new tab.', error)
  }
}

// Create the context menu item
browser.contextMenus.create({
  id: 'ytdinvidious',
  title: 'YT2Invidious',
  contexts: ['link'],
})

// Add a click event listener
browser.contextMenus.onClicked.addListener(onClickHandler)
