function failOnConsole() {
  const originalConsole = global.console.error
  beforeAll(() => {
    global.console.error = (message: string) => {
      throw Error(message)
    }
  })
  afterAll(() => {
    global.console.error = originalConsole
  })
}

failOnConsole()
