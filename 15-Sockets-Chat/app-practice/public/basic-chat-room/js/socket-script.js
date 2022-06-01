const socket = io();
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');
socket.on('connect', () => {
    // console.log('client connected');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
})
socket.on('disconnect', () => {
    // console.log('client disconnected');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})
socket.on('send-message', (payload) => {
    // console.log('client disconnected');
    console.log(payload);

})
btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    payload = {
        message,
        time: new Date().getTime(),
    }
    socket.emit('send-message', payload, (id) => {
        console.log("From the Server", id)
    });
})