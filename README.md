# The GUI

# Run the project:

`npm install`

That should automatically call `bower install` and `gulp build:dist`.
If that does not happen, please run the commands manually.

After having installed the bower dependencies, run `gulp develop`.

Please make sure you have `gulp` installed as a global dependency.
If not, run `sudo npm install -g gulp`.

## For the fancy ones:
`docker build -t carbono/gulp .`
`docker run -it -v ~/path/to/ide-gui/project:/code -P carbono/gulp`
once inside the container,
`gulp develop`
Ports should have been mapped and you can access container through browser
Look for port mapping to 4000, which is where the development server is.

Attention: the code is in your machine