
// tengo un emprendimiento relacionado con la venta e instalacion de sistemas de climatizacion sustentable. 
// Mi proyecto se trata acerca de un cotizador para calcular el costo de un equipo para climatizacion de hogares o piscina 



//tomo los datos del usuario

const select = document.querySelector("#selectProducto");
const ancho = document.querySelector("#ancho");
const largo = document.querySelector("#largo");
const btnCotizar = document.querySelector("#ctz");
const btnClear = document.querySelector("#clear")
const ambientes = document.querySelector("#ambientes");
const tc = document.querySelector("#tc")

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
    swal({
        text: `El costo de Termosuelo para tu habitacion de ${area} M2 es de U$D ${costo} + IVA`,
        // NO PUEDO HACER QUE ESTO FUNCIONE ---> iconHtml: '<img src="https://www.climatizacion-sustentable.com/wp-content/uploads/2021/06/termosuelo.jpg">' ,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'termosuelo',
        icon: "success",
    });
    return costo;
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
    swal({
        text: `El costo de Bomba de calor para tu piscina de ${volumen * 1000} Litros es de U$D ${costo} + IVA`,
        // NO PUEDO HACER QUE ESTO FUNCIONE ---> iconHtml: '<img src="https://www.climatizacion-sustentable.com/wp-content/uploads/2021/06/wega-logo-web.jpg">' ,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Bomba de Calor',
        icon: "success",
    });
    return costo;
}

//lanzo la cotizacion y almaceno el objeto en el array y en el local storage

const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

class Producto {
    constructor(tipo, ancho, largo, preciousd) {
        this.tipo = tipo;
        this.ancho = ancho;
        this.largo = largo;
        this.preciousd = preciousd;
    }
}
const nuevoProducto = (funcioncotizadora) => {
    let tipo = inputTipo;
    let ancho = parseFloat(inputAncho);
    let largo = parseFloat(inputLargo);
    let preciousd = funcioncotizadora;
    let producto = new Producto(tipo, ancho, largo, preciousd);
    listaProductos.push(producto);
    console.log("producto almacenado en el array");
    localStorage.setItem("productos", JSON.stringify(listaProductos));
    console.log("producto almacenado en el storage");
}


btnCotizar.onclick = (e) => {

    e.preventDefault()
    switch (inputTipo) {
        case "termosuelo":
            nuevoProducto(termosuelo());
            break;

        case "bombaDeCalor":
            nuevoProducto(bombaDeCalor());
            break;

        default: swal({ text: "seleccione un producto para cotizar", icon: "error" });
            break;
    }
}

btnClear.onclick = (e) => {
    e.preventDefault()
    let lista = JSON.parse(localStorage.getItem("productos") || []);
    lista.splice(lista.length - 1, 1)
    localStorage.setItem("productos", JSON.stringify(lista));
}




const printCotizacion = () => {
    fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
        .then((response) => response.json())
        .then(data => cotizacion = data)
        .then((data) => {

            for (let i = 0; i < 2; i++) {
                console.log(data[i]);

                tc.innerHTML += `
            <div class="tipoCambio"><h3> ${data[i].casa.nombre} </h3>
            <p> TC compra $${data[i].casa.compra} </p>
            <p> TC Venta $${data[i].casa.venta} </p></div>
            `
            }
        })

}

const printAmbientes = () => {
    let lista = JSON.parse(localStorage.getItem("productos") || []);

    console.log(lista)

    for (const producto of lista) {

        if (producto.tipo == "termosuelo") {
            ambientes.innerHTML += `
        <li class="lista"> <img src="https://www.climatizacion-sustentable.com/wp-content/uploads/2021/06/termosuelo.jpg" alt="termosuelo"> ${producto.tipo} - Superficie ${producto.ancho * producto.largo}M2   --> Costo U$d Oficial $${producto.preciousd}  </li>
        `
        } else {
            ambientes.innerHTML += `
            <li class="lista"> <img src="https://www.climatizacion-sustentable.com/wp-content/uploads/2021/06/wega-logo-web.jpg" alt="bba calor"> ${producto.tipo} - Volumen ${producto.ancho * producto.largo*1.4*1000} l   --> Costo U$d Oficial $${producto.preciousd}  </li>
            `
        }
    }
};

printCotizacion();
printAmbientes();