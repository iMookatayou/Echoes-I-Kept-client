import { avatarUrl, mockUsers } from '../data/mockUsers'

const TOKEN_KEY = 'token'
const USER_KEY = 'mockUser'
const REGISTERED_USERS_KEY = 'registeredUsers'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function toPublicUser(user) {
  const publicUser = { ...user }
  delete publicUser.password
  return publicUser
}

function getAllUsers() {
  const registered = JSON.parse(
    localStorage.getItem(REGISTERED_USERS_KEY) || '[]',
  )
  return [...mockUsers, ...registered]
}

function persistSession(user) {
  const token = `mock-token-${user.id}`
  const publicUser = toPublicUser(user)
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(publicUser))
  return { access_token: token }
}

export async function login({ email, password }) {
  await delay(500)

  const user = getAllUsers().find(
    (u) => u.email === email && u.password === password,
  )

  if (!user) {
    const error = new Error('Invalid email or password')
    error.response = { data: { error: 'Invalid email or password' } }
    throw error
  }

  return persistSession(user)
}

export async function signup({ name, username, email, password }) {
  await delay(500)

  const users = getAllUsers()

  if (users.some((u) => u.email === email)) {
    const error = new Error('Email is already registered')
    error.response = { data: { error: 'Email is already registered' } }
    throw error
  }

  if (users.some((u) => u.username === username)) {
    const error = new Error('Username is already taken')
    error.response = { data: { error: 'Username is already taken' } }
    throw error
  }

  const newUser = {
    id: Date.now(),
    name,
    username,
    email,
    password,
    role: 'user',
    profilePic: avatarUrl(name, '2B6CB0'),
  }

  const registered = JSON.parse(
    localStorage.getItem(REGISTERED_USERS_KEY) || '[]',
  )
  registered.push(newUser)
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registered))

  return persistSession(newUser)
}

export async function getUser() {
  await delay(300)

  const token = localStorage.getItem(TOKEN_KEY)
  const stored = localStorage.getItem(USER_KEY)

  if (!token || !stored) {
    const error = new Error('Unauthorized')
    error.response = { status: 401, data: { error: 'Unauthorized or token expired' } }
    throw error
  }

  return JSON.parse(stored)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY)
}
