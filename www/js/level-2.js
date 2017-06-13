window.onload = function() {
	var meter = document.getElementById("meter-display");

	document.querySelector('body').addEventListener("drop", checkCircuit, false);
	document.querySelector('body').addEventListener("touchend", checkCircuit, false);

	function checkCircuit() {
		var r1, 
			r2, 
			r3,
			res = [];


		var components = document.getElementsByTagName("img");
		for (var i = 0; i < components.length; i++) {
			var comp = components[i];
			if(isAtPosition(comp, 80, 280)) {
				r1 = parseInt(comp.getAttribute("data-res"));
				res.push(r1);
			}
			if(isAtPosition(comp, 220, 280)) {
				r2 = parseInt(comp.getAttribute("data-res"));
				res.push(r2);
			}
			if(isAtPosition(comp, 360, 280)) {
				r3 = parseInt(comp.getAttribute("data-res"));
				res.push(r3);
			}
		};

		if(res.length == 1) {
			meter.innerHTML = res[0];
		} else if(res.length > 1) {
			var add = 0;
			for (var i = 0; i < res.length; i++) {
				var r = res[i];
				add += 1/r;
			}
			var result = 1 / add;
			meter.innerHTML = result;
			//log(result);
			if(result == 50) {
				levelComplete();
			}
		} else {
			resetLevel();
		}
	}

	function isAtPosition(element, x, y) {
		return element.offsetLeft == x && element.offsetTop == y;
	}

	function levelComplete() {
	    var p = document.getElementById('result');
	    p.innerHTML = "Level 2 Complete. Well Done!";
	}

	function resetLevel() {
		meter.innerHTML = "0";
	    var p = document.getElementById('result');
	    p.innerHTML = "";
	}

	function log(msg) {
		var p = document.getElementById('log');
		p.innerHTML = msg + "\n" + p.innerHTML;
	}
};