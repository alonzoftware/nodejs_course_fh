const miForm = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8085/api/auth/"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/";

miForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};

  for (let el of miForm.elements) {
    if (el.name.length > 0) formData[el.name] = el.value;
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    // .then((resp) => {
    //   console.log(resp);
    //   localStorage.setItem("token", resp.token);
    // })
    .then(({ error, token }) => {
      if (error) {
        return console.error(error);
      }
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  //    const responsePayload = decodeJwtResponse(response.credential);

  //    console.log("ID: " + responsePayload.sub);
  //    console.log('Full Name: ' + responsePayload.name);
  //    console.log('Given Name: ' + responsePayload.given_name);
  //    console.log('Family Name: ' + responsePayload.family_name);
  //    console.log("Image URL: " + responsePayload.picture);
  //    console.log("Email: " + responsePayload.email);
  //GOOGLE TOKEN
  // console.log(`id_token : ${ response.credential}`);
  const body = { id_token: response.credential };
  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      //   localStorage.setItem("email", resp.user.email);
      localStorage.setItem("token", resp.token);
      window.location = "chat.html";
    })
    .catch(console.warn);
}

const button = document.getElementById("g_id_signout");
button.onclick = async () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    console.log("consent revoked");
    localStorage.clear();
    location.reload();
  });
};
