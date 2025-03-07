window.onload = inici;

let login = "";
let password = "";
let repassword = "";
let nombre = "";
let apellido = "";
let miUsu = { usu_id: 0, usu_login: "", usu_password: "", usu_nombre: "", usu_apellido: "", usu_activo: 1 };

function inici() {
    document.querySelector(".btnregistro").onclick = crearUsuario;
}


function crearUsuario() {
    miUsu.usu_login = document.querySelector("#login_usu").value.trim();
    miUsu.usu_password = document.querySelector("#password_usu").value.trim();
    miUsu.usu_nombre = document.querySelector("#nombre_usu").value.trim();
    miUsu.usu_apellido = document.querySelector("#apellido_usu").value.trim();

    repassword = document.querySelector("#repassword_usu").value.trim();

    if (miUsu.usu_password != repassword) {
        //Contraseñas no identicas
        //poner los 2 campos en rojo 
        document.querySelector("#password_usu").style.color="red";
        document.querySelector("#repassword_usu").style.color="red";

        //alert("Contraseñas no identicas");
        Swal.fire({
            title: 'Parece que ha habido un error!',
            text: 'Las Contraseñas introducidas no son identicas',
            icon: 'error',
            confirmButtonText: 'ohhhhh'
          })
    } else {

        //ENCRIPTAMOS LA CONTRASEÑA PARA GUARDARLA EN LA BASE DE DATOS
        let miContrasenyaEncriptada = CryptoJS.AES.encrypt(repassword, "laClaveSecretaDeLOSaTRevidOS").toString();
        let miContrasenyaEncriptada2 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(repassword), "laClaveSecretaDeLOSaTRevidOS").toString();
        miUsu.usu_password = miContrasenyaEncriptada;

        // console.log("pwd: ", miContrasenyaEncriptada);
        // console.log("pwd2: ", miContrasenyaEncriptada2);
        
        fetch('http://44.194.9.34:5000/createUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(miUsu)
        })
            .then(response => response.json())
            .then(data => {
                window.open("./index.html")
            })
            .catch(error => {
                console.log("Error: ", error);
            });


    }

}
