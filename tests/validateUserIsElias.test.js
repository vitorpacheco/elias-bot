const { v4: uuidv4 } = require('uuid');

const { checkUserIsElias } = require('../src/validations.js');

const OLD_ENV = process.env;

afterAll(() => {
  process.env = OLD_ENV;
})

test('should return false if the user is not elias', () => {
  process.env.BRASH_USERNAME = uuidv4()
  process.env.BRASH_DISCRIMINATOR = uuidv4()

  const presence = {
    user: {
      username: uuidv4(),
      discriminator: uuidv4()
    },
    status: 'online'
  }

  expect(checkUserIsElias(presence)).toBe(false)
})

test('should return true if the user is elias', () => {
  process.env.BRASH_USERNAME = uuidv4()
  process.env.BRASH_DISCRIMINATOR = uuidv4()

  const presence = {
    user: {
      username: process.env.BRASH_USERNAME,
      discriminator: process.env.BRASH_DISCRIMINATOR
    },
    status: 'online'
  }

  expect(checkUserIsElias(presence)).toBe(true)
})