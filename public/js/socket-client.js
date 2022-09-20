const conect = document.querySelector('#conect');
const disconect = document.querySelector('#disconect');
const txtMensaje = document.querySelector('#txtMensaje');
const btnenviar = document.querySelector('#btn-login');
const socket = io();

socket.on('connect', () =>{

    console.log('Conectado');

    disconect.style.display = 'none';
    conect.style.display = 'block';
    
});

socket.on('disconnect', () =>{

    console.log('Desconectado del servidor');

    conect.style.display = 'none';
    disconect.style.display = 'block';
    
});

socket.on('enviar-mensaje', (payload) =>{

    console.log(payload);
    
});

btnenviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;

    const payload = {
        id: '12345',
        mensaje,
        fecha: new Date().toString()
    }

    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id);
    });

})