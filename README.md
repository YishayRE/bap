<p align="center">
  <a href="" rel="noopener">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" alt="Project logo"></a>
</p>
<h3 align="center">bap</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)

</div>

---
## 📝 Índice

- [Descripción General del Proyecto](#problem_statement)
- [Dependencias](#limitations)
- [Prerequisitos](#prerequisitos)
- [Instalación](#instalacion)
- [Modo de Uso](#usage)
- [Construido con](#tech_stack)
- [Autores](#authors)

## 🧐 Descripción General del Proyecto <a name = "problem_statement"></a>
Sistema de gestión de tareas
Deberás realizar una API REST que permita el funcionamiento de un sistema de gestión
de tareas, utilizando Node.js. El proyecto tendrá que estar en un repositorio público
para permitir su consulta.
El sistema de gestión de tareas tiene como propósito el que un usuario pueda
visualizar, agregar, editar o eliminar las tareas que requiera registrar en su día a día. Y
debido a que el sistema es utilizado por varios usuarios, es necesario que la API
identifique al usuario o sesión que está solicitando cierta información. (No es necesario
crear un módulo de registro y autentificación de usuarios)
Cada tarea debe tener:
- Título (Obligatorio)
- Descripción (Obligatorio)
- Estatus de compleción (Obligatorio)
- Fecha de entrega (Obligatorio)
- Comentarios (Opcional)
- Responsable (Opcional)
- Tags (Opcional)
Los endpoints que deberán estar disponibles en la API son:
- GET -> Regresa información breve de todas las tareas
- GET -> Regresa toda la información de una tarea
- POST -> Crear una tarea
- PUT -> Editar una tarea
- DELETE -> Borrar una tarea
Aspectos a evaluar:
- Funcionamiento de la API REST
- Utilización de framework para API REST
- Estructura del proyecto
- Documentación del código y endpoints
- Buenas prácticas de programación

Las tecnologías que debes de utilizar para el proyecto son:
- Node.js - Express.js
- MySQL
- - Es importante que todas las consultas que realices a tu base de datos
sean personalizadas y no utilizando totalmente herramientas de ORM

## ⛓️ Dependencias <a name = "limitations"></a>

- colors (https://www.npmjs.com/package/colors)
- cors (https://www.npmjs.com/package/cors)
- dotenv (https://www.npmjs.com/package/dotenv)
- express (https://www.npmjs.com/package/express)
- express-fileupload (https://www.npmjs.com/package/express-fileupload)
- express-validator (https://www.npmjs.com/package/express-validator)
- mysql (https://www.npmjs.com/package/mysql)

### Prerequisitos <a name = "prerequisitos"></a>

Se requiere tener NodeJS instalado y en caso de querer ejecutarlo en modo dev, nodemon de forma global (npm i -g nodemon).
Tambien se requiere tener MySQL en caso de querer una db local.

```
git clone https://github.com/YishayRE/bap.git
cd bap
```
Recuerda tener un usuario creado previamente en la db.

### Instalación <a name = "instalacion"></a>

Lista paso por paso de lo necesario para ejecutar el proyecto de manera local en tu computadora. (El API crea por si solo la db, solo se debe ingresar las variables de entorno)

Descarga de dependencias
```
npm i 
```

Ejecutar

```
//En producción 
npm run start

//En desarrollo
npm run dev 
```

## 🎈 Modo de uso <a name="usage"></a>

Antes de usar, se deben ingresar las variables al archivo example.env y renombrarlo a .env, tras ello, ejecutarlo como dev o prod.
No es necesario tener la db creada, al correr el API esta creará la db a partir del archivo database/db.sql y creará todo lo que necesita para trabajar.

Lee la siguiente documentación para estar al tanto de esta API:
https://documenter.getpostman.com/view/15102974/2s84DiykKA
Tambien puedes acceder a ella entrando a la ruta principal de la API.

## ⛏️ Construido con <a name = "tech_stack"></a>

- [MySQL](https://dev.mysql.com/) - Database
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguage

## ✍️ Autores <a name = "authors"></a>

- [@YishayRE](https://github.com/YishayRE) - Dev