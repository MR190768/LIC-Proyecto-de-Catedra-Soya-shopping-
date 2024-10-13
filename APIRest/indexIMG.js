import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import multer from "multer"; // Importa multer
import bycript from "bcrypt";

const app = express();
const skey = "Qg5I7eOc?*";
var contador;
let tokenblacklist = [];

// Configuración de multer para almacenar las imágenes
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/usuarios/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Nombre del archivo
    }
});

// Configuración de multer para almacenar las imágenes
const storageNego = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/nego/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Nombre del archivo
    }
});

// Configuración de multer para almacenar las imágenes
const storageProd = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/produ/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname); // Nombre del archivo
    }
});

const uploadUser = multer({ storage: storageUser });
const uploadNego=multer({ storage: storageNego });
const uploadProd=multer({ storage: storageProd });

var DBconexion = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    database: "lic",
    user: "root",
    password: "password"
});



app.use(bodyParser.json());
app.use(cors());

// Ruta para registrar usuario con subida de imagen
app.post("/img/user", uploadUser.single('imagen'), (req, res) => {
        const { Name } = req.body;
                const nuevoUsuario = {
                    usuarioName: Name,
                    ImagenP: req.file.path
                };

                var sqlInser = DBconexion.query("UPDATE usuario SET ImagenP= ? WHERE usuarioName= ?", [nuevoUsuario.ImagenP,nuevoUsuario.usuarioName], function (error, results, fields) {
                    if (error) {
                        return res.status(500).send({ status: "FAIL", message: "no se guardo la imagen" });
                    } 
                })

res.status(200).send({ status: "OK", message: "Se Subio imagen" });
});

// Ruta para registrar usuario con subida de imagen
app.post("/img/negocio", uploadNego.single('imagen'), (req, res) => {
    const { Name } = req.body;
            const nuevoNegocio = {
                usuarioNegocio: Name,
                ImagenP: req.file.path,
            };
            var sqlInser = DBconexion.query("UPDATE negocio SET Imagen= ? WHERE nombreN= ?", [nuevoNegocio.ImagenP,nuevoNegocio.negocioName], function (error, results, fields) {
                if (error) {
                    return res.status(500).send({ status: "FAIL", message: "no se guardo la imagen" });
                } 
            })

res.status(200).send({ status: "OK", message: "Se Subio imagen" });
});

app.post("/img/produ", uploadProd.single('imagen'), (req, res) => {
    const { id } = req.body;
            const nuevoproducto = {
                idP: id,
                ImagenP: req.file.path
            };
            

            var sqlInser = DBconexion.query("UPDATE producto SET ImagenP=? WHERE id_producto=? ", [nuevoproducto.ImagenP,nuevoproducto.idP], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    return res.status(500).send({ status: "FAIL", message: "no se guardo la imagen" });
                } 
            })

res.status(200).send({ status: "OK", message: "Se Subio imagen" });
});


app.listen(3002, () => {
    console.log("El servidor esta Activo en http://localhost:3002")
});
