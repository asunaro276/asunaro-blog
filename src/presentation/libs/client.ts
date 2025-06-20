import { createClient } from 'newt-client-js'

function createEnvClient() {
  if (process.env.NODE_ENV === "production") {
    return createClient({
      spaceUid: Bun.env.SPACE_UID + '',
      token: Bun.env.CDN_API_TOKEN + '',
      apiType: 'cdn',
    })
  } else if (process.env.NODE_ENV === "development") {
    return createClient({
      spaceUid: Bun.env.SPACE_UID + '',
      token: Bun.env.API_TOKEN + '',
      apiType: 'api',
    })
  } else {
    throw new Error("想定されていない環境です")
  }
}

export const newtClient = createEnvClient()
