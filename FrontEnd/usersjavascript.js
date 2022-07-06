window.onload = inici;

let login = "";
let password = "";
let idUsuario = 0;

function inici() {
    localStorage.removeItem("miIDUsuario");
    document.querySelector(".btnsesion").onclick = comprobarUsuarioContrasenya;
    
}

function comprobarUsuarioContrasenya() {
    login = document.querySelector("#login_usu").value.trim();
    password = document.querySelector("#password_usu").value.trim();
   
    fetch('http://localhost:8080/comprobarLoginPwd/' + login + "&" + password)
        .then(response => 
            response.json()
        )
        .then(data => {
            if (data){
                //Agregar la variable idUsuario al localstorage
                localStorage.setItem("miIDUsuario", data.usu_id);
                
                //Abrir la pagina de las tareas automaticamente
                //console.log("voy a la pagina de Javi")
                window.location = './tarea.html';
            }
        })
        .catch(error => {
            // console.log("Usuario no Registrado, ¡ Registrate !");
            alert("Usuario no Registrado, ¡ Registrate !");
        }
    );
        
}