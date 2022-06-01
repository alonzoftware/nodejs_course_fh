const params = new URLSearchParams(window.location.search);
if (!params.has("nombre") || !params.has("sala")) {
  window.location = "index.html";
  throw new Error("The Name/Room are required");
}
const userName = params.get("nombre");
const userRoom = params.get("sala");
//Reference HTML Controls
const divUsuarios = $("#divUsuarios");
const formEnviar = $("#formEnviar");
const txtMensaje = $("#txtMensaje");
const divChatbox = $("#divChatbox");
divChatbox.html("");

const renderUsers = (people = []) => {
  let html = "";

  html += "<li>";
  html += '<a href="javascript:void(0)" class="active">';
  html += "Chat de <span>" + userRoom + "</span>";
  html += "</a>";
  html += "</li>";
  for (let i = 0; i < people.length; i++) {
    html += "<li>";
    html += '<a href="javascript:void(0)" data-id="' + people[i].id + '">';
    html += '<img src="assets/images/users/1.jpg" alt="user-img" class="img-circle" /> <span>' + people[i].name + '<small class="text-success">online</small></span>';
    html += "</a>";
    html += "</li>";
  }

  divUsuarios.html(html);
};

function renderMessages(msg, yo) {
  console.log(msg, yo);
  var html = "";
  var fecha = new Date(msg.time);
  var hora = fecha.getHours() + ":" + fecha.getMinutes();

  var adminClass = "info";
  if (msg.name === "Administrador") {
    adminClass = "danger";
  }

  if (yo) {
    html += '<li class="reverse">';
    html += '    <div class="chat-content">';
    html += "        <h5>" + msg.name + "</h5>";
    html += '        <div class="box bg-light-inverse">' + msg.msg + "</div>";
    html += "    </div>";
    html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += '    <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  } else {
    html += '<li class="animated fadeIn">';

    if (msg.name !== "Admin") {
      html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    }

    html += '    <div class="chat-content">';
    html += "        <h5>" + msg.name + "</h5>";
    html += '        <div class="box bg-light-' + adminClass + '">' + msg.msg + "</div>";
    html += "    </div>";
    html += '    <div class="chat-time">' + hora + "</div>";
    html += "</li>";
  }

  divChatbox.append(html);
  scrollBottom();
}
function scrollBottom() {
  // selectors
  let newMessage = divChatbox.children("li:last-child");

  // heights
  var clientHeight = divChatbox.prop("clientHeight");
  var scrollTop = divChatbox.prop("scrollTop");
  var scrollHeight = divChatbox.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    divChatbox.scrollTop(scrollHeight);
  }
}
//Listeners
divUsuarios.on("click", "a", function () {
  let id = $(this).data("id");

  if (id) {
    console.log(id);
  }
});

formEnviar.on("submit", function (e) {
  e.preventDefault();

  if (txtMensaje.val().trim().length === 0) {
    return;
  }

  socket.emit(
    "send-room-message",
    {
      msg: txtMensaje.val(),
    },
    function (msg) {
      txtMensaje.val("").focus();
      renderMessages(msg, true);
    }
  );
});
