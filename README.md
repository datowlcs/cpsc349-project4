# Mockroblog - Mock APIs for Microblogging

**Q.** What's the minimum amount of code needed to mock up a miniature
       Twitter back-end?

**A.** How comfortable are you with SQL?

## Getting started

Use the following commands to get up and running.

Start the back-end in one terminal window:

```shell-session
$ sudo apt update                                               # updates package index
$ sudo apt install --yes ruby-foreman sqlite3                   # used to manage Procfile and database
$ sudo apt install --yes python3-pip python3-flask-cors         # required Python packages
$ git clone https://github.com/ProfAvery/sandman2.git           # patched version to allow CORS
$ python3 -m pip install ./sandman2                             # used to expose API
$ git clone https://github.com/ProfAvery/cpsc349-project4
$ cd cpsc349-project4/api
$ make                                                          # creates database
```

Temporarily add `sandman2` to your `PATH` so that you can start the API:

```shell-session
$ export PATH="$HOME/.local/bin:$PATH"
```

This command will need to repeated if you open a new terminal window for the
back-end. To pick up this change permanently, log out and then back in, or
restart the VM.

Start the API:

```shell-session
$ foreman start
```

Start the front-end in another terminal window:

```shell-session
$ cd cpsc349-project4/
$ npm install
$ npm start
```

You can examine the data using the `sandman2`
[Admin Interface](http://localhost:5000/admin).

## Tools

See the following references for more information:

* [foreman](https://ddollar.github.io/foreman/)
* [sqlite3](https://sqlite.org/cli.html)
* [sandman2](https://github.com/jeffknupp/sandman2)
* [make](https://en.wikipedia.org/wiki/Makefile)
* [webpack](https://webpack.js.org/)


# Sample API calls

| Operation     | HTTP Method | URL                            |
|---------------|-------------|--------------------------------|
| Create a user | POST        | `http://localhost:5000/users/` |

```json
{
    "username": "tester",
    "email": "test@example.com",
    "password": "testing"
}
```


| Operation               | HTTP Method | URL                            |
|-------------------------|-------------|---------------------------------------------------------------------|
| Check a user's password | GET         | `http://localhost:5000/users/?username=ProfAvery&password=password` |
| Start following a user  | POST        | `http://localhost:5000/followers/`                                   |

```json
{
    "follower_id": 4,
    "following_id": 2
}
```


| Operation              | HTTP Method | URL                            |
|------------------------|-------------|---------------------------------------------------------------------|
| Stop following a user  | DELETE      | `http://localhost:5000/followers/6`                                 |

Note that `6` is the `id` of the entry in the `followers` table, not the `user_id` of either user.


| Operation                    | HTTP Method | URL                            |
|------------------------------|-------------|---------------------------------------------------------------------|
| Retrieve a user's timeline   | GET         | `http://localhost:5000/posts/?user_id=2&sort=-timestamp`            |
| Retrieve the public timeline | GET         | `http://localhost:5000/posts/sort=-timestamp`                       |
| Search posts for a hashtag   | GET         | `http://localhost:5000/posts/?text=%%%%23cpsc315%%&sort=-timestamp` |
| Post a new message           | POST        | `http://localhost:5000/posts/`                                      |

```json
{
    "user_id": 4,
    "text": "First poast!"
}
```


## Other features

This version of the [Mockroblog database](./api/mockroblog.sql) includes
additional data not included in
[Project 3](https://github.com/ProfAvery/cpsc349-project3):

 * Likes
 * Direct Messages
 * Polls

The REST API exposed by `sandman2` also allows additional types of queries
against existing data. See
[the documentation](https://pythonhosted.org/sandman2/interacting.html) for
details.
