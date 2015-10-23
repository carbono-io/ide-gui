# The GUI

# Run the project:

`npm install`

That should automatically call `bower install` and `gulp build:dist`.
If that does not happen, please run the commands manually.

After having installed the bower dependencies, run `gulp develop`.


## Be careful with `bower install`

Bower probably will ask you about dependency version resolution.
We are using Polymer and it is still updating constantly, thus this will happen very often.
Always opt for the version the package `ide-gui` has specified.
That can be seen in the options bower gives you or in the `bower.json`
of this project.
Do not use `!` when selecting a version, you do not want to update the 
`bower.json` file that way.


## gulp
For help with gulp tasks, run `gulp` or `gulp help` in the terminal inside the project.
A short description of tasks available will be shown.

Please make sure you have `gulp` installed as a global dependency.
If not, run `sudo npm install -g gulp`.

## Running inside docker container

At the time of writing, the image was not published to the docker hub, thus you 
need to build it manually.

`docker build -t carbono/gulp .`
`docker run -it -v ~/path/to/ide-gui/project:/code -P carbono/gulp`
once inside the container,
`gulp develop`
Ports should have been mapped and you can access container through browser
Look for port mapping to 4000, which is where the development server is.

Attention: the code is in your machine