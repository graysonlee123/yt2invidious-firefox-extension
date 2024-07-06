import { extractVideoQueryParam } from './lib/extractVideoQueryParam'

// Called when the user clicks on the context menu item
function onClickHandler(
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

  // TODO determine promise result
  browser.tabs.create({
    url: 'https://invidious.net/watch?v=' + videoId,
  })
}

// Create the context menu item
browser.contextMenus.create({
  id: 'ytdinvidious',
  title: 'YT2Invidious',
  contexts: ['link'],
})

// Add a click event listener
browser.contextMenus.onClicked.addListener(onClickHandler)
