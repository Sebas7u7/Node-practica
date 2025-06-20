const http = require('node:http');
require('dotenv').config();

const puerto = process.env.PORT || 3000;

const estilos = `<style>
    body {
        font-family: 'Segoe UI', sans-serif;
        background:rgb(255, 247, 247);
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .container {
        background: #d6eaff;
        padding: 50px;
        border-radius: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        text-align: center;
        max-width: 900px;
        width: 100%;
    }

    h1, h2, p {
        color: #000000;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .card {
        background: #ffffff;
        padding: 25px;
        border-radius: 16px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        width: 280px;
        text-align: left;
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: scale(1.03);
    }

    .card h2, .card p {
        color: #000000;
    }

    a {
        color: #004080;
        background-color: #e6f0ff;
        padding: 10px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
        margin: 6px;
        display: inline-block;
        transition: background-color 0.3s ease;
    }

    a:hover {
        background-color: #cce0ff;
    }

    @media (max-width: 600px) {
        .card {
            width: 100%;
        }

        .container {
            padding: 30px;
        }
    }
</style>`;

const server = http.createServer((req, res) => {
    console.log('request recibido');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    let rta = `<html><head><title>request NodeJS</title>${estilos}</head><body><div class="container">`;

    const ahora = new Date().toLocaleDateString('es-CO');
    console.log('url recibido: ', req.url);

    if (req.url === '/') {
        res.statusCode = 200;
        rta += `
            <h1> Bienvenidos a mi página con Node.js</h1>
            <h2>Este proyecto fue creado como práctica de backend con JavaScript</h2>
            <p><strong>Fecha:</strong> ${ahora}</p>
            <div class="flex-container">
                <div class="card">
                    <h2>¿Qué es esto?</h2>
                    <p>Una API y servidor básico usando solo Node.js, sin frameworks.</p>
                </div>
                <div class="card">
                    <h2> ¿Quiénes somos?</h2>
                    <p>Estudiantes aprendiendo backend</p>
                </div>
                <div class="card">
                    <h2>Explora</h2>
                    <p>Visita otras secciones del sitio como contacto e inicio.</p>
                </div>
            </div>
            <a href="/inicio">Ir a Inicio</a>
            <a href="/contacto">Contacto</a>
        `;
    } else if (req.url === '/contacto') {
        res.statusCode = 200;
        rta += `
            <h1>Contacto</h1>
            <div class="flex-container">
                <div class="card">
                    <h2>Sebastian Mahecha</h2>
                    <p>Correo: smahechab@udistrital.edu.co</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/Sebas7u7" target="_blank">Sebas7u7</a></p>
                </div>
                <div class="card">
                    <h2>Daniela Huertas</h2>
                    <p>Correo: dhuertase@udistrital.edu.co</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/DanielaHE13" target="_blank">DanielaHE13</a></p>
                </div>
            </div>
            <a href="/">Volver al inicio</a>
        `;
    } else if (req.url.startsWith('/inicio')) {
        res.statusCode = 200;

        const numeroSecreto = Math.floor(Math.random() * 10) + 1;
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
        const intento = parseInt(urlObj.searchParams.get('numero'));

        rta += `<h1>🎲 Juego: Adivina el número del 1 al 10</h1>`;

        if (!isNaN(intento)) {
            if (intento === numeroSecreto) {
                rta += `<p>¡Correcto! El número secreto era <strong>${numeroSecreto}</strong>.</p>`;
            } else {
                rta += `<p>Incorrecto. Tú dijiste <strong>${intento}</strong>, pero el número era <strong>${numeroSecreto}</strong>.</p>`;
            }
        } else {
            rta += `
                <p>Escribe un número en la URL para adivinar, por ejemplo:</p>
                <code>http://localhost:${puerto}/inicio?numero=5</code>
            `;
        }

        rta += `<br><a href="/">Volver al inicio</a>`;
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
