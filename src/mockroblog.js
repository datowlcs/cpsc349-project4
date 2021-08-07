/* Mockroblog client API stubs for prototyping */
export async function createUser(username, email, password) {

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      id: 4,
      username: username,
      email: email,
      password: password
    }),
    headers: new Headers()
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return data
    })
    .catch(error => {
      console.log(error)
      return null
    })
}

export async function authenticateUser(username, password) {
  let response = await fetch(`http://localhost:5000/users/?username=${username}&password=${password}`, {
    method: 'GET',
  });

  let user = await response.json();

  if (!response.ok) {
    alert("Invald Request. Please try again.");
    return null;
  }
  return user.resources[0];
}

export async function getUserName(userID) {
  let response = await fetch(`http://localhost:5000/users/?id=${userID}`, {
    method: 'GET',
  });
  // console.log(response);

  let user = await response.json();

  if (!response.ok) {
    alert("Invald Request. Please try again.");
    return null;
  }

  return user.resources[0];
}

export async function getFollowing(userID) {
  const response = await fetch(`http://localhost:5000/followers/?follower_id=${userID}`)
  const followingList = await response.json()
  return followingList.resources;
}

export async function getFollowers(userID) {
  const response = await fetch(`http://localhost:5000/followers/?following_id=${userID}`)
  const followerList = await response.json()
  return followerList.resources;

}

export async function getLikes() {
  const response = await fetch('http://localhost:5000/likes/')
  const likesList = await response.json()
  return likesList.resources;
}

export async function getLikesByPostID(postID) {

  const response = await fetch(`http://localhost:5000/likes/?post_id=${postID}`)
  const likesList = await response.json()
  return likesList.resources;
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

    // console.log(request)

    return {
      id: 6,
      follower_id: userId,
      following_id: userIdToFollow
    }
  } catch (err) {
    console.log(err)
    //throw err
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

    console.log(request)

    return {
      id: 6,
      user_id: userId,
      post_id: postId
    }
  } catch (err) {
    console.log(err)
    //throw err
  }
}

export async function removeFollower(userId, userIdToStopFollowing) {
  try {
    const getFollowerObject = await fetch(`http://localhost:5000/followers/?follower_id=${userId}&following_id=${userIdToStopFollowing}`);
    const jsonObj = await getFollowerObject.json();

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

    //console.log(request)

    return {
      id: data.id,
      follower_id: userId,
      following_id: userIdToStopFollowing
    }
  } catch (err) {
    console.log(err)
    throw err
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

//Home timeline is everyone the current logged in user is following. All of their posts.
export async function getHomeTimeline(username) {
  let loggedInUser = await getUser(username);
  // console.log(loggedInUser);
  const response = await fetch(`http://localhost:5000/followers/?follower_id=${loggedInUser.id}`);
  const followingList = await response.json();
  //get posts of all followingUsers
  let promises = [];
  for (let follower of followingList.resources) {
    const response = await fetch(`http://localhost:5000/posts/?user_id=${(follower.following_id)}&sort=-timestamp`)
    promises.push(response);

  }
  let posts = await Promise.all(promises);
  let jsonPromises = [];
  for (let post of posts) {
    jsonPromises.push(await post.json())
  }
  let jsonPosts = await Promise.all(jsonPromises);
  let allPosts = [];
  for (let jsonPost of jsonPosts) {
    // console.log(jsonPost.resources);
    for (let resource of jsonPost.resources) {
      allPosts.push(resource);
    }
  }

  //https://stackoverflow.com/questions/7555025/fastest-way-to-sort-an-array-by-timestamp
  allPosts.sort(function (x, y) {
    return new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime()
  });
  // console.log(allPosts);



  return allPosts
}

export async function postMessage(userId, text) {

  try {
    const data = {
      user_id: userId,
      text: text
    };

    const request = await fetch('http://localhost:5000/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    console.log(request)

    return {
      id: 6,
      user_id: userId,
      user_text: text
    }
  } catch (err) {
    console.log(err)
    throw err
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
    let json = await request.json();
    console.log("json", json)
    console.log("options", optionsArr)
    for (let option of optionsArr) {

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
    return json;
  } catch (err) {
    console.log(err)
    return null;
  }


}

export async function getPolls() {
  try {
    let polls = await fetch("http://localhost:5000/polls")
    let result = [];
    let pollsList = await polls.json();

    // console.log(pollsList)

    for (let poll of pollsList.resources) {
      let pollOptionsArray = await fetch(`http://localhost:5000/poll_options/?poll_id=${poll.id}`);
      let pollOptionsList = await pollOptionsArray.json();
      let optionsAr = [];
      for (let option of pollOptionsList.resources) {
        optionsAr.push(option.text);
      }
      result.push({
        poll_id: poll.id,
        poll_question: poll.question,
        poll_options: optionsAr,
      })
    }
    return result;
  } catch (err) {
    console.log(err)
    return null;
  }

}
//Return an array of all polls, poll_id, poll_question, poll_options
//if poll is empty, return an error or empty array

export async function getUserIDByPollID(pollID) {

  const response = await fetch(`http://localhost:5000/polls/?id=${pollID}`)
  const userObj = await response.json()
  return userObj.user_id;
}