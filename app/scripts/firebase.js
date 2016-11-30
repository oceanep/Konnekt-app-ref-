function toggleSignIn() {
  //sign in button
  if (firebase.auth().currentUser) {
    //[START signout]
    console.log('signing out');
    firebase.auth().signOut();
    window.location.href = '//localhost:9000/#/login';
    //[END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
      window.location.href = '//localhost:9000/#/home';
    }).catch(function(error) {
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
      return
    });

  }
}

function signUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('username').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName : username
    });
    window.location.href = '//localhost:9000/#/home';
  }).catch(function(error) {
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

function saveNewContact() {
  var name = document.getElementById('contact-name').value;
  var email = document.getElementById('contact-email').value;
  var date = document.getElementById('year-week').value;
  var frequency = document.getElementById('frequency').value;
  var userId = firebase.auth().currentUser.uid;
  var userDb = firebase.database().ref('users/' + userId + '/contacts/');

  userDb.push({
    name : name,
    email : email,
    date : date,
    frequency : frequency,
  });

  window.location.replace('//localhost:9000/#/home');
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
  this.loginTab = document.getElementById('login');
  this.signoutButton = document.getElementById('signout-button');
  this.signupButton = document.getElementById('signup-button');
  this.homeButton = document.querySelectorAll('li')[2];
  this.radarButton = document.querySelectorAll('li')[3];
  this.unit = document.getElementsByClassName('hero-unit')[0];

  //Listen for auth state changes
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //show Hello Message at the top of the page
      var name = 'Name';
      console.log('Signed in');
      //Append welcome mesage somewhere
      // unit.appendChild(document.createElement('h2').appendChild(document.createTextNode('Welcome ' + name)));
      loginTab.style.display = 'none';
      signoutButton.addEventListener('click', toggleSignIn, false);
    }else{

      console.log('Signed Out');
      homeButton.style.display = 'none';
      radarButton.style.display = 'none';
      signoutButton.style.display = 'none';

    }
  });

}
