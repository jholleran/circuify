var dragndrop = (function() {
  var myX = '';
  var myY = '';
  var whichArt = '';
  var gridSpace = 20;

  function resetZ() {
    var elements = document.querySelectorAll('img');
    for (var i = elements.length - 1; i >= 0; i--) {
      elements[i].style.zIndex = 5;
    };
  }

  function moveStart(event) {
    whichArt = event.target;
    myX = event.offsetX === undefined ? event.layerX : event.offsetX;
    myY = event.offsetY === undefined ? event.layerY : event.offsetY;
    resetZ();
    whichArt.style.zIndex = 10;
  }

  function moveDragStop(event) {
    event.preventDefault();
  }

  function moveDrop(event) {
    event.preventDefault();
    whichArt.style.left = nearestGridPoint(event.pageX - myX) + "px";
    whichArt.style.top = nearestGridPoint(event.pageY - myY + 20) + "px";
  }

  function touchStart(event) {
    event.preventDefault();
    var whichArt = event.target;
    var touch = event.touches[0];
    var moveOffsetX = whichArt.offsetLeft - touch.pageX;
    var moveOffsetY = whichArt.offsetTop - touch.pageY;
    //alert(moveOffsetX);
    resetZ();
    whichArt.style.zIndex = 10;

    whichArt.addEventListener("touchmove", function(evt) {
      evt.preventDefault();
      var ts = evt.touches;
      for (var i = 0; i < ts.length; i++) {
        var to = ts[i];
        var positionX = to.pageX + moveOffsetX;
        var positionY = to.pageY + moveOffsetY;
        whichArt.style.left = positionX + "px";
        whichArt.style.top = positionY + "px";
      };
      
    });
  }

  function touchEnd(event) {
    event.preventDefault();
    var whichArt = event.target;
    var cLeft = whichArt.style.left.substring(0, whichArt.style.left.length - 2);
    var cTop = whichArt.style.top.substring(0, whichArt.style.left.length - 2);
    //log("Orig: " + cLeft + " - " + cTop);
    whichArt.style.left = nearestGridPoint(parseInt(cLeft)) + "px";
    whichArt.style.top = nearestGridPoint(parseInt(cTop)) + "px";
    //log("New: " +whichArt.style.left + " - " + whichArt.style.top);
  }

  function nearestGridPoint(p) {
    var xRemainder = p % gridSpace;

    if(xRemainder > (gridSpace / 2)) {
      return p + (gridSpace - xRemainder);
    } else {
      return p - xRemainder;
    }
  }

  function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + "\n" + p.innerHTML;
  }

  document.querySelector('body').addEventListener("dragstart", moveStart, false);
  document.querySelector('body').addEventListener("dragover", moveDragStop, false);
  document.querySelector('body').addEventListener("drop", moveDrop, false);

  document.querySelector('body').addEventListener("touchstart", touchStart, false);
  document.querySelector('body').addEventListener("touchend", touchEnd, false);
})();
