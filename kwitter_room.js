var user_name = localStorage.getItem('user_name')
document.getElementById('user_name').innerHTML = 'Bem vindo ' + user_name + '!';
//Dados do banco de dados ⬇️
const firebaseConfig = {
    apiKey: "AIzaSyAm33mGOayUQSgSyaP6BVxzanzmpwH3xg4",
    authDomain: "kwitter-4bd3f.firebaseapp.com",
    databaseURL: "https://kwitter-4bd3f-default-rtdb.firebaseio.com",
    projectId: "kwitter-4bd3f",
    storageBucket: "kwitter-4bd3f.appspot.com",
    messagingSenderId: "887255328115",
    appId: "1:887255328115:web:1b87735ab44e9373b09106"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function addRoom() {
    var roomName = document.getElementById('room_name').value;
    firebase.database().ref('/').child(roomName).update({
      sala: 'sala adicionada'
    })
    localStorage.setItem('roomName', roomName);
    window.location = 'kwitterPage.html'
  }

  function logout() 
    {
      localStorage.removeItem('roomName');
      localStorage.removeItem('user_name');
      window.location = 'kwitterPage.html'
    }

  function getData() {
  firebase.database().ref("/").on('value', function(snapshot) 
  { 
document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) {
childKey = childSnapshot.key;
console.log(childKey)
roomNames = childKey;
console.log(roomNames)
row = "<div class='roomName' id='" + roomNames + "' onclick='redirecionar(this.id)'>" + roomNames + "</div> <hr>"
document.getElementById("output").innerHTML += row;
console.log(row)
})
})
}
getData();

  function redirecionar(name)
  {
    localStorage.setItem('roomName', name);
    window.location = 'kwitterPage.html';
  }