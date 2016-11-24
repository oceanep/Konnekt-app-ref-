function toggleSignIn() {
  //sign in button
  if (firebase.auth().currentUser) {
    //[START signout]
    firebase.auth().signOut();
    //[END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}

function signUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END createwithemail]
}

function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
    window.alert('You have not configured and imported the Firebase SDK.');
  }else if (config.storageBucket === '') {
    window.alert('Your Firebase Storage bucket has not been enabled.');
  }
}

function initApp() {
  //store some dom stuff, run setup check
  checkSetup();

  //shortcut to Dom Elements
  this.loginButton = document.getElementById('login-button');
  this.signupButton = document.getElementById('signup-button');
  this.homeButton = document.querySelectorAll('li')[1];
  this.radarButton = document.querySelectorAll('li')[2];
  this.unit = document.getElementsByClassName("hero-unit")[0];

  //Listen for auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //show Hello Message at the top of the page
      var name = "Name";
      window.alert('Signed in');

      unit.appendChild(document.createElement('h2').appendChild(document.createTextNode('Welcome ' + name)));
      homeButton.style.display = "inline";
      radarButton.style.display = "inline";

      //replace login with signout
      loginButton.innerhtml = '<a href="#/login">Sign Out</a>';
    }else{

      window.alert('Signed Out');
      homeButton.style.display = "none";
      radarButton.style.display = "none";
      loginButton.innerhtml = '<a href="#/login">Login</a>';
    }
  });
  //event listeners
  loginButton.addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
  initApp();
};
