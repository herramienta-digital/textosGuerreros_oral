/*
Licensed under GPL

herramienta.digital : tecnología para humanxs
pablo somonte ruano

TEXTOS GUERREROS 2017

Oral.pub
*/

//VARIABLES

//posición cambiante
var posX = 0;
var posY = 0;

//ancho palabras
var ancho = 0;
var alturaCanvas = 0;

//Número de archivos por categoría
var susSM_numero = 69;
var susPM_numero = 32;
var adj_proh_numero = 8;
var adjSM_numero = 29;
var mantra_numero = 26;

// arrays de imágenes por categoría
var susSM_img = new Array();
var susPM_img = new Array();
var adj_proh_img = new Array();
var adjSM_img = new Array();
var mantra_img = new Array();

// generador de números aleatorios por categoría
var mantra_rand = Math.floor(Math.random()*mantra_numero);

//LOS RANDOMS COMIENZAN CON LAS PALABRAS ORIGINALES
var susSM_rand = 0;
var susSM_rand_2 = 1;

var susPM_rand = 0;

var adjSM_rand = 0;
var adjSM_rand_2 = 1;

var adj_proh_rand = 0;

var linea1 = 0;
var linea2 = 0;
var linea3 = 0;
var linea4 = 0;
var linea5 = 0;

var acerca = false;

var lineaMasLarga = 0;

var bgMapa;

function preload() {

	//Precargar las imágenes
	for (var i =0; i<mantra_numero; i++){
		mantra_img[i] = loadImage("data/mantra/" + i + "mantra.jpg");
	}

	for (var i =0; i<susSM_numero; i++){
		susSM_img[i] = loadImage("data/susSM/" + i + "_susSM.jpg");
	}

	for (var i =0; i<susPM_numero; i++){
		susPM_img[i] = loadImage("data/susPM/" + i + "_susPM.jpg");
	}

	for (var i =0; i<adj_proh_numero; i++){
		adj_proh_img[i] = loadImage("data/adj_proh/" + i + "_adj_proh.jpg");
	}

	for (var i =0; i<adjSM_numero; i++){
		adjSM_img[i] = loadImage("data/adjSM/" + i + "_adjSM.jpg");
	}

	bgMapa = loadImage("mapaGv3.jpg");

}

function setup() {

var myCanvas = createCanvas(windowWidth, 500);
		myCanvas.parent("canvasProcessing");

}

function draw() {

	background(0,1);
	frameRate(8);
	clear();

	var anchoMantra_1 = mantra_img[0].width + mantra_img[1].width;
	var anchoMantra_2 = anchoMantra_1 + susSM_img[susSM_rand].width + mantra_img[3].width;
	var anchoMantra_3 = mantra_img[6].width + mantra_img[7].width + mantra_img[8].width;
	var anchoMantra_4 = mantra_img[21].width + mantra_img[22].width + mantra_img[23].width;

	// largo líneas de texto
	linea1 = anchoMantra_1 + susSM_img[susSM_rand].width + mantra_img[3].width + adjSM_img[adjSM_rand].width + mantra_img[5].width;
	linea2 = anchoMantra_3 + susSM_img[susSM_rand_2].width + adjSM_img[adjSM_rand_2].width + mantra_img[11].width;
	linea3 = mantra_img[12].width + adj_proh_img[adj_proh_rand].width + mantra_img[14].width + mantra_img[15].width;
	linea4 = mantra_img[16].width + susPM_img[susPM_rand].width + mantra_img[18].width + mantra_img[19].width + mantra_img[20].width;

	//hacer un array con todas las lineas y obtener la más larga
	lineaMasLarga = Math.max(linea1, linea2, linea3, linea4, linea5);

	//Ajusta el tamaño de la línea más larga al tamaño de la pantalla
	alturaCanvas = mantra_img[0].height + mantra_img[6].height + mantra_img[11].height + mantra_img[16].height + mantra_img[21].height ;


	if (lineaMasLarga>windowWidth){
		var m= map(windowWidth,0,lineaMasLarga,0,1);
		alturaCanvas = alturaCanvas * m;
		console.log("alturaCanvas= " +alturaCanvas);
		$("#canvasProcessing").css("height", alturaCanvas);
		scale(m);
	}

	//Si ya se descubrieron todos los letreros, aparece explicación y mapa

		if (susSM_rand != 0 && susSM_rand_2 != 1 && susPM_rand != 0 && adjSM_rand != 0 && adjSM_rand != 1 && adj_proh_rand != 0){
			acerca = true;
		}

		$('#bgMapa').fadeIn(2222).delay(200);
		if (acerca){
			$('#txtAcerca').fadeIn(1111);
			$('#guerrerosjpg').fadeIn(1222);
			$('#textos').fadeIn(1333);
		}

	//Click random todos
	$(document).click(function(e) {
	    // Check for left button
	    if (e.button == 0) {
	       randomTodos();
	    }
	});

	image(mantra_img[0],posX,posY); push();	translate(mantra_img[0].width,posY); //"
	image(mantra_img[1],posX,posY);	push(); translate(mantra_img[1].width,posY); //ESTE

	image(susSM_img[susSM_rand],posX,posY);//SUST SING M (PROGRAMA)

	//Detectar Rollover sobre SUST SING SM
	if(mouseX > anchoMantra_1  && mouseX < anchoMantra_1 + susSM_img[susSM_rand].width
		&& mouseY > posY && mouseY < posY + susSM_img[susSM_rand].height){

		changeImgSusSM();
	}

	push(); translate(susSM_img[susSM_rand].width,posY);//SUST SING M (PROGRAMA)

	image(mantra_img[3],posX,posY); push(); translate(mantra_img[3].width,posY); //ES

	image(adjSM_img[adjSM_rand],posX,posY);  translate(adjSM_img[adjSM_rand].width,posY);//ADJ SING M (PÚBLICO)
	//Detectar Rollover sobre ADJ SING SM
	if(mouseX > anchoMantra_2  && mouseX < anchoMantra_2 + adjSM_img[adjSM_rand].width
		&& mouseY > posY && mouseY < posY + adjSM_img[adjSM_rand].height){

		changeImgAdjSM();
	}

	image(mantra_img[5],posX,posY);

	//SALTO DE LÍNEA
	pop();
	translate(-(anchoMantra_1 + susSM_img[susSM_rand].width),adjSM_img[adjSM_rand].height);//ADJ SING M (PÚBLICO)
	//SALTO DE LÍNEA


	image(mantra_img[6],posX,posY);	push(); translate(mantra_img[6].width,posY); //AJENO
	image(mantra_img[7],posX,posY);	push(); translate(mantra_img[7].width,posY); //A
	image(mantra_img[8],posX,posY);	push(); translate(mantra_img[8].width,posY); //CUALQUIER

	image(susSM_img[susSM_rand_2],posX,posY);  //SUST SING M (PARTIDO)

	//Detectar Rollover sobre SUST SING SM 2

	if(mouseX > anchoMantra_3  && mouseX < anchoMantra_3 + susSM_img[susSM_rand_2].width
		&& mouseY > susSM_img[susSM_rand].height && mouseY < susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height){

		changeImgSusSM_2();
	}

	push(); translate(susSM_img[susSM_rand_2].width,posY);//SUST SING M (PARTIDO)


	image(adjSM_img[adjSM_rand_2],posX,posY); //ADJ SIN M (POLÍTICO)

	//Detectar Rollover sobre ADJ SING SM 2

	if(mouseX > anchoMantra_3 + susSM_img[susSM_rand_2].width  && mouseX < anchoMantra_3 + susSM_img[susSM_rand_2].width + adjSM_img[adjSM_rand_2].width
		&& mouseY > adjSM_img[adjSM_rand].height && mouseY < susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height){

		changeImgAdjSM_2();
	}

	push(); translate(adjSM_img[adjSM_rand_2].width,posY);	//ADJ SIN M (POLÍTICO)

	image(mantra_img[11],posX,posY); //QUEDA

	//SALTO DE LÍNEA
	pop();
	translate(-(anchoMantra_3 + susSM_img[susSM_rand_2].width),adjSM_img[adjSM_rand_2].height);//ADJ SING M (PÚBLICO)
	//SALTO DE LÍNEA

	image(mantra_img[12],posX,posY); push(); translate(mantra_img[12].width,posY); //QUEDA

	image(adj_proh_img[adj_proh_rand],posX,posY); //PROHIBIDO

	if(mouseX > mantra_img[12].width && mouseX < mantra_img[12].width + adj_proh_img[adj_proh_rand].width
		&& mouseY > susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height && mouseY < susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height + adj_proh_img[adj_proh_rand].height){

		changeImgProh();

		console.log("encima PROHIBIDOOO");
		}

	push(); translate(adj_proh_img[adj_proh_rand].width,posY); //PROHIBIDO

	image(mantra_img[14],posX,posY); push(); translate(mantra_img[14].width,posY); //SU
	image(mantra_img[15],posX,posY); push(); translate(mantra_img[15].width,posY); //USO

	//SALTO DE LÍNEA
	pop();
	translate(-(mantra_img[12].width + adj_proh_img[adj_proh_rand].width + mantra_img[14].width),adj_proh_img[adj_proh_rand].height);//ADJ SING M (PÚBLICO)
	//SALTO DE LÍNEA

	image(mantra_img[16],posX,posY); push(); translate(mantra_img[16].width,posY); //PARA

	image(susPM_img[susPM_rand],posX,posY); //FINES

	if(mouseX > mantra_img[16].width && mouseX < mantra_img[16].width + susPM_img[susPM_rand].width
		&& mouseY > susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height + adj_proh_img[adj_proh_rand].height && mouseY < susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height + adj_proh_img[adj_proh_rand].height + susPM_img[susPM_rand].height){

		changeImgSusPM();
		}

	push(); translate(susPM_img[susPM_rand].width,posY); //FINES

	image(mantra_img[18],posX,posY); push(); translate(mantra_img[18].width,posY); //DISTINTOS
	image(mantra_img[19],posX,posY); push(); translate(mantra_img[19].width,posY); //A
	image(mantra_img[20],posX,posY); push(); translate(mantra_img[20].width,posY); //LOS

	//SALTO DE LÍNEA
	pop();
	translate(-(mantra_img[16].width + susPM_img[susPM_rand].width + mantra_img[18].width + mantra_img[19].width),susPM_img[susPM_rand].height);//ADJ SING M (PÚBLICO)
	//SALTO DE LÍNEA

	image(mantra_img[21],posX,posY); push(); translate(mantra_img[21].width,posY);//ESTABLECIDOS
	image(mantra_img[22],posX,posY); push(); translate(mantra_img[22].width,posY);//EN
	image(mantra_img[23],posX,posY); push(); translate(mantra_img[23].width,posY);//EL

	image(susSM_img[susSM_rand],posX,posY);// SUS SIN M (PROGRAMA)

	console.log(anchoMantra_4);
	if(mouseX > anchoMantra_4 && mouseX < anchoMantra_4 + susSM_img[susSM_rand].width
		&& mouseY > susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height + adj_proh_img[adj_proh_rand].height + susPM_img[susPM_rand].height && mouseY < susSM_img[susSM_rand].height + susSM_img[susSM_rand_2].height + adj_proh_img[adj_proh_rand].height + susPM_img[susPM_rand].height + susSM_img[susSM_rand].height){
		console.log("encimaFINAL");
		changeImgSusSM();

		}

	push(); translate(susSM_img[susSM_rand].width,posY);// SUS SIN M (PROGRAMA)

	image(mantra_img[25],posX,posY);
}

function randomTodos(){
	changeImgSusSM();
	changeImgSusSM_2();
	changeImgSusPM();
	changeImgAdjSM();
	changeImgAdjSM_2();
	changeImgProh();
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function changeImgSusSM(){ susSM_rand = Math.floor(Math.random()*susSM_numero); }
function changeImgSusSM_2(){ susSM_rand_2 = Math.floor(Math.random()*susSM_numero); }
function changeImgSusPM(){ susPM_rand = Math.floor(Math.random()*susPM_numero); }

function changeImgAdjSM(){ adjSM_rand = Math.floor(Math.random()*adjSM_numero); }
function changeImgAdjSM_2(){ adjSM_rand_2 = Math.floor(Math.random()*adjSM_numero); }

function changeImgProh(){ adj_proh_rand = Math.floor(Math.random()*adj_proh_numero); }
