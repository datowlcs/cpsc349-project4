/* Mockroblog client API stubs for prototyping */
export async function createUser(username, email, password) {
  try {
    let response = await fetch("http://localhost:5000/users/", {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    let json = await response.json();
    // console.log(json);
    return json;
  } catch (err) {
    console.log(err);
    return null;
  }

}

export async function authenticateUser(username, password) {
  const response = await fetch(`http://localhost:5000/users/?username=${username}&password=${password}`, {
    method: 'GET'
  })

  const user = await response.json()

  if (!response.ok) {
    alert('Invald Request. Please try again.')
    return null
  }
  console.log(user.resources[0]);
  return user.resources[0]
}

export async function getUserName(userID) {
  const response = await fetch(`http://localhost:5000/users/?id=${userID}`, {
    method: 'GET'
  })
  // console.log(response);

  const user = await response.json()

  if (!response.ok) {
    alert('Invald Request. Please try again.')
    return null
  }

  return user.resources[0]
}

export async function getFollowing(userID) {
  const response = await fetch(`http://localhost:5000/followers/?follower_id=${userID}`)
  const followingList = await response.json()
  return followingList.resources
}

export async function getFollowers(userID) {
  const response = await fetch(`http://localhost:5000/followers/?following_id=${userID}`)
  const followerList = await response.json()
  return followerList.resources
}

export async function getLikes() {
  const response = await fetch('http://localhost:5000/likes/')
  const likesList = await response.json()
  return likesList.resources
}

export async function getLikesByPostID(postID) {
  const response = await fetch(`http://localhost:5000/likes/?post_id=${postID}`)
  const likesList = await response.json()
  return likesList.resources
}

export async function addFollower(userId, userIdToFollow) {
  try {
    const data = {
      follower_id: userId,
      following_id: userIdToFollow
    }

    const request = await fetch('http://localhost:5000/followers/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await request.json()

    // console.log(json)

    return json
  } catch (err) {
    console.error(err)
    return null
    // throw err
  }

  // if (userId > 3) {
  //   return {
  //     id: 6,
  //     follower_id: userId,
  //     following_id: userIdToFollow
  //   }
  // }
}

export async function addLike(userId, postId) {
  try {
    const data = {
      user_id: userId,
      post_id: postId
    }

    const request = await fetch('http://localhost:5000/likes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    // console.log(request)
    return request.ok
  } catch (err) {
    console.error(err)
    return null
    // throw err
  }
}

export async function removeLike(userId, postId) {
  try {
    const getLikeObject = await fetch(`http://localhost:5000/likes/?post_id=${postId}&user_id=${userId}`)
    const jsonObj = await getLikeObject.json()

    // console.log(jsonObj.resources);
    const data = {
      id: jsonObj.resources[0].id,
      post_id: postId,
      user_id: userId
    }

    const request = await fetch(`http://localhost:5000/likes/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return request.ok
  } catch (err) {
    console.error(err)
    return null
    // throw err
  }
}

export async function removeFollower(userId, userIdToStopFollowing) {
  try {
    const getFollowerObject = await fetch(`http://localhost:5000/followers/?follower_id=${userId}&following_id=${userIdToStopFollowing}`)
    const jsonObj = await getFollowerObject.json()

    const data = {
      id: jsonObj.resources[0].id,
      follower_id: userId,
      following_id: userIdToStopFollowing
    }

    const request = await fetch(`http://localhost:5000/followers/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return request.ok
  } catch (err) {
    console.error(err)
    return null
    // throw err
  }
}

export async function getUser(username) {
  const response = await fetch(`http://localhost:5000/users/?username=${username}`)
  const user = await response.json()
  return user.resources[0]
}

export async function getUserTimeline(username) {
  const user = await getUser(username)
  // console.log(user);
  const response = await fetch(`http://localhost:5000/posts/?user_id=${(user.id)}&sort=-timestamp`)

  const userTimeline = await response.json()
  return userTimeline.resources
}

export async function getPublicTimeline() {
  const response = await fetch('http://localhost:5000/posts/?sort=-timestamp')

  const json = await response.json()

  return json.resources
}

// Home timeline is everyone the current logged in user is following. All of their posts.
export async function getHomeTimeline(username) {
  const loggedInUser = await getUser(username)
  // console.log(loggedInUser);
  const response = await fetch(`http://localhost:5000/followers/?follower_id=${loggedInUser.id}`)
  const followingList = await response.json()
  // get posts of all followingUsers
  const promises = []
  for (const follower of followingList.resources) {
    const response = await fetch(`http://localhost:5000/posts/?user_id=${(follower.following_id)}&sort=-timestamp`)
    promises.push(response)
  }
  const posts = await Promise.all(promises)
  const jsonPromises = []
  for (const post of posts) {
    jsonPromises.push(await post.json())
  }
  const jsonPosts = await Promise.all(jsonPromises)
  const allPosts = []
  for (const jsonPost of jsonPosts) {
    // console.log(jsonPost.resources);
    for (const resource of jsonPost.resources) {
      allPosts.push(resource)
    }
  }

  // https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
  allPosts.sort(function (x, y) {
    return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
  })
  // console.log(allPosts);

  return allPosts
}

export async function postMessage(userId, text) {
  try {
    const data = {
      user_id: userId,
      text: text
    }

    const request = await fetch('http://localhost:5000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    // console.log(request)
    const json = await request.json()
    return json
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function createPoll(userID, message, optionsArr) {
  try {
    const data = {
      user_id: userID,
      question: message
    }

    const request = await fetch('http://localhost:5000/polls/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await request.json()
    // console.log('json', json)
    // console.log('options', optionsArr)
    for (const option of optionsArr) {
      const optionsData = {
        poll_id: json.id,
        text: option
      }
      const optionsRequest = await fetch('http://localhost:5000/poll_options/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(optionsData)
      })
    }
    return json
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getPolls() {
  try {
    const polls = await fetch('http://localhost:5000/polls')
    const result = []
    const pollsList = await polls.json()

    // console.log(pollsList)

    for (const poll of pollsList.resources) {
      const pollOptionsArray = await fetch(`http://localhost:5000/poll_options/?poll_id=${poll.id}`)
      const pollOptionsList = await pollOptionsArray.json()
      const optionsAr = []
      for (const option of pollOptionsList.resources) {
        optionsAr.push(option.text)
      }
      result.push({
        poll_id: poll.id,
        poll_question: poll.question,
        poll_options: optionsAr
      })
    }
    return result
  } catch (err) {
    console.error(err)
    return []
  }
}

export async function voteOnPoll(pollID, userID, option_id) {
  // let pollOptionsArray = await fetch(`http://localhost:5000/poll_votes/?poll_id=${pollID}`);
  try {
    const data = {
      poll_id: pollID,
      user_id: userID,
      option_id: option_id
    }

    const request = await fetch('http://localhost:5000/poll_votes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json = await request.json()
    return json
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getPollVotes(pollID) {
  try {
    const pollOptionsArray = await fetch(`http://localhost:5000/poll_votes/?poll_id=${pollID}`)
    const pollVotesList = await pollOptionsArray.json()

    return pollVotesList.resources
  } catch (err) {
    console.error(err)
    return []
  }
}

// Return an array of all polls, poll_id, poll_question, poll_options
// if poll is empty, return an error or empty array

export async function getUserIDByPollID(pollID) {
  try {
    const response = await fetch(`http://localhost:5000/polls/?id=${pollID}`)
    const userObj = await response.json()
    return userObj.resources[0].user_id
  } catch (err) {
    console.error(err)
    return null
  }
}
