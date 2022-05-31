const params = new URLSearchParams(window.location.search);
if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('The Name is required');
}
const person = {
    name: params.get('name'),

}

const socket = io();
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');
socket.on('connect', () => {
    // console.log('client connected');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

    socket.emit('enter-chat-room', person, (people) => {
        console.log(people);
    });
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
socket.on('create-msg', (msg) => {
    // console.log('client disconnected');
    console.log(msg);

})
socket.on('upd-people', (people) => {
    // console.log('client disconnected');
    //console.log(people);

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