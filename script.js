
// tengo un emprendimiento relacionado con la venta e instalacion de sistemas de climatizacion sustentable. 
// Mi proyecto se trata acerca de un cotizador para calcular el costo de un equipo para climatizacion de hogares o piscina 


// declaro funciones

 function termosuelo() {
    let ancho = parseInt(prompt("ingresa el ancho de la habitacion"));
    let largo = parseInt(prompt("ingresa el largo de la habitacion"));
    let area = ancho * largo;
    let costo = area * 23.50;
    alert(`El costo de Termosuelo para tu habitacion de ${area} M2 es de U$D ${costo} + IVA`);
}

function bombaDeCalor() {
    let ancho = parseInt(prompt("ingresa el ancho de la Piscina"));
    let largo = parseInt(prompt("ingresa el largo de la Piscina"));
    let profundidad = parseInt(prompt("la profundidad de la Piscina"));
    let volumen = ancho * largo * profundidad;
    let costo = 0;
    if (volumen > 200) {
        costo = 1500 + (volumen * 10.50);
    } else {
        costo = 800 + (volumen * 10.50);
    }
    alert(`El costo de Bomba de calor para tu piscina de ${volumen * 1000} Litros es de U$D ${costo} + IVA`);
}

//inicio

alert("Bienvenido al cotizador de Climatizacion Sustentable! para iniciar selecciona una opcion...");

let opcion = prompt("a-Termosuelo b-Bomba de Calor x-SALIR");

do {
    switch (opcion) {
        case "a":
            termosuelo();
            alert("Gracias por cotizar Termosuelo! te esperamos pronto!");
            opcion = prompt("a-Termosuelo b-Bomba de Calor x-SALIR");
            break;

        case "b":
            bombaDeCalor();
            alert("Gracias por cotizar Bomba de Calor! te esperamos pronto!");
            opcion = prompt("a-Termosuelo b-Bomba de Calor x-SALIR");
            break;

        case "x":
            alert("Gracias por utilizar el cotizador! te esperamos pronto!");

            break;

        default:
            alert("Opcion Incorrecta.")
            opcion = prompt("a-Termosuelo b-Bomba de Calor x-SALIR");

            break;
    }
} while (opcion !="x");


const hab= [];

for (let i = 0; i < 4; i++) {
    const habitacion = prompt("ingrese 4 habitaciones");
    hab.push(habitacion);
    console.log(hab) 
}

alert(`el array ingresado es ${hab}`);


// declaro una funcion para borrar

const borrar=(eliminar)=> {
    let i= hab.indexOf(eliminar);
    if (i==-1){
        alert("Nombre incorrecto ingresado");
    }else{
        hab.splice(i,1);
    }
}

// utilizo la funcnion borrar

let eliminar=prompt("ingrese que habitacion desea eliminar");
borrar(eliminar);
alert(`el array resultante es ${hab}`);
