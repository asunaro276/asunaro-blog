import { createClient } from 'newt-client-js'

export const newtClient = createClient({
  spaceUid: process.env.SPACE_UID + '',
  token: process.env.CDN_API_TOKEN + '',
  apiType: 'cdn',
})
