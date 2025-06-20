const http = require('node:http');
require('dotenv').config();

const puerto = process.env.PORT || 3000;

console.log('Hola mundo desde Node.js!');

const estilos = `
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background: #fff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 600px;
        }
        h1 {
            color: #2c3e50;
        }
        h2 {
            color: #34495e;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            text-decoration: none;
            color: #3498db;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
`;

const server = http.createServer((req, res) => {
    console.log('request recibido');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    let rta = `<html><head><title>request NodeJS</title>${estilos}</head><body><div class="container">`;

    console.log('url recibido: ', req.url);
    if (req.url === '/') {
        res.statusCode = 200;
        rta += '<h1>Hola Mundo Cruel 2024!!</h1>';
        rta += '<h2>Usando variable de entorno con .env</h2>';
        rta += `<a href="/inicio">Ir a Inicio</a><br><a href="/contacto">Contacto</a><br><a href="/404">Error</a>`;
    } else if (req.url === '/contacto') {
        res.statusCode = 200;
        rta += '<h1>Contacto</h1>';
        rta += '<h2>Escríbenos a ejemplo@correo.com</h2>';
        rta += `<a href="/">Volver al inicio</a>`;
    } else if (req.url === '/inicio') {
        res.statusCode = 200;
        rta += '<h1>Bienvenidos a NodeJS</h1>';
        rta += '<h2>Este es el inicio de nuestro sitio</h2>';
        rta += `<a href="/">Volver al inicio</a>`;
    } else {
        res.statusCode = 404;
        rta += '<h1>404 - Página no encontrada</h1>';
        rta += `<a href="/">Volver al inicio</a>`;
    }

    rta += '</div></body></html>';
    res.end(rta);
});

server.listen(puerto, () => {
    console.log(`Servidor escuchando en el puerto ${puerto}`);
    console.log(`Puedes acceder a él en http://localhost:${puerto}`);
});
