var turno ="X";
var turno2="O";
var bandera=0;
var ban=false;
var opciones=new Array(9);
var contador = 0;
var counter = 0;
var jugador;

function caremoco(){
    // random
    oli=localStorage.getItem("nombre_1",jugador1);
    chaujj=localStorage.getItem("nombre_2",jugador2);

    var moco=Math.floor((Math.random()*2));
    bandera = moco;
    
    if(moco==0 ){
        document.getElementById("div_turno").innerHTML="Es el turno del jugador:  "+ oli;
    }else{
        document.getElementById("div_turno").innerHTML="Es el turno del jugador:  "+ chaujj;
    }
    /*console.log(moco);*/
}

function marcar (id)
{   
    var celda =document.getElementById(id);
    //console.log(opciones[id]);
    
    if (bandera == 0 && !opciones[id])
    {
        celda.value=turno;
        contador++;
        $('#turnOne').text('Movimientos '+oli+': '+contador);
        
        document.getElementById("div_turno").innerHTML="Es el turno del jugador:<br> "+ chaujj;
        opciones[id]=1;
        bandera = 1;
        jugador=oli;
            
           
    }else if (bandera == 1 && !opciones[id]){
           
        celda.value=turno2;
        counter++;            
        $('#turnTwo').text('Movimientos '+chaujj+': '+counter)
        
        document.getElementById("div_turno").innerHTML="Es el turno del jugador:<br>"+ oli;
        opciones[id]=0;
        bandera = 0;
        jugador=chaujj;
           
    } 
    
    jugadorx(1);
    jugadorx(0); 
}

function jugadorx(_option){
   if (opciones[1]==_option && opciones [2]==_option && opciones[3]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
        return true;
   }else if (opciones[4]==_option && opciones [5]==_option && opciones[6]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[7]==_option && opciones [8]==_option && opciones[9]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[1]==_option && opciones [5]==_option &&opciones[9]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[3]==_option && opciones [5]==_option &&opciones[7]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[1]==_option && opciones [4]==_option &&opciones[7]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[2]==_option && opciones [5]==_option &&opciones[8]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }else if (opciones[3]==_option && opciones [6]==_option &&opciones[9]==_option){
        alert("Jugador "+jugador+" Ganaste!!");
       return true;
   }
}

/*
function whoWin(){
    if(contador>counter){
        $('#winner').text(turno+'GANASTE');
        $('#loser').text(turno2+'PERDISTE');
    } else {
        $('#winner').text(turno+'PERDISTE');
        $('#loser').text(turno2+'GANASTE');
    }
}
*/
   
function reiniciar(){
    
   location.reload();
   
} 

    
    
    
    
    
    
    
    