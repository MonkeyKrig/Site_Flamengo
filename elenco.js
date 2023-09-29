// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9fkpDWN5F8-iMEW7_QNmUUXSsHdr6P14",
    authDomain: "scriptstorm.firebaseapp.com",
    databaseURL: "https://scriptstorm-default-rtdb.firebaseio.com",
    projectId: "scriptstorm",
    storageBucket: "scriptstorm.appspot.com",
    messagingSenderId: "424270107943",
    appId: "1:424270107943:web:e15953af356281dd1e0502"
  };
  
  // Inicializando o Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const storage = firebase.storage();
  
  // Adicionando um jogador
  document.getElementById('playerForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const playerName = document.getElementById('playerName').value;
      const playerAge = document.getElementById('playerAge').value;
      const playerImage = document.getElementById('playerImage').files[0];
  
      if (playerImage) {
          const imageName = new Date().getTime() + "-" + playerImage.name;
          const uploadTask = storage.ref('player_images/' + imageName).put(playerImage);
  
          uploadTask.on('state_changed', function(snapshot) {
              // Progress function...
          }, function(error) {
              // Handle unsuccessful uploads
              console.error(error);
          }, function() {
              // Get download URL
              uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  database.ref('players').push({
                      name: playerName,
                      age: playerAge,
                      imageUrl: downloadURL
                  });
  
                  // Limpar campos após adicionar
                  document.getElementById('playerName').value = '';
                  document.getElementById('playerAge').value = '';
                  document.getElementById('playerImage').value = '';
              });
          });
      } else {
          // Caso você queira adicionar jogadores sem imagens
          database.ref('players').push({
              name: playerName,
              age: playerAge
          });
  
          // Limpar campos após adicionar
          document.getElementById('playerName').value = '';
          document.getElementById('playerAge').value = '';
      }
  });
  
  // Ouvindo as mudanças na lista de jogadores
  database.ref('players').on('child_added', function(data) {
      const li = document.createElement('li');
      li.id = data.key;
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
          <img src="${data.val().imageUrl}" width="50" class="mr-2">
          ${data.val().name} - ${data.val().age} anos
          <button class="btn btn-danger btn-sm" onclick="deletePlayer('${data.key}')">Excluir</button>
      `;
      document.getElementById('playerList').appendChild(li);
  });
  
  // Função para excluir jogador
  function deletePlayer(playerId) {
      database.ref('players/' + playerId).remove();
      document.getElementById(playerId).remove();
  }
  