async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
    console.log('Mocking enabled on server')
  } else {
    const { worker } = await import('./browser')
    worker.start({ onUnhandledRequest: 'bypass' })
  }
}

initMocks()

export {}
