import { createClient } from 'newt-client-js'

export const newtClient = createClient({
  spaceUid: import.meta.env.SPACE_UID + '',
  token: import.meta.env.CDN_API_TOKEN + '',
  apiType: 'cdn',
})

export const appUid = 'asunaroblog'
