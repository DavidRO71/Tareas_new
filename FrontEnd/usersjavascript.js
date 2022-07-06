window.onload = inici;

let login = "";
let password = "";
let idUsuario = 0;

function inici() {
    localStorage.removeItem("miIDUsuario");
    document.querySelector(".btnsesion").onclick = comprobarLogin;
    
}

function comprobarLogin() {
    login = document.querySelector("#login_usu").value.trim();
    password = document.querySelector("#password_usu").value.trim();

    fetch('http://localhost:5000/findByLogin/' + login)
        .then(response => 
            response.json()
        )
        .then(data => {
            if (data){
                comprobarLoginYPwd(login, password);
            }
        })
        .catch(error => {
            // console.log("Usuario no Registrado, ¡ Registrate !");
            alert("El Usuario no existe, ¡ Registrate !");
        }
    );
        
}

function comprobarLoginYPwd(login, password){
    fetch('http://localhost:5000/comprobarLoginPwd/' + login + "&" + password)
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
        alert("El Usuario Y/O Contraseña son incorrectos !");
    }
);
}