exports.validateNewPresence = (presence) => {
  if (presence.guild === undefined || presence.guild === null) {
    return false
  }

  if (presence.guild.id != process.env.GUILD_ID) {
    return false
  }

  if (presence.status == 'offline') {
    return false
  }

  return true
}

exports.checkUserIsElias = (presence) => presence.user.username == process.env.BRASH_USERNAME &&
  presence.user.discriminator == process.env.BRASH_DISCRIMINATOR

