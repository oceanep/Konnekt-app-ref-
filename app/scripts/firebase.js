// Initialize Firebase
var config = {
  apiKey: "AIzaSyDA90eJCEudkrsunhnF7Rtixp-4kBtFM-U",
  authDomain: "konnect-49e66.firebaseapp.com",
  databaseURL: "https://konnect-49e66.firebaseio.com",
  storageBucket: "konnect-49e66.appspot.com",
  messagingSenderId: "470782143"
};
var defaultApp = firebase.initializeApp(config);
var database;
var auth;
var unit;
var loginButton = document.getElementById('login');
var homeButton = document.querySelectorAll('li')[1];
var radarButton = document.querySelectorAll('li')[2];

console.log(defaultApp.name);

function initializeModules(){

  this.database = defaultApp.database();
  this.auth = defaultApp.auth();

  this.auth.onAuthStateChanged(this.loginChanged.bind(this));
}

//create new user
function createUser() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  this.auth.createUserWithEmailAndPassword(email, password).catch(function(error){

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('sorry, there was an issue logging in: %s code: %s', errorMessage, errorCode);

  });
  console.log('here');
}

//user sign-in
function signIn() {
  this.email = document.getElementById('email').value;
  this.password = document.getElementById('password').value;

  this.auth.signInWithEmailAndPassword(email, password).catch(function(error){

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('sorry, there was an issue logging in: %s code: %s', errorMessage, errorCode);
  });
}

//hide or show tabs on log in
function loginChanged(user) {
  if (user) {
    //show Hello Message at the top of the page
    var name = "Name";

    this.unit = document.getElementsByClassName("hero-unit")[0];
    this.unit.appendChild(document.createElement('h2').appendChild(document.createTextNode('Welcome ' + name)));
    this.homeButton.style.display = "inline";
    this.radarButton.style.display = "inline";

    //replace login with signout
    this.loginButton.innerhtml = '<a href="#/login">Sign Out</a>';
  }else{

    this.homeButton.style.display = "none";
    this.radarButton.style.display = "none";
    this.loginButton.innerhtml = '<a href="#/login">Login</a>';
  }
}

//sign out
function signOut(){
  this.auth.signOut().then(function(){

  }, function(error){

  });
}
