const fetch = require('node-fetch')
const bot = require('./discordbot')
const formatter = require('./user')

module.exports = (config) => {
  const app = bot(config)

  async function saveCached (element) {
    const user = await app.fetchUser(element.id || element._id)
    element.username = user.username
    element.discriminator = user.discriminator
    if (user &&
      (user.avatar !== element.avatar ||
        !(element.avatarBuffer && element.avatarBuffer.contentType))) {
      const response = await fetch(formatter.avatarFormat(user))
      const image = Buffer.from(await response.buffer())
      element.avatarBuffer = {
        contentType: response.headers.get('content-type'),
        data: image.toString('base64')
      }
      element.avatar = user.avatar
    }
    return element
  }

  return {
    saveCached
  }
}
