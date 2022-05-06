
// tengo un emprendimiento relacionado con la venta e instalacion de sistemas de climatizacion sustentable. 
// Mi proyecto se trata acerca de un cotizador para calcular el costo de un equipo para climatizacion de hogares o piscina 


// declaro funciones

/*


function cotizar() {

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
    } while (opcion != "x");
}

function cargarHab() {

    for (let i = 0; i < 4; i++) {
        const habitacion = prompt("ingrese 4 habitaciones");
        hab.push(habitacion);
        console.log(hab)
    }

    alert(`el array ingresado es ${hab}`);
}

const borrarHab = () => {

    let eliminar = prompt("ingrese que habitacion desea eliminar");
    let i = hab.indexOf(eliminar);
    if (i == -1) {
        alert("Nombre incorrecto ingresado");
    } else {
        hab.splice(i, 1);
        alert(`el array resultante es ${hab}`);
    }
}
//inicio

const cotizador = document.querySelector("#ctz");
const habitaciones = document.querySelector("#hab");
const bohab = document.querySelector("#bohab");
const hab = [];

cotizador.onclick = () => { cotizar() };
habitaciones.addEventListener("click", cargarHab);
bohab.addEventListener("click", borrarHab);

cotizador.addEventListener("mouseover", () => {
    console.log("pasaste por cotizador");
})

*/


//tomo los datos del usuario

const select = document.querySelector("#selectProducto");
const ancho = document.querySelector("#ancho");
const largo = document.querySelector("#largo");
const btnCotizar = document.querySelector("#ctz");

let inputTipo = select.onchange = () => {
    inputTipo = select.value;
    console.log(`el usuario selecciono ${inputTipo}`);
}

let inputAncho = ancho.onchange = () => {
    inputAncho = parseFloat(ancho.value);
    console.log(inputAncho);
}

let inputLargo = largo.onchange = () => {
    inputLargo = parseFloat(largo.value);
    console.log(inputLargo);
}

//declaro funciones para cotizar

function termosuelo() {
    let ancho = inputAncho;
    let largo = inputLargo;
    let area = ancho * largo;
    let costo = area * 23.50;
    alert(`El costo de Termosuelo para tu habitacion de ${area} M2 es de U$D ${costo} + IVA`);
}
function bombaDeCalor() {
    let ancho = inputAncho;
    let largo = inputLargo;
    let profundidad = 1.40;
    let volumen = ancho * largo * profundidad;
    let costo = 0;
    if (volumen > 200) {
        costo = 1500 + (volumen * 10.50);
    } else {
        costo = 800 + (volumen * 10.50);
    }
    alert(`El costo de Bomba de calor para tu piscina de ${volumen * 1000} Litros es de U$D ${costo} + IVA`);
}

//lanzo la cotizacion y almaceno el objeto en el array y en el local storage

const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

class Producto {
    constructor(tipo, ancho, largo) {
        this.tipo = tipo;
        this.ancho = ancho;
        this.largo = largo;
    }
}
const nuevoProducto = () => {
    let tipo = inputTipo;
    let ancho = inputAncho;
    let largo = inputLargo;
    let producto = new Producto(tipo, ancho, largo);
    listaProductos.push(producto);
    console.log("producto almacenado en el array");
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    console.log("producto almacenado en el storage");
}


btnCotizar.onclick = (e) => {
    e.preventDefault();
    switch (inputTipo) {
        case "termosuelo":
            nuevoProducto();
            termosuelo();
            break;

        case "bombaDeCalor":
            nuevoProducto();
            bombaDeCalor();
            break;

        default: alert("seleccione un producto para cotizar");
            break;
    }
}