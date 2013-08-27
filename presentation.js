var slideIndex = 0;
var subSlideIndex = 0;
var subslides;


preso = window.preso || {}

var demos = document.getElementsByClassName('canvas-demo');
for (var i=0,demo; demo = demos[i]; i++) {
  var name = demo.getElementsByClassName('editor')[0].id;
  preso[name] = preso.canvasDemo(demo);
  preso[name].init( next, prev );
  if (preso[name].addEventListener) {
    preso[name].addEventListener('next',next);
    preso[name].addEventListener('prev',prev);
  }
}


function removeClass(el, clss) {
  var re = new RegExp("^"+clss+"$|^"+clss+"\\s+|\\s+"+clss+"$|\\s+"+clss+"(\\s+)");
  el.setAttribute( "class", (el.getAttribute('class')||'').replace(re,"$1") )
}
function addClass(el, clss) {
  removeClass(el,clss)
  el.setAttribute( 'class', (el.getAttribute('class') || '') + ' ' + clss )
}
function hasClass(el, clss) {
  return !!(el.getAttribute('class')||'').match(new RegExp("(\\s+|^)"+clss+"(\\s+|$)"));
}

if ( location.hash && location.hash.match(/#\d+$/) )
  slideIndex = +location.hash.match(/#(\d+)$/)[1]

var slides = document.getElementsByClassName('slide');
arrangeSlides( slides, slideIndex, true )
subslides = slides[slideIndex].getElementsByClassName('sub-slide');
if ( ! subslides.length ) {
  subslides = null;
} else {
  subSlideIndex = 0;
  arrangeSlides( subslides, 0 );
}

// CODE EXAMPLES
var codeExamples = document.getElementsByClassName('code');
for (var i=0,ex; ex = codeExamples[i]; i++) {
  var code, data = ex.getElementsByTagName('script')[0];
  if (data) data.innerHTML = data.innerHTML.replace(/&lt;/g,'<')
  var editor = ace.edit(ex);
  editor.setReadOnly(true);
  editor.setTheme("ace/theme/merbivore_soft");
  editor.getSession().setMode("ace/mode/html");
  editor.getSession().setTabSize(2);
  editor.setShowPrintMargin(false);
}


function arrangeSlides( slides, index, autoHeight ) {
  for (var i=0, slide; slide = slides[i]; i++) {
    slide.style.width = document.body.offsetWidth + 'px';
    if ( autoHeight )
      slide.style.height = document.body.offsetHeight + 'px';
    if ( i > index )
      slide.style.left = document.body.offsetWidth + 'px';
    else if ( i < index )
      slide.style.left = -slide.offsetWidth + 'px';
    else {
      slide.style.left = '0px';
      slide.focus();
      var interactive = slide.getElementsByClassName('interactive');
      for (var j=0, el; el = interactive[j]; j++)
        preso[el.id].show();
    }
  }      
}

function transition( oldSlide, newSlide, direction, adjustHeight ) {
  var windowWidth = document.body.offsetWidth;
  removeClass( newSlide, 'transition' );
  newSlide.style.width = document.body.offsetWidth + 'px';
  if (adjustHeight)
    newSlide.style.height = document.body.offsetHeight + 'px';
  newSlide.style.left = direction * windowWidth + 'px';
  addClass( newSlide, 'transition' );
  addClass( oldSlide, 'transition' );
  document.body.scrollLeft = 0;
  
  setTimeout(function() { 
    newSlide.style.left = '0px'; 
    oldSlide.style.left = -direction * oldSlide.offsetWidth + 'px' 
    document.body.scrollLeft = 0;
  }, 1);
  return newSlide;
}

function transitionSlide( oldSlide, newSlide, direction ) {
  var interactive = oldSlide.getElementsByClassName('interactive');
  for (var i=0, el; el = interactive[i]; i++)
    preso[el.id].hide();

  interactive = newSlide.getElementsByClassName('interactive');
  for (var i=0, el; el = interactive[i]; i++)
    preso[el.id].show();

  subslides = newSlide.getElementsByClassName('sub-slide');
  if ( ! subslides.length ) {
    subslides = null;
  } else {
    subSlideIndex = ~direction ? 0 : subslides.length - 1;
    arrangeSlides( subslides, subSlideIndex );
  }

  return transition(oldSlide, newSlide, direction, true);
}

function next(e) {
  if ( subslides && subSlideIndex < subslides.length - 1 ) {
    return transition( subslides[subSlideIndex], subslides[++subSlideIndex], 1 );
  }

  if ( slideIndex >= slides.length - 1 )
    return;

  transitionSlide( slides[slideIndex], slides[++slideIndex], 1 );
  location.hash = slideIndex;
  return false;
}

function prev(e) {
  if ( subslides && subSlideIndex > 0 )
    return transition( subslides[subSlideIndex], subslides[--subSlideIndex], -1 );

  if ( slideIndex < 1 )
    return;
  transitionSlide( slides[slideIndex], slides[--slideIndex], -1 );
  location.hash = slideIndex;
  return false;
}

document.body.addEventListener( 'keydown', function(e) {
  if (e.keyCode == 39) {
    next()
    return false;
  } else if (e.keyCode == 37) {
    prev()
    return false;
  }
} )
