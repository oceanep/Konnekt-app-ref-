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
    for (var i=0;i<9;i++){
      multiplier = i * 35;
      var circle = paper.circle(centerX,centerY,300 - multiplier);
      circle.attr({
        stroke: '#ffffff',
        'fill-opacity': 0.2,
        fill: '#00BCD1'
      });
    }




}
