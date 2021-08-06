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
  console.log(response);

  let user = await response.json();

  if (!response.ok) {
    alert("Invald Request. Please try again.");
    return null;
  }
  return user.resources;
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

  return user.resources[0].username;
}

export async function getFollowers(userID) {
  const response = await fetch('http://localhost:5000/followers/')
  const followerList = await response.json()
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
    throw err
  }

  // if (userId > 3) {
  //   return {
  //     id: 6,
  //     follower_id: userId,
  //     following_id: userIdToFollow
  //   }
  // }
}

export function removeFollower(userId, userIdToStopFollowing) {
  if (userId <= 3) {
    return {
      message: null
    }
  }
}

export async function getUser(username) {
  const response = await fetch(`http://localhost:5000/users/?username=${username}`)
  const user = await response.json()
  return user.resources[0]
}

export async function getUserTimeline(username) {
  const user = await getUser(username)
  const response = await fetch(`http://localhost:5000/posts/?user_id=${(user.id)}`)

  const userTimeline = await response.json()
  return userTimeline.resources
  // switch (username) {
  //   case 'ProfAvery':
  //     return [
  //       {
  //         id: 2,
  //         user_id: 1,
  //         text: 'FYI: https://www.levels.fyi/still-hiring/',
  //         timestamp: '2021-07-24 05:11:12'
  //       },
  //       {
  //         id: 3,
  //         user_id: 1,
  //         text: 'Yes, the header file ends in .h. C++ is for masochists.',
  //         timestamp: '2021-07-24 05:09:12'
  //       },
  //       {
  //         id: 1,
  //         user_id: 1,
  //         text: 'Meanwhile, at the R1 institution down the street... https://uci.edu/coronavirus/messages/200710-sanitizer-recall.php',
  //         timestamp: '2021-07-24 05:06:12'
  //       }
  //     ]
  //   case 'KevinAWortman':
  //     return [
  //       {
  //         id: 5,
  //         user_id: 2,
  //         text: "I keep seeing video from before COVID, of people not needing to mask or distance, and doing something like waiting in line at Burger King. YOU'RE WASTING IT!",
  //         timestamp: '2021-07-24 05:10:12'
  //       },
  //       {
  //         id: 4,
  //         user_id: 2,
  //         text: 'If academia were a video game, then a 2.5 hour administrative meeting that votes to extend time 15 minutes is a fatality. FINISH HIM',
  //         timestamp: '2021-07-24 05:08:12'
  //       }
  //     ]
  //   case 'Beth_CSUF':
  //     return [
  //       {
  //         id: 6,
  //         user_id: 3,
  //         text: '#cpsc315 #engr190w NeurIPS is $25 for students and $100 for non-students this year! https://medium.com/@NeurIPSConf/neurips-registration-opens-soon-67111581de99',
  //         timestamp: '2021-07-24 05:07:12'
  //       }
  //     ]
  //   default:
  //     return []
  // }
}

export async function getPublicTimeline() {
  const response = await fetch('http://localhost:5000/posts/')

  const json = await response.json()

  return json.resources
  // return [
  //   {
  //     id: 2,
  //     user_id: 1,
  //     text: 'FYI: https://www.levels.fyi/still-hiring/',
  //     timestamp: '2021-07-24 05:11:12'
  //   },
  //   {
  //     id: 5,
  //     user_id: 2,
  //     text: "I keep seeing video from before COVID, of people not needing to mask or distance, and doing something like waiting in line at Burger King. YOU'RE WASTING IT!",
  //     timestamp: '2021-07-24 05:10:12'
  //   },
  //   {
  //     id: 3,
  //     user_id: 1,
  //     text: 'Yes, the header file ends in .h. C++ is for masochists.',
  //     timestamp: '2021-07-24 05:09:12'
  //   },
  //   {
  //     id: 4,
  //     user_id: 2,
  //     text: 'If academia were a video game, then a 2.5 hour administrative meeting that votes to extend time 15 minutes is a fatality. FINISH HIM',
  //     timestamp: '2021-07-24 05:08:12'
  //   },
  //   {
  //     id: 6,
  //     user_id: 3,
  //     text: '#cpsc315 #engr190w NeurIPS is $25 for students and $100 for non-students this year! https://medium.com/@NeurIPSConf/neurips-registration-opens-soon-67111581de99',
  //     timestamp: '2021-07-24 05:07:12'
  //   },
  //   {
  //     id: 1,
  //     user_id: 1,
  //     text: 'Meanwhile, at the R1 institution down the street... https://uci.edu/coronavirus/messages/200710-sanitizer-recall.php',
  //     timestamp: '2021-07-24 05:06:12'
  //   }
  // ]
}

export function getHomeTimeline(username) {
  switch (username) {
    case 'ProfAvery':
      return [
        {
          id: 5,
          user_id: 2,
          text: "I keep seeing video from before COVID, of people not needing to mask or distance, and doing something like waiting in line at Burger King. YOU'RE WASTING IT!",
          timestamp: '2021-07-24 05:10:12'
        },
        {
          id: 4,
          user_id: 2,
          text: 'If academia were a video game, then a 2.5 hour administrative meeting that votes to extend time 15 minutes is a fatality. FINISH HIM',
          timestamp: '2021-07-24 05:08:12'
        },
        {
          id: 6,
          user_id: 3,
          text: '#cpsc315 #engr190w NeurIPS is $25 for students and $100 for non-students this year! https://medium.com/@NeurIPSConf/neurips-registration-opens-soon-67111581de99',
          timestamp: '2021-07-24 05:07:12'
        }
      ]
    case 'KevinAWortman':
      return [
        {
          id: 2,
          user_id: 1,
          text: 'FYI: https://www.levels.fyi/still-hiring/',
          timestamp: '2021-07-24 05:11:12'
        },
        {
          id: 3,
          user_id: 1,
          text: 'Yes, the header file ends in .h. C++ is for masochists.',
          timestamp: '2021-07-24 05:09:12'
        },
        {
          id: 6,
          user_id: 3,
          text: '#cpsc315 #engr190w NeurIPS is $25 for students and $100 for non-students this year! https://medium.com/@NeurIPSConf/neurips-registration-opens-soon-67111581de99',
          timestamp: '2021-07-24 05:07:12'
        },
        {
          id: 1,
          user_id: 1,
          text: 'Meanwhile, at the R1 institution down the street... https://uci.edu/coronavirus/messages/200710-sanitizer-recall.php',
          timestamp: '2021-07-24 05:06:12'
        }
      ]
    case 'Beth_CSUF':
      return getUserTimeline('KevinAWortman')
    default:
      return []
  }
}

export function postMessage(userId, text) {
  if (userId > 3) {
    const now = new Date()
    const timestamp =
      now.getUTCFullYear() + '-' +
      String(now.getUTCMonth() + 1).padStart(2, '0') + '-' +
      String(now.getUTCDate()).padStart(2, '0') + ' ' +
      String(now.getUTCHours()).padStart(2, '0') + ':' +
      String(now.getUTCMinutes()).padStart(2, '0') + ':' +
      String(now.getUTCSeconds()).padStart(2, '0')

    return {
      id: 7,
      user_id: userId,
      text: text,
      timestamp: timestamp
    }
  }
}
