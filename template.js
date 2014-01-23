exports.description = 'Create a hapi based webserivce';

exports.template = function(grunt, init, done) {

    init.process({}, [
        init.prompt('name'),
        init.prompt('description', 'webserivce'),
        init.prompt('port', '9100')
    ], function(err, props) {

        var files = init.filesToCopy(props);
        init.copyAndProcess(files, props);

        init.writePackageJSON('package.json', {
            name: props.name,
            decription: props.description,
            version: '0.0.1',
            repository: 'git://github.com/ryanfitz/' + props.name,
            keywords: ['api', 'webserivce'],
            main: 'index',
            node_version: '0.10.x',
            peerDependencies: {
            },
            dependencies: {
              'hapi'           : '~2.1.0',
              'lodash'         : '~2.4.0',
              'async'          : '~0.2.10',
              'good'           : '~1.0.0',
              'cluster-master' : '~0.2.0',
              'hoek'           : '~1.4.0',
              'nconf'          : '~0.6.0',
              'winston'        : '~0.7.0',
              'aws-sdk'        : '~2.0.0-rc8',
              'cloudstats'     : '0.1.0',
              'convert-params' : '~0.1.0',
              'di'             : '~0.0.1'
            },
            devDependencies: {
              'mocha'                : '~1.16.0',
              'chai'                 : '~1.8.0',
              'sinon'                : '~1.7.0',
              'grunt'                : '~0.4.2',
              'grunt-contrib-jshint' : '~0.8.0',
              'grunt-mocha-test'     : '~0.8.0',
              'grunt-contrib-watch'  : '~0.5.0',
              'grunt-concurrent'     : '~0.4.0',
              'grunt-nodemon'        : '~0.1.0',
              'grunt-bump'           : '~0.0.13'
            },
            npm_test: 'grunt test'
        });

        done();
    });
};
