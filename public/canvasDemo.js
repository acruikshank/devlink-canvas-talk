preso = window.preso || {};

preso.canvasDemo = function(slide) {
  var editor, results = slide.getElementsByClassName('results')[0];

  var dateMatch = /(\d+)-(\d+)-(\d+)T\d+:\d+:\d+\.\d+Z/;

  function gen(type, cls) {var e=document.createElement(type); e.setAttribute('class',cls); return e; }
  function text(txt) { return document.createTextNode(txt); }
  function render(js) {
    var resultParent = results.parentElement;
    resultParent.removeChild(results);
    results = document.createElement('iframe');
    results.setAttribute('class','results');
    resultParent.appendChild(results);
    setTimeout(function(){
      var doc = (results.contentDocument||results.contentWindow.document);
      doc.head.innerHTML = '<style>html{height:100%;} body{margin:0;height:100%;} '
          + 'canvas{width:100%;height:100%;}</style>'
      doc.body.innerHTML = '<canvas id="c"></canvas>';
      var script = doc.createElement('script');
      script.innerHTML = js;
      doc.body.appendChild(script);
    },10);
  }

  function init( forward, back ) {
    var editorElement = slide.getElementsByClassName('editor')[0];
    var editorId = editorElement.id;
    editor = ace.edit(editorId);
    editor.setTheme("ace/theme/merbivore_soft");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setTabSize(2);
    editor.getSession().setUseSoftTabs(true);
    editor.setShowPrintMargin(false)
    editor.commands.addCommand({
        name: 'toggleEditor',
        bindKey: {win: 'Ctrl-Alt-Enter',  mac: 'Ctrl-Alt-Enter'},
        exec: function() {render(editor.getValue())}
    });

    editorElement.onkeyup = function(e) { e.stopPropagation(); return false; }

    var results = slide.getElementsByClassName('results')[0];
  }

  function show() { editor.focus() }
  function hide() { 
    if (editor) editor.blur()
    var results = slide.getElementsByClassName('results')[0]; if (results) results.innerHTML=''; 
  }
  var listeners = {};
  function addEventListener(type, f) { if (f) (listeners[type]=listeners[type]||[]).push(f); }
  function trigger(type) { for (var i=0,f; f=(listeners[type]||[])[i];i++) f() }

  return { init: init, show: show, hide: hide, addEventListener:addEventListener   }
}