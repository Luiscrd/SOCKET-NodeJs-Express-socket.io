const express = require('express');
const cors = require('cors');
const { socketController } = require('../sokckets/controller');


class Server {

    constructor(ruta = '/') {

        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')( this.server );
        this.rutaRaiz = ruta;
        // Paths de rutas
        
        // Conectar a la base de datos
        
        // Middlewares
        this.middelwares();
        // Rutas de la aplicación
        this.routes();
        // Sockets
        this.sockets();

    }

    middelwares() {

        // CORS
        this.app.use(cors());
        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.get('/api', (req, res) => {

            res.sendFile(this.rutaRaiz + '/public/REST.html');

        });

        this.app.get('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.put('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.post('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.patch('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });

        this.app.delete('*', (req, res) => {

            res.status(404).sendFile(this.rutaRaiz + '/public/404.html')
        });


    }

    sockets() {

        this.io.on('connection', socketController);
        
    }

    listen() {

        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        })

    }
};

module.exports = Server;