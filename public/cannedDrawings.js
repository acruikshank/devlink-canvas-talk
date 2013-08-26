function cannedDrawings() {
  function drawSVGvsCanvas() {
    var canvas = document.getElementById('svg-vs-canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var ctx = canvas.getContext('2d');

    ctx.scale( canvas.width/1280, canvas.height/800)

		ctx.lineWidth = 10;
	  ctx.save();
	    ctx.transform(.5, -.4, 0, 1, 100, 300)
	    ctx.strokeStyle = '#fff';
	    ctx.beginPath();
	    ctx.rect(0, 0, 600, 360);
	    ctx.lineWidth=5;
	    ctx.stroke();
	    ctx.fillStyle = 'rgba(255,255,255,.10)'
	    ctx.fill()
		ctx.restore();

		function circle() {
	    ctx.save();
		    ctx.transform(.5, -.4, 0, 1, 100, 300)
		    ctx.beginPath();
		    ctx.arc(300,180,170,0, 2*Math.PI,true)
		    ctx.closePath();
		    ctx.stroke();
			ctx.restore();
		}

		function rect() {
		  ctx.save();
		    ctx.transform(.5, -.4, 0, 1, 100, 300)
		    ctx.beginPath();
		    ctx.rect(250,30,295,180, 2*Math.PI,true)
		    ctx.closePath();
		    ctx.stroke();
			ctx.restore();		
		}

		ctx.strokeStyle = '#660';
		circle();
		ctx.strokeStyle = '#009';
		rect();

		ctx.save();
			ctx.strokeStyle = '#ff0';
			ctx.translate( 120, 0 );
			circle();
		ctx.restore();

		ctx.save();
			ctx.strokeStyle = '#00f';
			ctx.translate( 240, 0 );
			rect();
		ctx.restore();

	  ctx.save();
	    ctx.transform(.5, -.4, 0, 1, 750, 300)
	    ctx.strokeStyle = '#fff';
	    ctx.beginPath();
	    ctx.rect(0, 0, 600, 360);
	    ctx.lineWidth=5;
	    ctx.stroke();
	    ctx.fillStyle = 'rgba(255,255,255,.10)'
	    ctx.fill()
		ctx.restore();

	  ctx.save();
	    ctx.transform(.5, -.4, 0, 1, 750, 300)
			for (var i=0; i<60; i++) {
				for (var j=0; j<36; j++) {
					var r = Math.sqrt((i-30)*(i-30) + (j-18)*(j-18));
					if ( r > 16.5 && r < 17.5 ) {
						ctx.fillStyle = '#ff0';
						ctx.fillRect(i*10,j*10, 10, 10)
					}
				}
			}
			ctx.strokeStyle = '#00f';
			ctx.lineWidth = 10;
	    ctx.beginPath();
	    ctx.rect(250,30,295,180, 2*Math.PI,true)
	    ctx.closePath();
	    ctx.stroke();
		ctx.restore();

		ctx.font = '50px Futura,Helvetica,Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#fff';
		ctx.fillText("SVG", 380, 675);
		ctx.fillText("canvas", 1000, 675);
  }

  var threshold = .04;
  function estimate(t) {
  	for (var i=1; i<8; i++) {
  		var n = Math.round(t * i);
  		if (Math.abs(t-n/i) < threshold) return [n,i];
  	}
  	n = Math.round(t * i);
  	return [n,i];
  }


  function drawTrigDemo() {
    var canvas = document.getElementById('trig-circles');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    var ctx = canvas.getContext('2d');

    var points = [];
    var cx = canvas.width/2, cy = canvas.height/2, r = Math.min(canvas.width,canvas.height) * .35;
    var lastPoint = {x:cx+1,y:cy-1}
    function draw() {
    	ctx.clearRect(0,0,canvas.width,canvas.height);

    	ctx.fillStyle = '#9cf';
    	for (var i=0,p; p=points[i];i++) {
    		ctx.beginPath();
    		ctx.arc(p.x,p.y, 1, 0, 2*Math.PI, true);
    		ctx.fill();
    	}

    	var theta = Math.atan2(lastPoint.y-cy,lastPoint.x-cx);
    	var x = cx + r*Math.cos(theta), y = cy + r*Math.sin(theta);

    	ctx.strokeStyle = '#fff';
    	ctx.lineWidth = 2;

    	ctx.beginPath();
    	ctx.moveTo(cx,cy);
    	ctx.lineTo( x, y );
    	ctx.stroke();

    	ctx.lineWidth = .5;
    	ctx.beginPath();
    	ctx.moveTo(cx,cy);
    	ctx.lineTo( x, cy );
    	ctx.lineTo( x, y );
    	ctx.stroke();

	    var squareWidth = r * .1;
    	if ( Math.abs(cy-y) > squareWidth ) {
	    	ctx.beginPath();
	    	ctx.moveTo( x + (x>cx?-1:1)*squareWidth, cy);
	    	ctx.lineTo( x + (x>cx?-1:1)*squareWidth, cy + (y>cy?1:-1)*squareWidth );
	    	ctx.lineTo( x, cy + (y>cy?1:-1)*squareWidth );
	    	ctx.stroke();    		
    	}

    	points.push({x:x,y:y});

    	ctx.textAlign = 'center';
    	ctx.fillStyle = '#fff';
    	ctx.font='20px Helvetica,Arial';
    	var str, fraction = estimate( Math.abs(theta/Math.PI) );
    	if(fraction[0] == 1) fraction[0] = '';
    	if (fraction[0] === 0) str = '0';
    	else if (fraction[1] == 1) str = (theta>=0?'-':'')+fraction[0]+'π';
    	else str = (theta>=0?'-':'')+fraction[0]+'π / '+fraction[1];
    	ctx.fillText("r * Math.cos("+str+"), r * Math.sin("+str+")", canvas.width/2, canvas.height-20 )
    }
    draw();    

    canvas.onmousemove = function(e) {
    	lastPoint = {x:e.clientX, y:e.clientY};
    	draw();
    }
  }

  drawSVGvsCanvas();
  drawTrigDemo();
}

window.addEventListener('load',cannedDrawings);
