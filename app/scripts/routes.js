$(document).ready(function(){
  function createC() {
    if (document.getElementsByClassName('wrapper').length == 0){
      var w = document.createElement('div');
      w.className += ' wrapper';
      $('#canvas_container').remove();
      $('#navbar, #content').wrapAll(w);
      $('#content').toggle();
      $('footer').toggle();
    }
  }

  function createR() {
      $('#navbar, #content').unwrap();
      $('#content').toggle();
      $('footer').toggle();
      $('#navbar').after('<div id=\'canvas_container\'></div>');
  }


  Path.map('#/signup').to(function(){
  }).enter([createC,function(){
    $('#content').load('views/signup.html');
  },function(){
    setTimeout(function(){
      document.getElementById('signup-button').addEventListener('click', signUp, false);
    }, 100);
  }]);

  Path.map('#/login').to(function(){
    $('login-button').onclick = function(){
      toggleSignIn()
    }
  }).enter([createC,function(){
    $('#content').load('views/login.html');
  }, function(){
    setTimeout(function(){
      document.getElementById('login-button').addEventListener('click', toggleSignIn, false);
    }, 100);
  }]);

  Path.map('#/home').to(function(){
    window.onload = function(){
      document.getElementById('save-contact-button').addEventListener('click', saveNewContact, false);
      loadContacts();
    };
  }).enter([createC,function(){
    $('#content').load('views/home.html');
  }]);

  Path.map('#/radar').to(function(){
    drawCanvas();
  }).enter(createR);

  Path.map('#/contact').to(function(){
  }).enter([createC,function(){
    $('#content').load('views/contact.html');
  }]);

  Path.root('#/login');
  Path.listen();

});
