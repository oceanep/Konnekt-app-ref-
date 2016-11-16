$(document).ready(function(){
  function createC() {
    if (!(document.getElementById('content'))){
      $("#nav").append("<div id='content'></div>");
      var c = document.getElementById('content');
    }
  }
  var c = document.getElementById('content');
  Path.map("#/signup").to(function(){
      c.innerHTML = "<div class='hero-unit'><form id='signup'><h1>Sign Up</h1><div class='field'><input id='username' placeholder='Username' type='text' required></div><div class='field'><input class='password' placeholder='Password' type='text' required pattern='[a-zA-Z0-9]{6,}'></div><button class='login-button' type='submit'>Sign Up</button><p><a href='index.html'>Log In</a></p></form></div>";
  }).enter(createC);

  Path.map("#/login").to(function(){
      c.innerHTML = "<div class='hero-unit'><form id='login'><h1>Login</h1><div class='field'><input id='username' placeholder='Username' type='text' required></div><div class='field'><input class='password' placeholder='Password' type='text' required></div><button class='login-button' type='submit'>Login</button><p><a href='#/signup'>Sign Up</a></p></form></div>";
  }).enter(createC);

  Path.map("#/home").to(function(){
      c.innerHTML = "  <div class='hero-unit'><form id='contact'><div class='field'><label for='contact-name'>Contact Name</label><input name='contact-name' placeholder='Enter Name Here' type='text' required></div><div class='field'><label for='contact-name'>Contact Email</label><input name='contact-name' placeholder='Enter Contact Email Here' type='text' required pattern='.+@.+\\..+'></div><div class='field'><label for='year-week'>Week you met</label><input type='week' name='year-week' required></div><div class='field'><label for='freqeuncy'>How often would you like to stay in touch?</label><input type='number' name='frequency' min='1' max='36' placeholder='In weeks' required></div><button class='login-button' id='save-contact' type='submit'>Save</button></form></div>";
  }).enter(createC);

  Path.map("#/radar").to(function(){
      c.outerHTML = "<div id='canvas_container'></div>";
  });
  Path.map("#/contact").to(function(){
      c.innerHTML = "";
  }).enter(createC);

  Path.root("#/login");
  Path.listen();

});
