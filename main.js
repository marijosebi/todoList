/* DEFINIR COSNTANTES Y VARIABLES */

const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');

const elemento = document.querySelector('#elemento');

const input = document.querySelector('#input');
const boton = document.querySelector('#botonAgregar');

const check = 'bi-record-circle';
const uncheck = 'bi-circle';

const tachado = 'tachado';

//ESTA ES UNA VARIABLE
let LIST;
let id;
//FIN DE LAS VARIABLES 

const FECHA = new Date();

fecha.innerHTML = FECHA.toLocaleDateString('es-mx', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});
//hay una constante que permite acceder a la fecha

//LAS SIGUENTES SON FUNCIONES  
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck; //Esto diferencia si esta hecho o no.
    const line = hecho ? tachado : '';
    const elemento = ` <li id="elemento">
                    // <i id="${id}" data="hecho" class="bi ${realizado}"></i>
                    <p class="tarea-realizada text ${line}">${tarea}</p>
                    <i id="${id}" class="bi bi-x"></i>
                </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
};
function tareaRealizada(element) {
    element.classlist.toggle(check);
    element.classlist.toggle(uncheck);
    element.parentNode.querySelector('.text').classlist.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
};

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
};

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }

});

lista.addEventListener("click", function (event) {
    const element = event.target;
    const elementoData = element.atributes.data.value;

    if (elementoData = "hecho") {
        tareaRealizada(element);
    } else if (elementoData = "eliminar") {
        tareaEliminada(element);
        localStorage.setItem("TODO", JSON.stringify(LIST));
    }
});
let data = localStorage("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(array) {
    array.forEach(
        function (item) {
            agregarTarea(item.nombre, item.id, item.hecho, item.eliminar)
        }
    )
};

// function cargarLista(array) {

//     array.forEach(

//         function (item) {

//             agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);

//         }

//     );

// };




