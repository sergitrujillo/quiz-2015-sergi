var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_NAME = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(DB_NAME,user,pwd,
	{ 	dialect: 	protocol, 
		protocol: 	protocol, 
		port: 		port, 
		host: 		host,
		storage: 	storage, // solo SQLite 
		omitNull: 	true //solo Postgres
	});




// Importar a definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var Comment = sequelize.import(path.join(__dirname,'comment'));

// Definición de las relaciones
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportación de las definiciones de las tablas
exports.Quiz = Quiz; 
exports.Comment = Comment;

//sequelize.sync() crea e inicializa tabla de preguntas en BBDD
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if (count===0){
			Quiz.create({ 
				pregunta: "Capital de Italia",
				respuesta: "Roma",
				tema: "otro"
			})
			.then(function(){
				console.log('Base de datos inicializada');
			});
		};
	});
});