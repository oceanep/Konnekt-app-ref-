$(document).ready(function(){
  function createC() {
    if (document.getElementsByClassName("wrapper").length == 0){
      var w = document.createElement("div");
      w.className += ' wrapper';
      $("#canvas_container").remove();
      $("#navbar, #content").wrapAll(w);
      $("#content").toggle();
      $("footer").toggle();
    }
  }

  function createR() {
      $("#navbar, #content").unwrap();
      $("#content").toggle();
      $("footer").toggle();
  }


  Path.map("#/signup").to(function(){
  }).enter([createC,function(){
    $("#content").load("views/signup.html");
  }]);

  Path.map("#/login").to(function(){
  }).enter([createC,function(){
    $("#content").load("views/login.html");
  }]);

  Path.map("#/home").to(function(){
  }).enter([createC,function(){
    $("#content").load("views/home.html");
  }]);

  Path.map("#/radar").to(function(){
  }).enter([createR, function(){
    $("#content").load("<div id='canvas_container'></div>");
  }]);

  Path.map("#/contact").to(function(){
  }).enter([createC,function(){
    $("#content").load("views/contact.html");
  }]);

  Path.root("#/login");
  Path.listen();

});
