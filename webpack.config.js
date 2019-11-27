module.exports = {
    entry: {
      main:'./src/viewer.js',
      worker:'./src/Worker.js'
  
    },
    output:{
        filename:'[name].js',
        path: __dirname + '/public/js',
        globalObject: 'this'
    },
    optimization: {
      minimize: false
    },
    /*
    module: {
        rules: [
          {
            test:  /worker\.js$/,
            use: {
              loader: 'worker-loader'
            }
          }
        ]
    }*/
};