import express from "express"; //importa express
import fs from "fs";           //permite escritura y lectura de JSON
import bodyParser from "body-parser"; //la da la capicidad de enteder estructuras JSON
import bcrypt from 'bcrypt'; //encriptacion de datos
import jwt from "jsonwebtoken"; //generador de tokens
import mysql from "mysql"; //utilizacion de mysql en nuestro entorno
import cors  from "cors"; // Paquete que facilita los permisos CORS



const app =express();
const skey="Qg5I7eOc?*"; //secretKEY
var contador; //cantoador de sesiones
let tokenblacklist=[]; //lista negra de tokens

//Query de conexion a Mysql crea una pool de conexiones
var DBconexion=mysql.createPool({
    connectionLimit : 100,
    host:"localhost",
    database:"lic",
    user:"root",
    password:"password"
});

//funcion cambia de estado
function CambiarStatus(user,estado){
    var sqlInser=DBconexion.query("UPDATE usuario SET status='"+estado+"' WHERE usuarioName=?",user,function(error, results, fields){
        if(error){
            res.status(500).send({status:"FAIL",message:"Servidor no proceso su solicitud"});
        }
    })
}

app.use(bodyParser.json()); 
app.use(cors()); //Permite permisos cors


//Metodo POST registrar: recibe los datos del nuevo usario, encripta contraseña y los registra
//si el usario ya existe da un error
app.post("/soyashopping/register/user", (req,res)=>{
    try{
        const datosReq=req.body;
        bcrypt.hash(datosReq.contrasena,2,(error,hash)=>{
            if(error){
                res.status(500).send({status:"FAIL",message:"El servidor no pudo procesar su solicitud"});
            }
            else{
                datosReq.contrasena=hash;
    
                var sqlInser=DBconexion.query("INSERT INTO usuario SET ?",datosReq,function(error, results, fields){
                    if(error){
                        res.status(400).send({status:"FAIL",message:"Email o nombre de usuario ya registrado"});
                    }
                    else{
                        res.status(200).send({status:"OK",message:"Se Registro Correctamente"});
                    }
                });
            }
    
        });   
    }
    catch(erro){
        res.status(500).send({status:"FAIL",message:"El servidor no pudo procesar su solicitud"});
    }
 
});

//Metodo POST:recibe un query de consulta y responde con el resultado no verifica el usuario
app.get("/soyashopping/read/info", (req,res)=>{
    try{
        const datosReq=req.body;
        var sqlLeer=DBconexion.query(datosReq.quer,function(error, results, fields){
            if(error){
                res.status(500).send({status:"FAIL",message:"Servidor no puedo procesar la solicitud"});
            }
            else{
                res.json(results);
            }
        })
    }
    catch(error){
        res.status(500).send({status:"FAIL",message:"El servidor no pudo procesar su solicitud"});
    }

});

//Metodo POST:recibe un query de consulta y responde con el resultado si verifica el usuario
app.post("/soyashopping/read/info/user", (req,res)=>{
    try{
        const datosReq=req.body;
        if(tokenblacklist.includes(datosReq.Authorization)){
            res.status(400).send({status:"FAIL",message:"token expirado"});
            }
            else{
                const datosProtegido=jwt.verify(datosReq.Authorization,skey);
                var sqlLeer=DBconexion.query(datosReq.quer,[datosProtegido.usuarioName],function(error, results, fields){
                if(error){
                    res.status(500).send({status:"FAIL",message:"Servidor no puedo procesar la solicitud"});
                }
                else{
                    res.json(results);
                }
            })
            }
    }
    catch(error){

    }
});

//Metodo POST Login: lee el db luego lee los datos recibidos 
//posteriormente busca si los datos existen 
//luego que estos coicidan con el usuario
//si todo resulto se cambia el estatus del usario y se le asigna un token de sesion
app.post("/soyashopping/login",(req,res)=>{
    try{
        const datosReq=req.body;

        var sqlqueryStatus=DBconexion.query("SELECT * FROM usuario WHERE usuarioName=?",[datosReq.usuarioName],function(error, results, fields){  
            if (error){
                res.status(400).send({status:"FAIL",message:"Usuario no encontrado"});
            }
            else{
    
                if(results[0].status=="ACTIVO"){
                    res.status(400).send({status:"FAIL",message:"Usuario ya esta conectado"});
                }
                else{
    
                    bcrypt.compare(datosReq.contrasena,results[0].contrasena,(error,result)=>{
                        if(error){
                            res.status(500).send({status:"FAIL",message:"error en bycript"});
                        }
                        else if(result){
                            const payload={
                                usuarioName:datosReq.usuarioName,
                                contrasena: datosReq.contrasena,
                                numSesion:contador
                            };
                            contador++;
                            const tokenA=jwt.sign(payload,skey,{expiresIn:600});
                            CambiarStatus(datosReq.usuarioName,"ACTIVO");
                            res.status(200).send({status:"OK",message:"Se logueo correctamente",Authorization:tokenA});
                        }
                        else{
                            res.status(400).send({status:"FAIL",message:"Usuario o contraseña invalida"});
                        }
                
                    });
    
                }
            }
        });
    }
    catch(error){
        res.status(500).send({status:"FAIL",message:"El servidor no pudo procesar su solicitud"});
    }
    
    
});


//Metodo POST logout: lee el token de sesion recibido 
//verifica el token sea veridico
//si es asi invalida el token agregandolo a una blacklist
//si todo resulto se cambia el estatus del usario a INACTIVO 
app.post("/soyashopping/logout",(req,res)=>{
    try{
        const datosReq=req.body;
        if(tokenblacklist.includes(datosReq.Authorization)){
            res.status(200).send({status:"OK",message:"Ya esta deslogueado correctamente"});
            }
            else{
                var datosProtegido=jwt.verify(datosReq.Authorization,skey);
                CambiarStatus(datosProtegido.usuarioName,"INACTIVO");
                tokenblacklist.push(datosReq.Authorization);
                res.status(200).send({status:"OK",message:"Deslogueado correctamente"});
            }
    
    }
    catch(error){
        res.status(400).send({status:"FAIL",message:"token no valido"});
        console.log(error)
    }
});


app.listen(3001,()=>{
    console.log("El servidor esta Activo en http://localhost:3001")
});



