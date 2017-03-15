$(document).ready(init);

var currentSection = null;
var currentGameId; 

function init()
{
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
    $('#btn-nombres').click(onClickBtnJuego);
    $('#btn-historial').click(onClickBtnHistorial);
    $('#btn-inicio').click(onClickBtnInicio);
    $('#list-games').on('click','button', onClickBtnItemGame);
    $('#btn-comments').click(onClickBtnComments);

	TweenMax.from($('#saludo h1'), 1, {marginBottom:'0px', ease:Elastic.easeOut});   
}

function onClickBtnSaludo() {
	gotoSection('nombres');    
}

/*function onClickBtnNombre() {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games',
        type:'POST',
          'game': {
            'winner_player': 'Emmanuel',
            'loser_player': 'Irene',
            'number_of_turns_to_win': '8'
          }
    }).success(function(_data){
        console.log('ff');
    }); 
	gotoSection('juego');
}*/
function onClickBtnJuego() {
    /* Permite tener 0 y x en la tabla*/
	
    var jugador1=document.getElementById("jugador1");
    var jugador2=document.getElementById("jugador2");
    localStorage.setItem('nombre_1',jugador1.value);
    localStorage.setItem('nombre_2',jugador2.value);
    
    var request = new XMLHttpRequest();

    request.open('POST', 'http://test-ta.herokuapp.com/games');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    var body = {
      'game': {
        'winner_player': jugador1.value,
        'loser_player': jugador2.value,
        'number_of_turns_to_win': '3'
      }
    };

    request.send(JSON.stringify(body));

        caremoco();
        gotoSection('juego');
}
function onClickBtnNombre() {
	gotoSection('juego');
}
function onClickBtnInicio(evt){
    gotoSection('saludo');
}
function onClickBtnHistorial(evt) {
    evt.preventDefault();
    gotoSection("historial");
    getHistorial();
}
function getHistorial(){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games',
    }).success(function(_data){
       /*console.log(_data); */
        drawHistorial(_data);
    });
    //Por defecto ajax es get, para agregar post, se pone Type  
}
function drawHistorial(_datos) {
    var list = $('#list-games');
    for(var i in _datos){
        var html = '<li data-idgame="'+_datos[i].id+'"class="list-group-item">El jugador: '+_datos[i].winner_player +'le hago a '+_datos[i].loser_player+ '<button class="btn">Comentar</button></li>';
        list.append(html);
    }  
}
function onClickBtnItemGame() {
    //alert("Hola");
    var idGame = $(this).parent().data('idgame');
    getSingleGame(idGame);
    gotoSection('comments');
    getComments(idGame);
    currentGameId = idGame;
}
function getSingleGame(_idGame) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame,
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data.id);*/
    });
}
function drawComments(_datos) {
    var list = $("#list-comments");
    list.empty();
    for(var i in _datos){
        
        var html = '<li class="list-group-item">'+_datos[i].name+' dice:<p>'+_datos[i].content+'</p></li>';
        list.append(html);
    }  
}
function getComments(_idGame) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data);*/
        drawComments(_data);
    });
}
function onClickBtnComments() {
    sendComment(currentGameId,$('#name').val(),$('#content').val());
    $('#name').val("");
    $('#content').val("");
}
function sendComment(_idGame,_name,_content) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        type:'POST',
        data:{comment:
               {name:_name,content:_content,game_id:_idGame}
             },
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data);*/
        getComments(_idGame);
    });
}

function gotoSection(_identificadorDeSeccion)
{
	currentSection.removeClass('visible');
	var nextSection = $('#'+_identificadorDeSeccion);

	nextSection.addClass('visible');
    //TweenMax.from(nextSection, 1.5, {scale:0.2, opacity:0, ease:Elastic.easeOut});
	currentSection = nextSection;
}





