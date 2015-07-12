var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz',errors:[] });
});

// Autoload de comandes con :quizId
router.param('quizId',quizController.load); // autoload de quizId

// Definicion de rutas de sesion
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout',sessionController.destroy);

// Definicion de rutas de /quizes
router.get('/quizes/:quizId(\\d+)', quizController.show)
//router.get('/quizes/question',quizController.question);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);
router.get('/quizes',quizController.index);

// Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);

router.get('/author',quizController.author);

module.exports = router;
