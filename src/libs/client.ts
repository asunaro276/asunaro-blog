import { createClient } from 'newt-client-js'

function createEnvClient() {
  if (import.meta.env.MODE === "production") {
    return createClient({
      spaceUid: import.meta.env.SPACE_UID + '',
      token: import.meta.env.CDN_API_TOKEN + '',
      apiType: 'cdn',
    })
  } else if (import.meta.env.MODE === "development") {
    return createClient({
      spaceUid: import.meta.env.SPACE_UID + '',
      token: import.meta.env.API_TOKEN + '',
      apiType: 'api',
    })
  } else {
    throw new Error("想定されていない環境です")
  }
}

export const newtClient = createEnvClient()
