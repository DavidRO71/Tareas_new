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

        alert("Contraseñas no identicas");
    } else {
        fetch('http://localhost:5000/createUsuario', {
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
