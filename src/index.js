import * as mockroblog from './mockroblog.js'
import * as utility from './util.js'

// Buttons
const userBtn = document.getElementById('user-button')
const homeBtn = document.getElementById('home-button')
const publicBtn = document.getElementById('public-button')
const postBtn = document.getElementById('post-button')
const logoutBtn = document.getElementById('logout-button')
const pollBtn = document.getElementById('poll-button')
const pollTimelineBtn = document.getElementById('polls-timeline-button')
const pollSubmitBTn = document.getElementById('poll-submit-button')

//Poll Display
var modal = document.getElementById("myModal");
pollBtn.addEventListener('click', async () => {
  modal.style.display = "block";
})
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Submit Poll
pollSubmitBTn.addEventListener('click', async () => {
  modal.style.display = "none";
  //Odd error check, but just to see if we can post
  let question = document.getElementById("poll-question").value;
  let answer1 = document.getElementById("answer-1").value;
  let answer2 = document.getElementById("answer-2").value;
  let answer3 = document.getElementById("answer-3").value;
  let answer4 = document.getElementById("answer-4").value;
  let userID = window.localStorage.getItem('userID')
  console.log(question);
  console.log(userID);
  if (question != '') {
    let questionResponse = await mockroblog.createPoll(userID, question, [answer1, answer2, answer3, answer4]);
    alert("Submitted poll")
  }
  // console.log(questionResponse);
});

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

// Logout Button
logoutBtn.addEventListener('click', () => {
  utility.userLogout()
})

// Post Message Button
postBtn.addEventListener('click', async () => {
  const postMsg = window.prompt('Please provide a post', 'Today I experienced...')
  if (postMsg !== '' && postMsg !== null) {
    const user = window.localStorage.getItem('userID')
    await mockroblog.postMessage(user, postMsg)
    //window.alert('You have posted a new message.')
    console.log('You have posted a new message.')
  }
})

// User Timeline Button
userBtn.addEventListener('click', async () => {
  const user = window.localStorage.getItem('username')
  console.log(user);
  if (user) {
    const timeline = await mockroblog.getUserTimeline(user)
    appendPosts(timeline)
  }
})

// Home Timeline Button
homeBtn.addEventListener('click', async () => {
  const user = window.localStorage.getItem('username')
  if (user) {
    appendPosts(await mockroblog.getHomeTimeline(user))
  }
})

// Public Timeline Button
publicBtn.addEventListener('click', async () => {
  const timelineJson = await mockroblog.getPublicTimeline()
  appendPosts(timelineJson)
})

// Poll Timeline Button
pollTimelineBtn.addEventListener('click', async () => {
  console.log("button click");
  let polls = await mockroblog.getPolls();
  console.log("button2 click");
  // console.log("polls", polls);
  appendPolls(polls)
})

async function populateTimeline() {
  appendPosts(await mockroblog.getPublicTimeline())
}

async function appendPolls(polls) {
  console.log("Appending polls", polls);
  const posts = document.querySelector('#post-container')

  posts.innerHTML = ''
  let i = 0;
  for (let poll of polls) {
    console.log("Appending poll", poll);
    let pollUserID = await mockroblog.getUserIDByPollID(poll.poll_id);
    let pollUser = await mockroblog.getUserName(pollUserID);

    console.log("pollUser", pollUser)
    const newPoll = document.createElement('div')

    newPoll.className = 'post-item'

    newPoll.innerHTML = `
        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <img src="https://via.placeholder.com/150/0492C2/FFFFFF?text=${pollUser.username}" class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0"></img>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="post-username text-gray-900 text-lg title-font font-medium mb-2">${(pollUser.username)}</h2>
                <p class="leading-relaxed text-base">${poll.poll_question}</p>
                <input type="radio" id="poll-${i}-option1" name="poll-option-choice${i}" value="">
                <label for="poll-${i}-option1">${poll.poll_options[0]}</label><br>
                <input type="radio" id="poll-${i}-option2" name="poll-option-choice${i}" value="">
                <label for="poll-${i}-option2">${poll.poll_options[1]}</label><br>
                <input type="radio" id="poll-${i}-option3" name="poll-option-choice${i}" value="">
                <label for="poll-${i}-option3">${poll.poll_options[2]}</label><br>
                <input type="radio" id="poll-${i}-option4" name="poll-option-choice${i}" value="">
                <label for="poll-${i}-option4">${poll.poll_options[3]}</label><br>
                <button class="hyperlink px-8 py-2" id="submit-poll-option-button">Submit</button>

            </div>
        </div>
        `
    posts.appendChild(newPoll)
    i++;
    console.log("New child")
  }

}

async function appendPosts(timelineJson) {
  const posts = document.querySelector('#post-container')
  posts.innerHTML = ''

  const loggedInUserID = window.localStorage.getItem('userID')
  const followingList = await mockroblog.getFollowing(loggedInUserID);

  let promiseLikes = [];
  for (const tmp of timelineJson) {

  }

  let promises = [];
  let uniqueIDs = [];
  for (const tmp of timelineJson) {
    promiseLikes.push(mockroblog.getLikesByPostID(tmp.id))
    if (uniqueIDs.indexOf(tmp.user_id) == -1) {
      promises.push(mockroblog.getUserName(tmp.user_id));
    }

  }
  let likes = await Promise.all(promiseLikes);
  console.log(likes);
  let users = await Promise.all(promises);
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
    const postUser = users.find(user => user.id === post.user_id);
    const newPost = document.createElement('div')

    const likesArr = likes.find(likes => (likes.length > 0 && likes[0].post_id === post.id));
    let likedByUser;

    if (likesArr) {
      likedByUser = likesArr.find(l => l.user_id == loggedInUserID);
    }
    console.log("myUserLikes", likedByUser);

    newPost.className = 'post-item'
    newPost.innerHTML = `
        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <img src="https://via.placeholder.com/150/0492C2/FFFFFF?text=${postUser.username}" class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0"></img>
            <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                <h2 class="post-username text-gray-900 text-lg title-font font-medium mb-2">${(postUser.username)}</h2>
                <p class="leading-relaxed text-base">${post.text}</p>
                <a class="mt-3 text-black-500 inline-flex items-center">${post.timestamp}</a>
                <button class="hyperlink px-8 py-2" id="follow-button"></button>
                <button class="hyperlink px-8 py-2" id="like-button">${likedByUser ? "Unlike" : "Like"}: ${likesArr ? likesArr.length : "0"}</button>
            </div>
        </div>
        `

    //Like a post
    const likeBtn = newPost.children[0].children[1].children[4];
    likeBtn.addEventListener('click', async () => {

      const loggedInUser = window.localStorage.getItem('userID')
      if (likeBtn.textContent.indexOf("Unlike") != -1) { //Is Unlike

        await mockroblog.removeLike(loggedInUser, post.id)
        updateLikes(post, likeBtn);
      } else { //Button says Like
        await mockroblog.addLike(loggedInUser, post.id)
        updateLikes(post, likeBtn);
      }

    });

    // Add follower
    if (postUser.id != window.localStorage.getItem('userID')) {
      const followBtn = newPost.children[0].children[1].children[3];
      let isFollowing = followingList.find(follower => follower.following_id === postUser.id);
      if (isFollowing) {
        followBtn.textContent = "Unfollow";
      } else {
        followBtn.textContent = "Follow"
      }



      followBtn.addEventListener('click', async () => {
        const loggedInUser = window.localStorage.getItem('userID');
        if (followBtn.textContent === 'Follow') {
          if (loggedInUser && post.user_id) {
            try {
              await mockroblog.addFollower(loggedInUser, post.user_id)
              console.log(`Added follower: ${post.user_id}`)
              followBtn.textContent = "Follow"
              updateTimeline(true, postUser.username)
            }
            catch (err) {
              console.log(err)
            }

          }
        } else if (followBtn.textContent === 'Unfollow') {
          if (loggedInUser && post.user_id) {
            await mockroblog.removeFollower(loggedInUser, post.user_id)
            console.log(`Removed follower: ${post.user_id}`)
            updateTimeline(false, postUser.username)
          }
        }
      })
    }
    posts.appendChild(newPost)
  }
}

async function updateTimeline(follow, username) {
  const postItems = document.querySelector('#post-container').getElementsByClassName('post-item')
  for (const postItem of postItems) {
    if (postItem.getElementsByClassName('post-username')[0].textContent === username) {
      const followBtn = postItem.children[0].children[1].children[3]
      followBtn.textContent = (follow ? 'Unfollow' : 'Follow')
    }
  }
}

async function updateLikes(post, likeBtn) {
  const loggedInUser = window.localStorage.getItem('userID');
  let likes = await mockroblog.getLikesByPostID(post.id);
  const likedByUser = likes.find(like => (like.user_id == loggedInUser));
  console.log("Updating likes on post:", `${likes ? likes.length : "no likes"}`)

  likeBtn.innerHTML = `${likedByUser ? "Unlike" : "Like"}: ${likes ? likes.length : "0"}`

}
