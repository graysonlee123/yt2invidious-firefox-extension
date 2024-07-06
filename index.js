// Called when the user clicks on the context menu item
function onClickHandler({ menuItemId, linkUrl }, tab) {
  if (menuItemId !== 'ytdinvidious') return

  console.log('My context menu item clicked!')
  console.log({ linkUrl })

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

/**
 * Extracts a YouTube video ID from a string input.
 *
 * Expects the input to be a URL string.
 *
 * @param {string} input The string to extract from.
 * @return {string} Video ID, or an empty string on failure.
 */
function extractVideoQueryParam(input) {
  if (typeof input !== 'string') return ''
  if (!URL.canParse(input)) return ''

  const url = new URL(input)
  const search = url.search

  const searchParams = new URLSearchParams(search)
  const videoID = searchParams.get('v')

  if (typeof videoID !== 'string') return ''

  return videoID
}

// Create the context menu item
browser.contextMenus.create({
  id: 'ytdinvidious',
  title: 'YT2Invidious',
  contexts: ['link'],
})

// Add a click event listener
browser.contextMenus.onClicked.addListener(onClickHandler)
