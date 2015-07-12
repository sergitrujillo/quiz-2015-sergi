var  models = require('../models/models.js');

// GET 
exports.new = function(req,res){
	res.render('comments/new.ejs',{quizid: req.params.quizId,errors:[]});
};


// POST
exports.create = function(req,res){
	var comment = models.Comment.build(
		{texto: req.body.texto,
			QuizId: req.params.quizId
		});
	comment
	.validate()
	.then(
		function(err){

			if (err){
				res.render('comments/new.ejs',{comment: comment, errors: err.errors });
			}else{
				comment
				.save()
				.then( function(){
					res.redirect('/quizes/'+req.params.quizId)
				});
			}

		}
	).catch(function(error){next(error)});
}
