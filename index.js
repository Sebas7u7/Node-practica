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
        min-height: 100vh;
    }

    .container {
        background: #fff;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 800px;
        width: 100%;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 20px;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        margin-bottom: 20px;
    }

    .card {
        background: #ffffff;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
        text-align: left;
        transition: transform 0.2s ease;
    }

    .card:hover {
        transform: scale(1.03);
    }

    .card h2 {
        color: #2c3e50;
        margin-bottom: 10px;
    }

    .card p {
        color: #34495e;
        margin: 5px 0;
        word-break: break-word;
    }

    a {
        color: #3498db;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin-top: 20px;
    }

    a:hover {
        text-decoration: underline;
    }

    @media (max-width: 600px) {
        .card {
            max-width: 100%;
        }
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
        rta += `
            <h1>Contacto</h1>
            <div class="flex-container">
                <div class="card">
                    <h2>Cristian Romero</h2>
                    <p>Correo: cmsalgador@udistrital.edu.co</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/Cr15t14S" target="_blank">Cr15t14S</a></p>
                </div>
                <div class="card">
                    <h2>Juan Prada</h2>
                    <p>Correo: jdpradas@udistrital.edu.co</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/JuanPrada10" target="_blank">JuanPrada10</a></p>
                </div>
            </div>
            <a href="/">Volver al inicio</a>
    `;

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
