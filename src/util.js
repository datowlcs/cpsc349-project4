export function isLoggedIn () {
  const username = window.localStorage.getItem('username')
  const userID = window.localStorage.getItem('userID')
  if (userID && username) {
    return userID
  } else {
    return null
  }
}

export function userLogout () {
  if (isLoggedIn()) {
    window.localStorage.removeItem('userID')
    window.localStorage.removeItem('username')
    window.location.replace(`${document.URL.substr(0, document.URL.lastIndexOf('/'))}/login.html`)
    return true
  }
  return false
}
