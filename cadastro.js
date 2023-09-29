// Use a mesma configuração do Firebase que você usou anteriormente.
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

$("#cadastro-form").submit(function(event) {
    event.preventDefault();

    var email = $("#cadastro-email").val();
    var password = $("#cadastro-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Cadastro realizado com sucesso!");
        // Aqui você pode adicionar um redirecionamento, se desejar.
        // Por exemplo: window.location.href = "index.html";
    })
    .catch((error) => {
        alert("Erro: " + error.message);
    });
});
