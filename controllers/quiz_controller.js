
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

			res.render('quizes/show',{quiz:quiz,errors:[]});
		}
	).catch(function(error){next(error);})
}

exports.new = function(req,res){
	var quiz = models.Quiz.build(
		{pregunta:"Pregunta",respuesta:"Respuesta"});
	res.render('quizes/new', {quiz:quiz,errors:[]});
}

exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err){
			res.render("quizes/new",{quiz:quiz,errors:err.errors});
		}else{
			quiz
			.save({fields:["pregunta","respuesta"]})
			.then(function(){ return res.redirect('/quizes'); });
		}
	});
	
}
exports.edit = function(req,res){
	var quiz = req.quiz;
	res.render('quizes/edit',{quiz:quiz,errors:[]});
}

exports.update = function(req,res){
	req.quiz.pregunta =  req.body.quiz.pregunta;
	req.quiz.respuesta =  req.body.quiz.respuesta;

	req.quiz
	.validate()
	.then(function(err){
		if (err){
			res.render('quizes/edit',{quiz: req.quiz, errors: err.errors});
		}else{
			req.quiz
			.save( { fields: ["pregunta","respuesta"]})
			.then( function(){ return res.redirect('/quizes')});
		}

	});
}

exports.index = function(req,res){
	var search = req.query.search || null;
	if (search===null){
		models.Quiz.findAll().then(function(quizes){
			res.render("quizes/index",{quizes:quizes,errors:[]});
		});
	}else{
		search = '%'+search.replace(/\ +/g,"%")+'%';
		models.Quiz.findAll({where:["pregunta LIKE ?",search]}).then(function(quizes){
			res.render("quizes/index",{quizes:quizes,errors:[]});
		});
	}

}


exports.show = function(req,res){
	res.render('quizes/show',{quiz:req.quiz,errors:[]});
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
	res.render('quizes/answer',{quiz:req.quiz, respuesta:resultado,errors:[]});
};

exports.author = function(req,res){
	res.render('author',{errors:[]});
}