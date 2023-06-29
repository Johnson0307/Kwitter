var user_name = localStorage.getItem('user_name')
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

  var room = localStorage.getItem('roomName')
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function logout() 
    {
      localStorage.removeItem('roomName');
      localStorage.removeItem('user_name');
      window.location = 'kwitterPage.html'
    }

    function getData() 
{
firebase.database().ref("/"+room).on('value', function(snapshot) 
{ 
document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) 
{
childKey = childSnapshot.key;
childData = childSnapshot.val(); if(childKey != "sala") 
{ 
firebaseMessageId = childKey; messageData = childData;
console.log(firebaseMessageId);
console.log(messageData);
nome = messageData['name'];
message = messageData['mensagem'];
like = messageData['like'];
nameWithTag = "<h4> "+ nome +"<img class='user_tick' src='tick.png'>"; 
messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>"; spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
row = nameWithTag + messageWithTag +like_button +spanWithTag +like;
document.getElementById('output').innerHTML += row
}})})}

getData();

function enviar() 
{
    var msg = document.getElementById('msg').value
    firebase.database().ref(room).push({
        name: user_name, mensagem: msg, like: 0
    })
}

function updateLike(mensagemId)
{
    var btid = mensagemId;
    likes = document.getElementById(btid).value
    updateLikes = Number(likes) + 1;
    firebase.database().ref(room).child(btid).update({like: updateLikes})
}