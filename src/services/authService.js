import { avatarUrl, mockUsers } from '../data/mockUsers'

const TOKEN_KEY = 'token'
const USER_KEY = 'mockUser'
const REGISTERED_USERS_KEY = 'registeredUsers'
const USER_OVERRIDES_KEY = 'mockUserOverrides'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function toPublicUser(user) {
  const publicUser = { ...user }
  delete publicUser.password
  return publicUser
}

function parseStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    localStorage.removeItem(key)
    return fallback
  }
}

function getRegisteredUsers() {
  return parseStoredJson(REGISTERED_USERS_KEY, [])
}

function getUserOverrides() {
  return parseStoredJson(USER_OVERRIDES_KEY, {})
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
}

function saveUserOverrides(overrides) {
  localStorage.setItem(USER_OVERRIDES_KEY, JSON.stringify(overrides))
}

function applyUserOverride(user) {
  const override = getUserOverrides()[user.id]
  return override ? { ...user, ...override } : user
}

function getAllUsers() {
  return [...mockUsers.map(applyUserOverride), ...getRegisteredUsers()]
}

function persistSession(user) {
  const token = `mock-token-${user.id}`
  const publicUser = toPublicUser(user)
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(publicUser))
  return { access_token: token, user: publicUser }
}

function getCurrentPublicUser() {
  return parseStoredJson(USER_KEY, null)
}

function persistUserUpdate(updatedUser) {
  const registeredUsers = getRegisteredUsers()
  const registeredIndex = registeredUsers.findIndex(
    (user) => user.id === updatedUser.id,
  )

  if (registeredIndex >= 0) {
    registeredUsers[registeredIndex] = updatedUser
    saveRegisteredUsers(registeredUsers)
  } else {
    const overrides = getUserOverrides()
    overrides[updatedUser.id] = {
      ...(overrides[updatedUser.id] || {}),
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      password: updatedUser.password,
      profilePic: updatedUser.profilePic,
    }
    saveUserOverrides(overrides)
  }

  return persistSession(updatedUser).user
}

function getCurrentFullUser() {
  const currentUser = getCurrentPublicUser()

  if (!currentUser) {
    const error = new Error('Unauthorized')
    error.response = { status: 401, data: { error: 'Unauthorized' } }
    throw error
  }

  return getAllUsers().find((user) => user.id === currentUser.id)
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

  const registered = getRegisteredUsers()
  registered.push(newUser)
  saveRegisteredUsers(registered)

  return persistSession(newUser)
}

export async function updateProfile({ name, username, email, profilePic }) {
  await delay(400)

  const currentUser = getCurrentFullUser()
  const users = getAllUsers()

  if (users.some((user) => user.id !== currentUser.id && user.email === email)) {
    const error = new Error('Email is already registered')
    error.response = { data: { error: 'Email is already registered' } }
    throw error
  }

  if (
    users.some((user) => user.id !== currentUser.id && user.username === username)
  ) {
    const error = new Error('Username is already taken')
    error.response = { data: { error: 'Username is already taken' } }
    throw error
  }

  return persistUserUpdate({
    ...currentUser,
    name,
    username,
    email,
    profilePic: profilePic || avatarUrl(name, '2B6CB0'),
  })
}

export async function resetPassword({ currentPassword, newPassword }) {
  await delay(400)

  const currentUser = getCurrentFullUser()

  if (currentUser.password !== currentPassword) {
    const error = new Error('Current password is incorrect')
    error.response = { data: { error: 'Current password is incorrect' } }
    throw error
  }

  return persistUserUpdate({
    ...currentUser,
    password: newPassword,
  })
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

export function getStoredUser() {
  if (!getStoredToken()) return null
  return getCurrentPublicUser()
}
