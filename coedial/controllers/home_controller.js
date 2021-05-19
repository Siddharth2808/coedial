const Post = require('../models/post')

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    Post.find({}).populate('user').exec( function(err,posts)
        {
            return res.render('home', {
                title: "Post-List",post_list: posts
            });
        })
    }



// module.exports.actionName = function(req, res){}