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

    fetch('http://44.194.9.34:5000/findByLogin/' + login)
        .then(response => 
            response.json()
        )
        .then(data => {
            if (data){
                //AQUI TIENES QUE DESENCRIPTAR LA CONTRASEÑA
                let miContrasenyaDesEncriptada = CryptoJS.AES.decrypt(data.usu_password, "laClaveSecretaDeLOSaTRevidOS").toString(CryptoJS.enc.Utf8);
                //console.log("miContrasenyaEncriptada 1 : ", miContrasenyaDesEncriptada)
                if (password == miContrasenyaDesEncriptada){
                    //Agregar la variable idUsuario al localstorage
                    localStorage.setItem("miIDUsuario", data.usu_id);
                                
                    //Abrir la pagina de las tareas automaticamente
                    //console.log("voy a la pagina de Javi")
                    window.location = './tarea.html';
                } else {
                    //alert("Usuario y/o contraseña incorrecta");
                    Swal.fire({
                        title: 'Parece que ha habido un error!',
                        text: 'Usuario y/o contraseña incorrecta',
                        icon: 'error',
                        confirmButtonText: 'Es lo que hay !!!'
                      })
                }
                //comprobarLoginYPwd(login, miContrasenyaEncriptada);
            }
        })
        .catch(error => {
            // console.log("Usuario no Registrado, ¡ Registrate !");
            //alert("El Usuario no existe, ¡ Registrate !");
            Swal.fire({
                title: 'Parece que ha habido un error!',
                text: 'El Usuario no existe, ¡ Registrate !',
                icon: 'error',
                confirmButtonText: 'Es lo que hay !!!'
              })
        }
    );
        
}

// function comprobarLoginYPwd(login, password){
//     fetch('http://44.194.9.34:5000/comprobarLoginPwd/' + login + "&" + password)
//     .then(response => 
//         response.json()
//     )
//     .then(data => {
//         if (data){
//             //Agregar la variable idUsuario al localstorage
//             localStorage.setItem("miIDUsuario", data.usu_id);
            
//             //Abrir la pagina de las tareas automaticamente
//             //console.log("voy a la pagina de Javi")
//             window.location = './tarea.html';
//         }
//     })
//     .catch(error => {
//         // console.log("Usuario no Registrado, ¡ Registrate !");
//         alert("El Usuario Y/O Contraseña son incorrectos !");
//     }
//     );
// }