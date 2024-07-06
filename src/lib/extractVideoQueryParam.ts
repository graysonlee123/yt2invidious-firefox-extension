/**
 * Extracts a YouTube video ID from a string input.
 *
 * Expects the input to be a URL string.
 *
 * @param input The string to extract from.
 * @return Video ID, or an empty string on failure.
 */
export function extractVideoQueryParam(input: string) {
  if (!URL.canParse(input)) return ''

  const url = new URL(input)
  const search = url.search
  const searchParams = new URLSearchParams(search)
  const videoId = searchParams.get('v')

  return videoId === null ? '' : videoId
}
