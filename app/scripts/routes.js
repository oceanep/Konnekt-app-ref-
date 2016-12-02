$(document).ready(function(){
  var loader = document.getElementById('loader-wrapper');

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

  function loadScreen(){
    loader.classList.remove('loaded');
    loader.style.display = 'block';
    setTimeout(function(){
      console.log('loading...');
      loader.classList.add('loaded');
      setTimeout(function(){
        loader.style.display ='none';
      }, 1000);
    }, 500);

  }


  Path.map('#/signup').to(function(){
  }).enter([createC,function(){
    $('#content').load('views/signup.html');
  },function(){
    setTimeout(function(){
      document.getElementById('signup-button').addEventListener('click', signUp, false);
    }, 100);
  },loadScreen]);

  Path.map('#/login').to(function(){
    $('login-button').onclick = function(){
      toggleSignIn()
    }
  }).enter([createC,function(){
    $('#content').load('views/login.html');
  }, function(){
    setTimeout(function(){
      document.getElementById('login-button').addEventListener('click', toggleSignIn, false);
    }, 200);
  },loadScreen]);

  Path.map('#/home').to(function(){
    //set timeout so that the window finishes load, using window onload causes loadContacts not to trigger
    //unless the page is reloaded
    setTimeout(function(){
      document.getElementById('save-contact-button').addEventListener('click', saveNewContact, false);
      loadContacts();
    }, 200);
  }).enter([createC,function(){
    $('#content').load('views/home.html');
  },loadScreen]);

  Path.map('#/radar').to(function(){
    setTimeout(function(){drawCanvas();}, 200);
  }).enter([createR,loadScreen]);

  Path.map('#/about').to(function(){
  }).enter([createC,function(){
    $('#content').load('views/about.html');
  },loadScreen]);

  Path.root('#/login');
  Path.listen();

});
