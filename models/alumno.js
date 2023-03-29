const json = require('express/lib/response');
const resolve = require('path/posix');
const promise = require('../models/conexion.js');
const conexion = require('../models/conexion.js');

var alumnodb = {}

alumnodb.insertar = function insertar(alumno){
    return new Promise(function(resolve, reject){
        console.log(alumno)
        var query = 'INSERT INTO alumno SET ?'
        conexion.query(query, alumno, function(err, result){
            if(err){
                reject(err.message)
            }else{
                resolve({
                    idAlumno: result.insertId,
                    Matricula: alumno.Matricula,
                    Nombre: alumno.Nombre,
                    Domicilio: alumno.Domicilio,
                    Sexo: alumno.Sexo,
                    Especialidad: alumno.Especialidad
                })
            }
        })
    })
}

alumnodb.consultar = function consultar(){
    let alumno = {}
    return new Promise(function(resolve, reject){
        
        var query = 'SELECT * FROM alumno'
        conexion.query(query, function(err, rows){
            if(err){
                reject(err.message)
            }else{
                console.log(rows)
                alumno = rows
                resolve(alumno)
                
            }
        })
    })
}

alumnodb.consultarMatricula = function consultarMatricula(matricula){
    return new Promise(function(resolve, reject){
        let alumno = []
        var query = 'SELECT * FROM alumno WHERE Matricula = ?'
        conexion.query(query, matricula, function(err, rows){
            if(err){
                reject(err.message)
            }else{
                alumno = rows
                resolve(alumno)
            }
        })
    })
}

alumnodb.actualizar = function actualizar(alumno){
    return new Promise(function(resolve, reject){
        //  alumno, matricula
        // let matricula = alumno.matricula
        // delete alumno.matricula
        // for(var k in alumno) {
        //    if(alumno[k] == null || alumno[k] == ""){
        //     delete alumno.k
        //    }
        // }
        // var query = ' UPDATE  alumno SET ? WHERE Matricula = ?'
        var query = 'UPDATE alumno SET Nombre = ?,  Domicilio = ?,  Sexo = ?, Especialidad = ? WHERE Matricula = ?'
        conexion.query(query, [alumno.Nombre, alumno.Domicilio, alumno.Sexo, alumno.Especialidad, alumno.Matricula], function(err, result){
            if(err){
                reject(err.message)
                
            }else{
                alumno = result
                resolve(alumno)
            }
        })
    })
}


alumnodb.eliminar = function eliminar(matricula){
    return new Promise(function(resolve, reject){
        conexion.query('DELETE FROM alumno WHERE Matricula = ?', matricula, function(err, result){
            if(err){
                reject(err)
            }else{
                console.log(result.affectedRows + " registro eliminado")
                console.log(result.affectedRows + " registro eliminado")
                resolve(result.affectedRows)
            }
        })
    })
}

module.exports = alumnodb

    


        
