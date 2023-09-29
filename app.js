const firebaseConfig = {
  apiKey: "AIzaSyC9fkpDWN5F8-iMEW7_QNmUUXSsHdr6P14",
  authDomain: "scriptstorm.firebaseapp.com",
  databaseURL: "https://scriptstorm-default-rtdb.firebaseio.com",
  projectId: "scriptstorm",
  storageBucket: "scriptstorm.appspot.com",
  messagingSenderId: "424270107943",
  appId: "1:424270107943:web:e15953af356281dd1e0502"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

$("#login-form").submit(function(event) {
  event.preventDefault();

  var email = $("#email").val();
  var password = $("#password").val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      alert("Login realizado com sucesso!");
  window.location.href="html_fla.html"; //alterar para o nome do arquivo de vocês.
  })
  .catch((error) => {
      alert("Erro: login invalido" + error.message);
  });
});



