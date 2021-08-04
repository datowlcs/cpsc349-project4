import * as mockroblog from './mockroblog.js'
import * as utility from './util.js'

window.mockroblog = mockroblog
onBoot()
function onBoot() {
  const loggedIn = utility.isLoggedIn()
  if (loggedIn) {
    populateTimeline()
  } else { // If not logged in, take them back to the log-in page
    // https://stackoverflow.com/questions/16984943/how-to-get-the-directory-part-of-current-url-in-javascript/16985051
    window.location.replace(`${document.URL.substr(0, document.URL.lastIndexOf('/'))}/login.html`)
  }
}

// Buttons
const userBtn = document.getElementById('user-button')
const homeBtn = document.getElementById('home-button')
const publicBtn = document.getElementById('public-button')
const postBtn = document.getElementById('post-button')
const logoutBtn = document.getElementById('logout-button')

// Logout Button
logoutBtn.addEventListener('click', () => {
  utility.userLogout()
})

// Post Message Button
postBtn.addEventListener('click', () => {
  const postMsg = window.prompt('Please provide a post', 'Today I experienced...')
  if (postMsg !== '' && postMsg !== null) {
    const user = window.localStorage.getItem('userID')
    mockroblog.postMessage(user, postMsg)
    window.alert('You have posted a new message.')
  }
})

// User Timeline Button
userBtn.addEventListener('click', () => {
  const user = window.localStorage.getItem('username')
  if (user) {
    const timeline = mockroblog.getUserTimeline(user)
    appendPosts(timeline)
  }
})

// Home Timeline Button
homeBtn.addEventListener('click', () => {
  const user = window.localStorage.getItem('username')
  if (user) {
    appendPosts(mockroblog.getHomeTimeline(user))
  }
})

// Public Timeline Button
publicBtn.addEventListener('click', () => {
  appendPosts(mockroblog.getPublicTimeline())
})

function populateTimeline() {
  appendPosts(mockroblog.getPublicTimeline())
}

function appendPosts(timelineJson) {
  const posts = document.querySelector('#post-container')
  posts.innerHTML = ''
  for (const post of timelineJson) {
    /*
                <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                    <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                      <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Shooting Stars</h2>
                      <p class="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                      <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                </div>
        */
    const newPost = document.createElement('div')
    newPost.className = 'post-item'
    newPost.innerHTML = `<div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <img src="https://via.placeholder.com/150/0492C2/FFFFFF?text=${(mockroblog.getUserName(post.user_id))}" class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0"></img>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="post-username text-gray-900 text-lg title-font font-medium mb-2">${(mockroblog.getUserName(post.user_id))}</h2>
                <p class="leading-relaxed text-base">${post.text}</p>
                <a class="mt-3 text-black-500 inline-flex items-center">${post.timestamp}</a>
                <button class="hyperlink px-8 py-2" id="follow-button">Follow</button>
            </div>
        </div>
        `

    // Add follower
    const followBtn = newPost.children[0].children[1].children[3]
    followBtn.addEventListener('click', () => {
      const loggedInUser = window.localStorage.getItem('userID')
      if (followBtn.textContent === 'Follow') {
        if (loggedInUser && post.user_id) {
          mockroblog.addFollower(loggedInUser, post.user_id)
          console.log(`Added follower: ${post.user_id}`)
          updateTimeline(true, post.user_id)
        }
      } else if (followBtn.textContent === 'Unfollow') {
        if (loggedInUser && post.user_id) {
          mockroblog.removeFollower(loggedInUser, post.user_id)
          console.log(`Removed follower: ${post.user_id}`)
          updateTimeline(false, post.user_id)
        }
      }
    })
    posts.appendChild(newPost)
  }
}

function updateTimeline(follow, userID) {
  const postItems = document.querySelector('#post-container').getElementsByClassName('post-item')
  for (const postItem of postItems) {
    console.log(postItem.getElementsByClassName('post-username'))
    if (postItem.getElementsByClassName('post-username')[0].textContent === mockroblog.getUserName(userID)) {
      const followBtn = postItem.children[0].children[1].children[3]
      followBtn.textContent = (follow ? 'Unfollow' : 'Follow')
    }
  }
}
