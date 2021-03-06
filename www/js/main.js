window.onload = function() {
  var selectedElement = 0;
  var currentX = 0;
  var currentY = 0;
  var currentMatrix = 0;
  var gridSpace = 20;
  var scale = 800 / window.innerWidth;

  function selectElement(evt) {
    evt.preventDefault();
    selectedElement = evt.target.parentNode;
    if(selectedElement.hasAttribute("transform")) {
      currentX = evt.clientX;
      currentY = evt.clientY;
      currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
      
      for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
      }
    }

    document.body.addEventListener('mousemove', moveElement);
    document.body.addEventListener('mouseup', deselectElement);
    //document.body.addEventListener('mouseout', deselectElement);
  }


  function moveElement(evt){
    evt.preventDefault();
    dx = evt.clientX - currentX;
    dy = evt.clientY - currentY;

    currentMatrix[4] += dx;
    currentMatrix[5] += dy;

    newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
        console.log("matrix: ", newMatrix);      
    selectedElement.setAttributeNS(null, "transform", newMatrix);

    currentX = evt.clientX;
    currentY = evt.clientY;
  }

  function deselectElement(evt){
    evt.preventDefault();
    if(selectedElement != 0){
      document.body.removeEventListener('mousemove', moveElement);
      document.body.removeEventListener('mouseup', deselectElement);
      //document.body.removeEventListener('mouseout', deselectElement);

    var p = nearestGridPosition({x : currentMatrix[4], y : currentMatrix[5]});
    currentMatrix[4] = p.x;
    currentMatrix[5] = p.y;

    newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
        console.log("matrix: ", newMatrix);      
    selectedElement.setAttributeNS(null, "transform", newMatrix);
      selectedElement = 0;
    }
  }

  function nearestGridPosition(p) {
    var xRemainder = p.x % gridSpace;
    var yRemainder = p.y % gridSpace;
    var x, y = 0;

    if(xRemainder > (gridSpace / 2)) {
      x = p.x + (gridSpace - xRemainder);
    } else {
      x = p.x - xRemainder;
    }

    if(yRemainder > (gridSpace / 2)) {
      y = p.y + (gridSpace - yRemainder);
    } else {
      y = p.y - yRemainder;
    }


    //console.log("x remainder", xRemainder);
    //console.log('old move resistor at', p.x, p.y);
    //console.log('new move resistor at', x, y);
    return {
      x: x,
      y: y
    }
  }


  //document.getElementById("circuitBoard").addEventListener('mousedown', selectElement);


  function touchStart(event) {
    event.preventDefault();
    selectedElement = event.target.parentNode;
    if(selectedElement.hasAttribute("transform") && hasClass(selectedElement, "draggable")) {
      var touch = event.touches[0];
      currentX = touch.pageX;
      currentY = touch.pageY;
      currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
      
      for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
      }
    }

    document.querySelector('body').addEventListener("touchmove", touchMove);
  }

  function touchMove(evt) {
    evt.preventDefault();

    if(selectedElement.hasAttribute("transform") && hasClass(selectedElement, "draggable")) {
      var ts = evt.touches;
      var to = ts[0];
      dx = to.pageX - currentX;
      dy = to.pageY - currentY;

      dx *= scale;
      dy *= scale;

      currentMatrix[4] += dx;
      currentMatrix[5] += dy;

      newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
      //console.log("matrix: ", newMatrix);      
      selectedElement.setAttributeNS(null, "transform", newMatrix);

      currentX = to.pageX;
      currentY = to.pageY;
    }
  }

  function touchEnd(event) {
    event.preventDefault();

    if(selectedElement.hasAttribute("transform") && hasClass(selectedElement, "draggable")) {
      var p = nearestGridPosition({x : currentMatrix[4], y : currentMatrix[5]});
      currentMatrix[4] = p.x;
      currentMatrix[5] = p.y;

      newMatrix = "matrix(" + currentMatrix.join(' ') + ")";
          console.log("matrix: ", newMatrix);      
      selectedElement.setAttributeNS(null, "transform", newMatrix);

      document.querySelector('body').removeEventListener("touchmove", touchMove);
    }
  }

  function nearestGridPoint(p) {
    var xRemainder = p % gridSpace;

    if(xRemainder > (gridSpace / 2)) {
      return p + (gridSpace - xRemainder);
    } else {
      return p - xRemainder;
    }
  }

  function hasClass(element, className) {
    return element.classList.contains(className);
  }


  document.querySelector('body').addEventListener("touchstart", touchStart, false);
  document.querySelector('body').addEventListener("touchend", touchEnd, false);
  document.querySelector('body').addEventListener("touchend", checkCircuitLevel2, false);
}