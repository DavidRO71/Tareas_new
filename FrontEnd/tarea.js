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
//-----------------------------1------------------------------------
function inici() {
  idUsuario = localStorage.getItem("miIDUsuario");
  recuperarCategoriaDesdeAPi();
  document.querySelector(".agregar").onclick = addCategoria;
}

function recuperarCategoriaDesdeAPi() {
  fetch("http://localhost:8080/getAllCategorias")
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".miResultado").insertAdjacentHTML("beforeend",
        `<div class="col-3 miTarjeta">
            <div class="card ">
                <div class="miCard">
                    <h3 class="card-title">${data[0].cate_nombre}</h3>
                    <h5 class="card-id">${data[0].cate_id}</h5>
                    <div class="misTareas">            
                    </div>
                </div>  
            </div>
        </div>`
      );
      mostrarTarea();
      recuperarTareasDesdeAPi();
    })
    .catch((error) => {
      console.log(error);
    });
}

function recuperarTareasDesdeAPi() {
  fetch("http://localhost:8080/getTareaByIDUsuario/" + idUsuario)
    .then((response) => response.json())
    .then((data) => {
      // console.log("Data: ", data);
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
    document.querySelector(".misTareas").insertAdjacentHTML("beforeend",`
      <div id="${objeto[index].tarea_id}">
        <label>${objeto[index].tarea_nombre}</label>
        <div class="botonesTareas">
            <button type="button" id="${objeto[index].tarea_id}" class="borrarTarea" onclick=borrarTarea(this.id)>Borrar tarea</button>
        </div>
      </div>`
    );
  }
}

function borrarTarea(id){
    const child = document.getElementById(`${id}`);
    child.remove();
    //child.parentNode.parentElement.remove();

    fetch('http://localhost:8080/deleteTarea/' + id,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}, 
        //body: JSON.stringify(miNota)
    })
    .then(response => {
        response.json()
    })
    .catch(error => 
        console.log(error)
    );
}

function addCategoria() {
  miCategoria.cate_nombre = document.querySelector("#categoria").value.trim();
  miCategoria.color_id = miNumColor + 1;
  crearCategoria(miCategoria); //este le pasa mi nota a postData
}

function crearCategoria(miCategoria) {
  //recoje mi nota de crearPostIT(miNota)
  if (num > 4) {
    return;
  }

  fetch("http://localhost:8080/createCategoria", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(miCategoria),
  })
    .then((response) => response.json())
    .then((data) => {
      miIDCategoria = data;
      //window.open("./index.html")
      //console.log("OK, Categoria registrada correctamente !" + data + "-- " + miIDCategoria);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  //if (miIDCategoria !="") {
  //console.log("ëntro")
  document.querySelector(".miResultado").insertAdjacentHTML(
    "beforeend",
    `
        <div class="col-3 miTarjeta">
            <div class="card ">
                <div class="miCard">
                    <h3 class="card-title">${miCategoria.cate_nombre}</h3>
                    <div class="misTareas"></div>
                </div>
            </div>
        </div>`
  );
  // <button class="agretarea">Añadir tarea</button>
  //  <button class="borratarea">Borrar tarea</button>
  // document.querySelector(".agretarea").onclick = aTarea;
  // document.querySelector(".borratarea").onclick = bTarea;
  //}
  mostrarTarea();
  num++;
}

function mostrarTarea() {
  document.querySelector(".miCard").insertAdjacentHTML(
    "beforeend",
    `
       <label> Tarea </label>
       <input id="inputarea"></input>
       <button class="guardarTarea">Guardar tarea</button> 
`
  );
  document.querySelector(".guardarTarea").onclick = guardarTarea;
}

function guardarTarea() {
  miTarea.tarea_nombre = document.querySelector("#inputarea").value.trim();
  miTarea.cate_id = miIDCategoria;
  miTarea.usu_id = idUsuario;

  if (miTarea.tarea_nombre == "") {
    alert("Debe informar la tarea antes de guardarla !");
    return;
  }

  fetch("http://localhost:8080/createTarea", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(miTarea),
  })
    .then((response) => response.json())
    .then((data) => {
      miIDTarea = data;
      //window.open("./index.html")
      //console.log("OK, Categoria registrada correctamente !" + data + "-- " + miIDCategoria);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

    mostrarTareaPantalla(miTarea)
  // document.querySelector(".misTareas").insertAdjacentHTML(
  //   "beforeend",
  //   `
  //           <label>${miTarea.tarea_nombre}</label>
  //           <div class="botonesTareas">
  //               <button type="button" id="${miTarea.tarea_id}" class="borrarTarea" onclick=borrarTarea(this.id)>Borrar tarea</button>
  //           </div>`
  // );

  document.querySelector("#inputarea").value = "";
  document.querySelector("#inputarea").focus();
}

function mostrarTareaPantalla(miTarea){

  // for (let index = 0; index < objeto.length; index++) {
  //   console.log("Index: ", index, "-- ", tareaTemp[index].tarea_nombre)
  //   document.querySelector(".misTareas").insertAdjacentHTML("beforeend",`
  //       <div>
  //           <label>${tareaTemp[index].tarea_nombre}</label>
  //           <div class="botonesTareas">
  //               <button type="button" id="${tareaTemp[index].tarea_id}" class="borrarTarea" onclick=borrarTarea(this.id)>Borrar tarea</button>
  //           </div>
  //       </div>`
  //   );
  //   console.log("FIN: ", index)
  // }



  document.querySelector(".misTareas").insertAdjacentHTML(
    "beforeend",
    `
            <label>${miTarea.tarea_nombre}</label>
            <div class="botonesTareas">
                <button type="button" id="${miTarea.tarea_id}" class="borrarTarea" onclick=borrarTarea(this.id)>Borrar tarea</button>
            </div>`
  );
}

function bTarea() {
  const child = document.getElementById(`${i}`);
  child.parentNode.parentElement.remove();
}

/* <button type="button" id="${objNota.note_id}" class="btn btn-danger btnBorrar" onclick=borrarPostIt(this.id)>Borrar</button> */

/*



async function recuperarPostITDesdeAPI() {

    fetch('http://localhost:8080/getAllNotes')
    .then(response => response.json())
    .then(data => {
        // console.log(data),
        //miTabla = data,
        // console.log(miTabla),
        crearPostITDesdeAPI(data)
    })
    .catch(error => {
        console.log(error)
    });
}*/

/*
async function crearPostITDesdeAPI(data){
    //console.log("cracion: ", data)
    for (const objeto of data) {
        // miID = objeto._id;
        // miTitle = objeto._title;
        // miMessage = objeto._message;
        crearPostIT(objeto)
    }
}*/

/*------------------------------BORRAR ------------------------------------------------------
function creaBloque(nota){
    //elemento padre!!
    //let parent = document.querySelector(".contenedor");
    
    //insertAdjacentHTML = MALO!
    //createElement = BUENO!
    let dCaja = document.createElement("div");
    dCaja.id = nota._id;
    dCaja.className = "caja";
    //parent.appendChild(div1);
    let dTitle = document.createElement("div");
    dTitle.innerText = nota._title;
    let dMessage = document.createElement("div");
    dMessage.className = "nieto"
    dMessage.innerText = nota._message;
    dCaja.appendChild(dTitle);
    dCaja.appendChild(dMessage);
    document.querySelector(".contenedor").appendChild(dCaja);
  }------------------------------------------------------------------------------------------*/

/*




function postData(miNota) {
    fetch('http://localhost:8080/createNote',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(miNota)
    })
    .then(response => response.json())
    .then(data => {
        //console.log("Data: ",data)
        miNota.note_id = data
        crearPostIT(miNota)//esta nota lo pasa a crearPostIT
    })
    .then(res => {
        console.log("Request complete! response:", res);
    });
}

function borrarPostIt(id) {
    //alert("entro"+ this.parentNode.cpt)
    console.log("entro: ", id);
    miID = id
    deleteAPI(id)
}

async function deleteAPI(id){
    fetch('http://localhost:8080/desactivarNote/' + id,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        //body: JSON.stringify(miNota)
    })
    .then(response => {
        response.json()
        document.querySelector(`#${id}`).parentNode.remove();
    })
    .then(res => {
        console.log("Request complete! response:", res);
    });
}



// ********************************************************************
// ********************************************************************
// ********************************************************************
// ********************************************************************







function recuperarPostITDesdeLocalStorage(){
    crear = false
    let misObjetos = localStorage.getItem("miTabla");
    if (misObjetos != null){
        //console.log("misObjetos: ", misObjetos)
        miTabla = JSON.parse(misObjetos);

        for (const objeto of miTabla) {
            miID = objeto.id;
            titulo = objeto.titulo;
            descripcion = objeto.message;
            crearPostIT()
        }
        crear = true;
    } else{
        document.querySelector(".miResultado").innerHTML = ""
    }
}





async function llamarAPI(){
    await postData('http://5.135.119.239:3090/notes', { title: titulo, content: descripcion })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      miID = data.note_id
      //console.log("miID: ", miID)
    });
}



async function getData(url = 'http://5.135.119.239:3090/notes') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function delData(url = 'http://5.135.119.239:3090/notes/' + id) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


*/
