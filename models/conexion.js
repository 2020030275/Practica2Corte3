const mysql = require("mysql2")

const conexion = mysql.createConnection({
    host: "localhost",

    // Your username
    user: "root",

    // Your password
    password: "Contra123_.",

    database: "sistema"


    
})




conexion.connect(function(err){
    if(err) {
        console.log(err.message)
    }else{
        console.log("Conectado a la base de datos")
    }

})

module.exports = conexion