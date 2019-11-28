module.exports = {
    entry: {
      main:'./src/viewer.js',
      worker:'./src/Worker.js',
      config:'./src/config.js'
    },
    output:{
        filename:'[name].js',
        path: __dirname + '/public/js',
        globalObject: 'this'
    },
    optimization: {
      minimize: false
    }
};