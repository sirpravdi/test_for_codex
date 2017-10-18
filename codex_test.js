var createLayout = function() {

  var createHtmlLayout = function(id) {
    var basicHtml = '<div class="controls cbig">' +
      '<div class="sizing">' +
      '<div id="s_size" class="ssize"></div>' +
      '<div id="v_size" class="vsize selected"></div>' +
      '<div id="h_size" class="hsize"></div>' +
      '</div>' +
      '<div class="objects">' +
      '<div id="head" class="hline">Headline</div>' +
      '<div id="mtext" class="tline">Main Text</div>' +
      '<div id="image" class="iline">Image</div>' +
      '<div id="saver" class="sline"></div>' +
      '</div>' +
      '</div>' +
      '<div id="editor" class="vertical"></div>';
    var div = document.getElementById(id);
    div.innerHTML = basicHtml;
  };


  var sizeChange = function() {
    var prev = document.getElementsByClassName('selected');
    prev[0].classList.remove('selected');
    this.classList.add('selected');
	
    var box = document.getElementById('editor');
    var ctrls = document.getElementsByClassName('controls');
    if (this.id == 'v_size') {
      box.classList.remove('square', 'horizontal');
      box.classList.add('vertical');
      ctrls[0].classList.add('cbig');
      ctrls[0].classList.remove('csmall');
    } else if (this.id == 'h_size') {
      box.classList.remove('square', 'vertical');
      box.classList.add('horizontal');
      ctrls[0].classList.add('csmall');
      ctrls[0].classList.remove('cbig');
    } else {
      box.classList.remove('horizontal', 'vertical');
      box.classList.add('square');
      ctrls[0].classList.add('csmall');
      ctrls[0].classList.remove('cbig');
    }
  }

  var createFeatures = function() {

    var sq = document.getElementById("s_size"),
      vert = document.getElementById('v_size'),
      hor = document.getElementById('h_size'),
      head = document.getElementById('head'),
      mtext = document.getElementById('mtext'),
      image = document.getElementById('image'),
      saver = document.getElementById('saver');

    sq.addEventListener('click', sizeChange);
    vert.addEventListener('click', sizeChange);
    hor.addEventListener('click', sizeChange);

    var wrap = document.getElementById('wrapper');
    var edt = document.getElementById('editor');

    wrap.addEventListener('click', function(e) {
      if (e.target != document.getElementById('headline')) {
        document.getElementById('headline').classList.remove('hclicked');
      }
      if (document.getElementsByClassName('colorPick').length) {
        var cp = document.getElementsByClassName('colorPick'),
          ci = document.getElementsByClassName('cinp'),
          ct = document.getElementsByClassName('ctext');
        if ((e.target !== wrap) && (e.target !== edt) && ((e.target == cp[0]) || (e.target == ci[0]) || (e.target == ct[0])))
          return;
        edt.removeChild(cp[0]);
      } else {
        if (e.target !== edt)
          return;
        if (head.classList.contains('pressed') || mtext.classList.contains('pressed') || image.classList.contains('pressed'))
          return;
        var colorPick = document.createElement('div');
        colorPick.className = 'colorPick';
        edt.appendChild(colorPick);
        var cinp = document.createElement('div');
        var ctext = document.createElement('input');
        ctext.type = 'input';
        cinp.className = 'cinp';
        ctext.className = 'ctext';
        ctext.classList.add('black-border');
        colorPick.appendChild(ctext);
        colorPick.appendChild(cinp);
        ctext.oninput = function() {
          var color = /#[a-f0-9]{6}\b/gi;
          if (color.test(ctext.value)) {
            ctext.classList.remove('red-border');
            ctext.classList.add('black-border');
            cinp.style.background = ctext.value;
            edt.style.background = ctext.value;
          } else {
            ctext.classList.add('red-border');
            ctext.classList.remove('black-border');
          }
        };
      }
    });


    head.addEventListener('click', function() {
      if (head.classList.contains('pressed')) {
        head.classList.remove('pressed');
        headline.classList.remove('hclicked');
      } else {
        head.classList.add('pressed');
        mtext.classList.remove('pressed');
        image.classList.remove('pressed');
        if (!document.getElementById('headline')) {
          headline = document.createElement('div');
          htools = document.createElement('div');
          htools.id = "htools";
          headline.id = "headline";
          headline.contentEditable = "true";

          edt.appendChild(headline);
          edt.appendChild(htools);
          headline.addEventListener('click', function() {
            headline.classList.add('hclicked');
          });
        }
      }
    });


    mtext.addEventListener('click', function() {
      if (mtext.classList.contains('pressed')) {
        mtext.classList.remove('pressed');
      } else {
        mtext.classList.add('pressed');
        head.classList.remove('pressed');
        image.classList.remove('pressed');
      }
    });


    image.addEventListener('click', function() {
      if (image.classList.contains('pressed')) {
        image.classList.remove('pressed');
      } else {
        image.classList.add('pressed');
        mtext.classList.remove('pressed');
        head.classList.remove('pressed');
      }
    });
  };

  var init = function(id) {
    createHtmlLayout(id);
    createFeatures();
  };

  return {
    init: init
  };

}();

document.addEventListener("DOMContentLoaded", function(event) { 
  createLayout.init('wrapper');
});


