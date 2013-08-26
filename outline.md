A. Introduction
B. What is Canvas
    canvas vs. SVG
        SVG is HTML for shapes.
        Canvas is an IMG tag with a drawing API.
C. The 40,40,10,10 rect
    Setting up the canvas.
    resolution
    Drawing the rect.

D. Paths
    beginPath()
    moveTo() lineTo()
    stroke() strokeStyle lineWidth lineCap
    fill() fillStype
    quadraticCurveTo() bezierCurveTo()
E. A Little Math
    Linear Interpolation?
        y = START + (x/s)*(END-START)
    Math.cos()
        Ratio of hypotenuse
        Multiplying by radius gives us the X axis
    Math.sin()
        Multiplying by radius gives us the Y axis
    Get used to working in radians.
F. Stars
G. Shapes
    rect()
    arc()
    arc(cx, cy, r, 0, 2*Math.PI, true)
H. Images
    drawImage()
I. Text
    Don't do it
    This is how.
J. Transforms
    save() restore()
    coordinate systems
    translate, scale, rotate
L. Animation
    clearRect() 
    setInterval() requestAnimationFrame
M. Caching
H. Interaction




var canvas = window.c;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
var ctx = canvas.getContext('2d');

for (var i=0; i<1600; i++) {
  ctx.fillStyle = 'rgba(255,'+
    parseInt(Math.random()*200)
    +','+
    parseInt(Math.random()*200)
    +','+
    (Math.random()*.05)+')';
  ctx.fillRect(
    canvas.width*Math.random()-50,
    canvas.height*Math.random()-50, 100, 100)
}
