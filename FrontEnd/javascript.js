window.onload = inici;

let titulo = "";
let descripcion = "";
let miID = "";
let cpt = 0;
let miTabla=[]; 
let crear = false;
let miNota = {note_id: 0, note_title: "", note_message: "", note_activo: 1, note_uc: "", note_um: "", note_fm: ""};

function inici() {
    recuperarPostITDesdeAPI();
    document.querySelector(".btnAnyadir").onclick = addPostIt;
}

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
}

async function crearPostITDesdeAPI(data){
    //console.log("cracion: ", data)
    for (const objeto of data) {
        // miID = objeto._id;
        // miTitle = objeto._title;
        // miMessage = objeto._message;
        crearPostIT(objeto)
    }
}

async function crearPostIT(objeto){
    // if (crear){
    //     await llamarAPI()        
    // }

    document.querySelector(".miResultado").insertAdjacentHTML("beforeend", `
    <div class="col-3 miTarjeta">
        <div class="card ">
            <div class="card-body miCard">
                <h5 class="card-title">${objeto.note_title}</h5>
                <h6 class="card-title">${objeto.note_message}</h6>
                <p class="miID">${objeto.note_id}</p>
            </div>
            <button type="button" id="${objeto.note_id}" class="btn btn-danger btnBorrar" onclick=borrarPostIt(this.id)>Borrar</button>
        </div>
    </div>`);
}

function addPostIt() {
    miNota.note_title = document.querySelector("#note_title").value.trim();
    miNota.note_message = document.querySelector("#note_message").value.trim();
    miNota.note_id = 0;
    postData(miNota)
}


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
        crearPostIT(miNota)
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