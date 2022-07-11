window.onload = inici;

let num = 0;
let miNumColor = 0;
let miIDCategoria = 0;
let miIDTarea = 0;
let idUsuario = 0;
let tareaTemp;

let i = 1;
let miCategoria = { cate_id: 0, cate_nombre: "", color_id: 0, cate_activo: 1 };
let miTarea = {
  tarea_id: 0,
  tarea_nombre: "",
  cate_id: 0,
  tarea_activo: 1,
  usu_id: 1,
};
let miColor=["yellow","cyan","lime","orange"];
//-----------------------------1------------------------------------
function inici() {
  idUsuario = localStorage.getItem("miIDUsuario");
  document.querySelector("#menu").onchange = recuperarIDCategoria;
  recuperarCategoriaDesdeAPi();
  document.querySelector(".agregar").onclick = guardarTarea;
  rellenarComboCategorias();
}

function recuperarIDCategoria() {
  miIDCategoria= this.options[this.selectedIndex].value;
}

function rellenarComboCategorias(){
  fetch("http://localhost:5000/getAllCategorias")
  .then((response) => response.json())
  .then((data) => {
    for (let index = 0; index < data.length; index++) {
      document.querySelector("#menu").insertAdjacentHTML("beforeend",`
      <option class="miLI" value=${data[index].cate_id}>${data[index].cate_nombre}</option>`
      );

      document.getElementsByClassName("miLI")[index +1].style.backgroundColor=miColor[index];
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

function recuperarCategoriaDesdeAPi() {
  fetch("http://localhost:5000/getAllCategorias")
    .then((response) => response.json())
    .then((data) => {
      // mostrarTarea();
      recuperarTareasDesdeAPi();
    })
    .catch((error) => {
      console.log(error);
    });
}

function recuperarTareasDesdeAPi() {
  fetch("http://localhost:5000/getTareaByIDUsuario/" + idUsuario)
    .then((response) => response.json())
    .then((data) => {
      //console.log("Data: ", data);
      tareaTemp = data;
    mostrar(tareaTemp);
    })
    .catch((error) => {
      console.log(error);
    });
}

//Mostramos la tareas que hemos recuperado de la BD
function mostrar(objeto) {
  for (let index = 0; index < objeto.length; index++) {

    document.querySelector(".miResultado").insertAdjacentHTML("beforeend",`
    <div class="miTarea">
      <div id="${objeto[index].tarea_id}">
        <label>${objeto[index].tarea_nombre}</label>
        </div>
        <div class="botonesTareas">
            <button type="button" id="${objeto[index].tarea_id}" class="close-icon" onclick=borrarTarea(this.id)></button>
        </div>
     
      </div>`
    );
    // document.getElementsByClassName("miTarea").style.backgroundColor=miColor[objeto[index].cate_id];
    document.getElementsByClassName("miTarea")[index].style.backgroundColor = miColor[objeto[index].cate_id -1];


  }
}

function borrarTarea(id){
    const child = document.getElementById(`${id}`);
    // child.remove();
    child.parentNode.remove();

    fetch('http://localhost:5000/deleteTarea/' + id,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}, 
        // body: JSON.stringify(miNota)
    })
    .then(response => {
        response.json()
    })
    .catch(error => 
        console.log(error)
    );
}


function guardarTarea() {

  miTarea.tarea_nombre = document.querySelector("#tarea").value.trim();
  miTarea.cate_id = miIDCategoria;
  miTarea.usu_id = idUsuario;

  if (miTarea.tarea_nombre == "") {
    alert("Debe informar la tarea antes de guardarla !");
    return;
  }

  if (miIDCategoria == 0) {
    alert("Debe informar la categoria antes de guardarla !");
    return;
  }

  fetch("http://localhost:5000/createTarea", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(miTarea),
  })
    .then((response) => response.json())
    .then((data) => {
      miIDTarea = data;
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

    mostrarTareaPantalla(miTarea)

  miIDCategoria = 0
  document.querySelector("#tarea").value = "";
  document.querySelector("#tarea").focus();
}

function mostrarTareaPantalla(miTarea){

  document.querySelector(".miResultado").insertAdjacentHTML("beforeend",`
    <div class="miTarea">
      <div id="${miTarea.tarea_id}">
        <label>${miTarea.tarea_nombre}</label>
        </div>

        <div class="botonesTareas">
            <button type="button" id="${miTarea.tarea_id}" class="close-icon" onclick=borrarTarea(this.id)></button>
        </div>
     
      </div>`
    );

    let getLastElemIndex = document.getElementsByClassName("miTarea").length - 1;
    document.getElementsByClassName("miTarea")[getLastElemIndex].style.backgroundColor = miColor[miTarea.cate_id -1];
}
