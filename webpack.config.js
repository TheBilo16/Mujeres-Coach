module.exports = {
    entry : "./view/js/all.js",
    module :{
        rules : [{
            use : ["babel-loader"]
        }]
    },
    output : {
        path : __dirname + "/view/js/build",
        filename : "all-min.js"
    }

}