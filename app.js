const http = require("http")
const express = require("express")
const app = express()
const ejs = require('ejs');
const bodyparser = require('body-parser')
app.set('view engine',"ejs")
app.use(express.static(__dirname +'/public'))

app.use(bodyparser.urlencoded({extended:true}))

const port = 3001



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

app.get('/tablas',(req,res)=>{
    

    const valores = {
        tabla:req.query.tabla
    }

    res.render('tablas',valores)
    
    

})



app.post('/tablas',(req,res)=>{
    

    const valores ={

        tabla:req.body.tabla

    }
    res.render('tablas',valores)
})

app.get('/',(req,res)=>{

    // res.send("Iniciamos con express")
    res.render('index',{titulo: "Listado de alumnos", listado:datos})
    

})
app.get("/cotizacion", (req, res) => {
	const valores = {
		valor: req.query.valor,
		pInicial: req.query.pInicial,
		plazos: req.query.plazos,
		pagoInicial: req.query.pagoInicial,
		totalFin: req.query.totalFin,
		pagoMensual: req.query.pagoMensual,
	};
	res.render("cotizacion", valores);
});

app.post("/cotizacion", (req, res) => {
	const valores = {
		valor: req.body.valor,
		pInicial: req.body.pInicial,
		plazos: req.body.plazos,
		pagoInicial: req.body.pagoInicial,
		totalFin: req.body.totalFin,
		pagoMensual: req.body.pagoMensual,
	};
	res.render("cotizacion", valores);
});


app.listen(port, () => {
    console.log("Iniciando puerto 3001")
  })

  app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + "/public/error.html")
})