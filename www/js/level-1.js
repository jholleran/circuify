//window.onload = function() {
	//var meter = document.getElementById("meter-display");

	//document.querySelector('body').addEventListener("drop", checkCircuit, false);
	//document.querySelector('body').addEventListener("touchend", checkCircuit, false);

	function checkCircuit() {
		var r1, 
			r2, 
			r3;


		var components = document.getElementsByClassName("draggable");
		for (var i = 0; i < components.length; i++) {
			var comp = components[i];
			if(isAtPosition(comp, 80, 280)) {
				r1 = parseInt(comp.getAttribute("data-res"));
			}
			if(isAtPosition(comp, 80, 80)) {
				r2 = parseInt(comp.getAttribute("data-res"));
			}
			if(isAtPosition(comp, 220, 80)) {
				r3 = parseInt(comp.getAttribute("data-res"));
			}
		};


		if(r1 != undefined && r2 != undefined && r3 != undefined) {
			var totalResistance = r1 + r2 + r3;
			meter().innerHTML = totalResistance;
			log(totalResistance);
			if(totalResistance == 320) {
				levelComplete();
			}
		} else {
			resetLevel();
		}

		return true;
	}

	function isAtPosition(element, x, y) {
		var transform = element.getAttributeNS(null, "transform").slice(7,-1).split(' ');
	  
	    for(var i=0; i<transform.length; i++) {
	    	transform[i] = parseFloat(transform[i]);
	    }

		return transform[4] == x && transform[5] == y;
	}

	function level2Complete() {
	    var p = document.getElementById('result');
	    p.innerHTML = "Level 1 Complete. Well Done!";
	}

	function resetLevel() {
		meter().innerHTML = "0";
	    var p = document.getElementById('result');
	    p.innerHTML = "";
	}

	function log(msg) {
		var p = document.getElementById('log');
		p.innerHTML = msg + "\n" + p.innerHTML;
	}

	function meter() {
		return document.getElementById("meter-display");
	}
//};