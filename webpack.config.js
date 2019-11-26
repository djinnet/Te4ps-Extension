module.exports = {
    entry: ['./src/viewer.js'],
    output:{
        filename:'main.js',
        path: __dirname + '/public/js'
    },
    resolve: {
        alias: {
          createjs: '@createjs/dist/easeljs-NEXT.js'
        }
    },
    module: {
        rules: [
          {
            test: /node_modules[/\\]@createjs/,
            loaders: [
              'imports-loader?this=>window',
              'exports-loader?window.createjs'
            ]
          }
        ]
    }
};