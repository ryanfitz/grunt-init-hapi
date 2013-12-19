# {%= name %}

{%= description %}

## Getting Started

On your local machine you first need to install the following pieces of software:

* install [vagrant 1.4.X](http://www.vagrantup.com/downloads.html)
* install [ansible 1.4.X](http://www.ansibleworks.com/docs/intro_installation.html)

## Launch dev server

Now cd into the checkout project and run the following commands:

    $ vagrant up
    $ vagrant ssh
    $ cd /vagrant
    $ grunt server

## Testing

The project includes a full test suite. To run rest run the following:

    $ grunt

Run the watch task to continously run the javascript linter and tests as you develop

    $ grunt watch

## Repl

The repl command lets you interact with your application from the command line

    $ ./bin/repl -c config/development.json
