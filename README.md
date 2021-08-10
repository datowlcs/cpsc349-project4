# <img src="https://user-images.githubusercontent.com/73214439/128945979-b4e2fb92-c232-4665-a1ea-8902da315826.png" width="72" height="72"> [Glitter](https://github.com/quentinmay/cpsc349-project4)
This is a miniature mock twitter clone crafted with a TailWind and JavaScript front-end as well as SQL and sandman2 back-end.

https://user-images.githubusercontent.com/73214439/128944937-7bba2358-d21f-4164-85a0-29fcb1e53085.mp4




## Getting started

Use the following commands to get up and running.

Start the back-end in one terminal window:

```shell-session
$ sudo apt update                                               # updates package index
$ sudo apt install --yes ruby-foreman sqlite3                   # used to manage Procfile and database
$ sudo apt install --yes python3-pip python3-flask-cors         # required Python packages
$ git clone https://github.com/ProfAvery/sandman2.git           # patched version to allow CORS
$ python3 -m pip install ./sandman2                             # used to expose API
$ git clone https://github.com/quentinmay/cpsc349-project4.git
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


## Other features

This version of the [Mockroblog database](./api/mockroblog.sql) includes
additional data not included in
[Project 3](https://github.com/ProfAvery/cpsc349-project3):

 * Likes
 * Polls

The REST API exposed by `sandman2` also allows additional types of queries
against existing data. See
[the documentation](https://pythonhosted.org/sandman2/interacting.html) for
details.

# Team Members:
1. Nolan O'Donnell
2. Quentin May
3. Stephanie Cobb
4. Joe Rico
