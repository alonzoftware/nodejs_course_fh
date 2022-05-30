//Reference to HTML CONTROLS
const lblNewTkt = document.querySelector('#lblNewTkt');
const btnCreateTkt = document.querySelector('button');//First Button in Document HTML

const socket = io();



socket.on('connect', () => {
    btnCreateTkt.disabled = false;
});

socket.on('disconnect', () => {

    btnCreateTkt.disabled = true;

});


socket.on('last-tkt', (lastTkt) => {
    lblNewTkt.innerHTML = lastTkt;
})


btnCreateTkt.addEventListener('click', () => {

    socket.emit('add-tkt-to-queue', null, (tktStr) => {
        console.log('Desde el server', tktStr);
        lblNewTkt.innerHTML = tktStr;
    });

});