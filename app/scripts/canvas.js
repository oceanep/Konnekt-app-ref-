
function drawCanvas(){


  //Create SVG graphic to display data visuaization onto
    var w = $(window).width();
    var h = $(window).height();

    var paper = new Raphael(document.getElementById('canvas_container'), w, h);
    paper.setViewBox(0,0,w,h,true);
    paper.setSize('100%','100%');

    var centerX = w/2;
    var centerY = h/2;

    //create cascading rings
    for (var i=0;i<7;i++){
      multiplier = i * 50;
      var circle = paper.circle(centerX,centerY,325 - multiplier);
      circle.attr({
        stroke: '#ffffff',
        'fill-opacity': 0.2,
        fill: '#00BCD1'
      });
    }
    //draw contact circles
    var userId = firebase.auth().currentUser.uid;
    var contactsRef = firebase.database().ref('users/' + userId + '/contacts/');

    contactsRef.off();
    contactsRef.on('value', function(snap){
      var contactsObj = snap.val();
      drawContactCircles(paper, contactsObj, centerX, centerY, 0);
    });

}


function drawContactCircles(paper, contacts, centerX, centerY, inc) {

  //add get week functionality to date object
  Date.prototype.getWeek = function() {
      var base = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - base) / 86400000) + base.getDay() + 1) / 7);
  };



  var points;
  var radius;
  //get week of year
  var now = new Date();
  var weekNumber = now.getWeek();
  //store all circle objects for a dow so they can be changed all at once
  var contactSet = paper.set();
  //size/radius of circle
  var size;

  /* creates label for the circle */
  var setContactInfo = function (shape, label, email, weeks) {

    //handle grammar for different week amounts
    function phrase(weeks){
      if(weeks != 1 && weeks < 6){return 'weeks';}
      if(weeks === 1){return 'week';}
      if(weeks >= 6){return 'weeks\n or more';}
    };

    paper.setStart();
    var theLabel = paper.text(shape.attr('cx')+ shape.attr('r')*6, shape.attr('cy'), ' ' + label + '\n' + email + '\n' + weeks +' ' + phrase(weeks)).attr({
      'font-size': 13, 'fill': '#ffffff', 'font-family': 'Lato, sans-serif'
    });
    theLabel.node.setAttribute('class', 'task-text');
    var box = theLabel.getBBox();
    var width = box.width;
    var info = paper.circle(box.x + (width/2), box.y + (width/3.8), width/1.8).attr({'fill':'rgba(116, 119, 124,0.5)', 'stroke-opacity':'0'});
    info.node.setAttribute('class', 'text-box');
    theLabel.toFront();
    var sf = paper.setFinish();

    shape.data('label', sf);

    var hoverIn = function() {
      this.animate({'fill-opacity': 0.9, fill: '#00BCD1', stroke: '#fff', 'stroke-width': 20, 'stroke-opacity': 0.7 }, 1000);
      this.data('label').show();
    };
    var hoverOut = function() {
      this.animate({'fill-opacity': 1, fill: '#fff', stroke: '#00BCD1', 'stroke-width': size*1.1, 'stroke-opacity': 1 }, 1000);
      this.data('label').hide();
    };
    shape.data('label').hide();
    shape.hover(hoverIn, hoverOut, shape, shape);
    return shape;
  };

  for (var contact in contacts){
    contacts[contact].date = parseInt(contacts[contact].date.substr(6));
    var dateMet = contacts[contact].date;
    var frequency = contacts[contact].frequency;
    //calculate multiplier for radius
    multiplier = (Math.abs(weekNumber - dateMet) % frequency) + 1;
    if(multiplier > 7){multiplier = 6;}
    radius = multiplier * 50;
    //get point on ring and increment so they aren't in a line
    points = getPoint(inc, radius, centerX, centerY);
    inc+=0.2;
    //get x & y coordinates
    var x = points.x;
    var y = points.y;
    size = 12;
    var circ = paper.circle(x, y, size)
    //set contact details to pop up circle
    circ.data('title', contacts[contact].name);
    circ.data('email',contacts[contact].email);
    circ.data('weeks', contacts[contact].date);
    circ = setContactInfo(circ, circ.data('title'), circ.data('email'), multiplier); //add label
    contactSet.push(circ);
  };
  contactSet.attr({fill: '#ffffff', stroke: '#00BCD1', 'stroke-width': 8 });

  // get an incremental point around a circle given its center and radius */
  function getPoint(inc, radius, centerX, centerY) {
    var angle = inc * Math.PI * 2;
      return {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
  };

  }
}
