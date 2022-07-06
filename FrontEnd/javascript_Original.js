window.onload = inici;

let titulo = "";
let descripcion = "";
let miID = "";
let cpt = 0;
let miTabla=[]; 
let crear = false;

function inici() {
    // recuperarPostITDesdeLocalStorage()
    recuperarPostITDesdeAPI();
    document.querySelector(".btnAnyadir").onclick = addPostIt;
    // document.querySelector(".btnllamarAPI").onclick = llamarAPI;
}

async function addPostIt() {
    titulo = document.querySelector("#titulo").value.trim();
    descripcion = document.querySelector("#descripcion").value.trim();

    await crearPostIT()

    miTabla.push({"ID": miID,"titulo":titulo,"descripcion":descripcion});

    localStorage.setItem("miTabla", JSON.stringify(miTabla));

    document.querySelector("#titulo").value = "";
    document.querySelector("#descripcion").value = "";
    document.querySelector("#titulo").focus();

}

function borrarPostIt(id) {
    //alert("entro"+ this.parentNode.cpt)
    //console.log("entro: ", this.value.trim());
    miID = id
    deleteAPI()
    this.parentNode.remove()
}

function recuperarPostITDesdeLocalStorage(){
    crear = false
    let misObjetos = localStorage.getItem("miTabla");
    if (misObjetos != null){
        //console.log("misObjetos: ", misObjetos)
        miTabla = JSON.parse(misObjetos);

        for (const objeto of miTabla) {
            miID = objeto.miID;
            titulo = objeto.titulo;
            descripcion = objeto.descripcion;
            crearPostIT()
        }
        crear = true;
    } else{
        document.querySelector(".miResultado").innerHTML = ""
    }
}

async function recuperarPostITDesdeAPI(){
    crear = false
    let misObjetos;

    await getData('http://5.135.119.239:3090/notes')
    .then(data => {
      //console.log(data); // JSON data parsed by `data.json()` call
      //console.log("datos: ", data)
      misObjetos = data.notes;
    });

    if (misObjetos != null){
        for (let index = 0; index < misObjetos.length; index++) {
            miID = misObjetos[index]._id;
            titulo = misObjetos[index].title;
            descripcion = misObjetos[index].content;
            crearPostIT()
        }
        crear = true;
    } else{
        document.querySelector(".miResultado").innerHTML = ""
    }
}

async function crearPostIT(){
    if (crear){
        await llamarAPI()        
    }

    document.querySelector(".miResultado").insertAdjacentHTML("beforeend", `
    <div class="col-3 miTarjeta">
        <div class="card ">
            <div class="card-body miCard">
                <h5 class="card-title">${titulo}</h5>
                <h6 class="card-title">${descripcion}</h6>
                <p class="miID">${miID}</p>
            </div>
            <button type="button" id="${miID}" class="btn btn-danger btnBorrar" onclick=borrarPostIt(this.id)>Borrar</button>
        </div>
    </div>`);

    // cpt = document.querySelectorAll(".btnBorrar").length -1;
    // document.querySelectorAll(".btnBorrar")[cpt].onclick = borrarPostIt;
}

async function deleteAPI(){
    await delData('http://5.135.119.239:3090/notes/' + miID)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      //miID = data.note_id
      //console.log("miID: ", miID)
    });
}

async function llamarAPI(){
    await postData('http://5.135.119.239:3090/notes', { title: titulo, content: descripcion })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      miID = data.note_id
      //console.log("miID: ", miID)
    });
}

async function postData(url = 'http://5.135.119.239:3090/notes', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = 'http://5.135.119.239:3090/notes') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
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