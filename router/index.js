const express = require('express')
const router = express.Router()
const ejs = require('ejs');
const bodyparser = require('body-parser')
const db = require('../models/alumno.js')
const axios = require('axios')  

const port = 3001

let alumno = {
    Matricula: "",
    Nombre: "",
    Domicilio: "",
    Sexo: "",
    Especialidad: ""
}

let campos = {
    Matricula: "",
    Nombre: "",
    Domicilio: "",
    Sexo: "",
    Especialidad: ""
}

let datos = [
    {
        matricula: "2020030275",
        nombre: "Pedro Antonio Sanchez Salas",
        sexo: "M",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    },
    {
        matricula: "2020030810",
        nombre: "Carlos Alberto Garcia Medrano",
        sexo: "M",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    },
    {
        matricula: "2020030324",
        nombre: "Victor Uriel Juarez Lugo",
        sexo: "M",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    },
    {
        matricula: "2020030299",
        nombre: "Cristian Genjiro Quintero Sanchez",
        sexo: "M",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    },
    {
        matricula: "2020030397",
        nombre: "Carlos Omar Osuna Pineda",
        sexo: "M",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    },
    {
        matricula: "2020030312",
        nombre: "Lizbet Argelia Padilla Moreno",
        sexo: "F",
        materias: ["Ingles", "Tecnologias 1", "Base de datos"]
    }

]

router.post('/insertar',async(req,res)=>{
    
    alumno = {
        Matricula: req.body.Matricula,
        Nombre: req.body.Nombre,
        Domicilio: req.body.Domicilio,
        Sexo: req.body.Sexo,
        Especialidad: req.body.Especialidad
    }   

    let resultado = await db.insertar(alumno)
    res.json(resultado)
})

router.get('/consultar',async(req,res)=>{

    let resultado = await db.consultar()
    res.json(resultado)
})

router.post('/consultarMatricula',async(req,res)=>{

    Matricula = req.body.Matricula
    let resultado = await db.consultarMatricula(Matricula)
    res.json(resultado)
})

router.post('/eliminar',async(req,res)=>{

    Matricula = req.body.Matricula
    let resultado = await db.eliminar(Matricula)
    res.json(resultado)
})

router.post('/actualizar',async(req,res)=>{

    alumno = {
        Matricula: req.body.Matricula,
        Nombre: req.body.Nombre,
        Domicilio: req.body.Domicilio,
        Sexo: req.body.Sexo,
        Especialidad: req.body.Especialidad
    }   
    let resultado = await db.actualizar(alumno)
    res.json(resultado)
})




router.get('/',(req,res)=>{

    axios({
        method: 'get',
        url: 'http://localhost:3001/consultar',
    })
        .then(function (response) {
            res.render('index.html',{titulo: "Listado de alumnos", listado: response.data, campos:campos})
        });
})

router.post('/consultarPorMatricula',async (req,res)=>{
    Matricula = req.body.Matricula
    let resultado = await db.consultarMatricula(Matricula)
    let lista = await db.consultar()
    res.render('index.html',{titulo: "Listado de alumnos", listado: lista, campos:resultado})
    
})

router.get('/agregar',(req,res)=>{

    axios({
        method: 'post',
        url: 'http://localhost:3001/insertar',
        data: {
            Matricula: req.query.Matricula,
            Nombre: req.query.Nombre,
            Domicilio: req.query.Domicilio,
            Sexo: req.query.Sexo,
            Especialidad: req.query.Especialidad
        }
    })
        .then(function (response) {
            res.redirect('/')
        });
})

router.get('/borrar',(req,res)=>{

    axios({
        method: 'post',
        url: 'http://localhost:3001/eliminar',
        data: {
            Matricula: req.query.Matricula
        }
    })
        .then(function (response) {
            res.redirect('/')
        });
})
router.get('/modificar',(req,res)=>{

    axios({
        method: 'post',
        url: 'http://localhost:3001/actualizar',
        data: {
            Matricula: req.query.Matricula,
            Nombre: req.query.Nombre,
            Domicilio: req.query.Domicilio,
            Sexo: req.query.Sexo,
            Especialidad: req.query.Especialidad
        }
    })
        .then(function (response) {
            res.redirect('/')
        });
})


router.get('/tablas',(req,res)=>{
    

    const valores = {
        tabla:req.query.tabla
    }

    res.render('tablas.html',valores)
    
    

})



router.post('/tablas',(req,res)=>{
    

    const valores ={

        tabla:req.body.tabla

    }
    res.render('tablas.html',valores)
})

router.get("/cotizacion", (req, res) => {
	const valores = {
		valor: req.query.valor,
		pInicial: req.query.pInicial,
		plazos: req.query.plazos,
		pagoInicial: req.query.pagoInicial,
		totalFin: req.query.totalFin,
		pagoMensual: req.query.pagoMensual,
	};
	res.render("cotizacion.html", valores);
});

router.post("/cotizacion", (req, res) => {
	const valores = {
		valor: req.body.valor,
		pInicial: req.body.pInicial,
		plazos: req.body.plazos,
		pagoInicial: req.body.pagoInicial,
		totalFin: req.body.totalFin,
		pagoMensual: req.body.pagoMensual,
	};
	res.render("cotizacion.html", valores);
});


module.exports = router