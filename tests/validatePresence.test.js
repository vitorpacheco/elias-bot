const { v4: uuidv4 } = require('uuid');

const { validateNewPresence } = require('../src/validations.js');

const OLD_ENV = process.env;

afterAll(() => {
  process.env = OLD_ENV;
})

test('should return false if guild is undefined or null', () => {
  const presence = {
    guild: undefined,
    status: 'online'
  }

  expect(validateNewPresence(presence)).toBe(false)
})

test('should return false if guild id is not equals to env', () => {
  process.env.GUILD_ID = uuidv4()

  const presence = {
    guild: {
      id: uuidv4()
    },
    status: 'online'
  }

  expect(validateNewPresence(presence)).toBe(false)
})

test('should return false if the presence status is offline', () => {
  process.env.GUILD_ID = uuidv4()

  const presence = {
    guild: {
      id: process.env.GUILD_ID
    },
    status: 'offline'
  }

  expect(validateNewPresence(presence)).toBe(false)
})

test('should return true if the presence is ok', () => {
  process.env.GUILD_ID = uuidv4()

  const presence = {
    guild: {
      id: process.env.GUILD_ID
    },
    status: 'online'
  }

  expect(validateNewPresence(presence)).toBe(true)
})