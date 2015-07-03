
var models = require('../models/models.js');

exports.load = function(req,res,next,quizId){
	models.Quiz.findById(req.params.quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe quizId='+quizId));
			}

			res.render('quizes/show',{quiz:quiz});
		}
	).catch(function(error){next(error);})
}

exports.index = function(req,res){
	var search = req.query.search || null;
	if (search===null){
		models.Quiz.findAll().then(function(quizes){
			res.render("quizes/index",{quizes:quizes});
		});
	}else{
		search = '%'+search.replace(/\ +/g,"%")+'%';
		console.log(search);
		models.Quiz.findAll({where:["pregunta LIKE ?",search]}).then(function(quizes){
			res.render("quizes/index",{quizes:quizes});
		});
	}

}


exports.show = function(req,res){
	res.render('quizes/show',{quiz:req.quiz});
};
/*
exports.question = function(req,res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question',{pregunta:quiz[0].pregunta});	
	})
	
};
*/
exports.answer = function(req,res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz:req.quiz, respuesta:resultado});
};

exports.author = function(req,res){
	res.render('author',{});
}