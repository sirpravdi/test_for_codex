
/** Creates main layout and it's features */
var createLayout = function() {

  var ctrls = document.createElement('div');
  ctrls.className = 'controls cbig';
  var szng = document.createElement('div');
  szng.className = 'sizing';
  var sq = document.createElement('div');
  sq.id = 's_size';
  sq.className = 'ssize';
  var vert = document.createElement('div');
  vert.id = 'v_size';
  vert.className = 'vsize selected';
  var hor = document.createElement('div');
  hor.id = 'h_size';
  hor.className = 'hsize';
  var obj = document.createElement('div');
  obj.className = 'objects';
  var head = document.createElement('div');
  head.className = 'hline';
  head.id = 'head';
  head.textContent = 'Headline';
  var mtext = document.createElement('div');
  mtext.className = 'tline';
  mtext.id = 'mtext';
  mtext.textContent = 'Main Text';
  var ilabel = document.createElement('label');
  ilabel.className = 'iline';
  ilabel.textContent = 'Image';
  var image = document.createElement('input');
  image.className = 'iline';
  image.id = 'image';
  image.type = 'file';
  image.accept = 'image/*';
  var saver = document.createElement('div');
  saver.className = 'sline';
  saver.id = 'saver';
  var edt = document.createElement('div');
  edt.className = 'vertical';
  edt.id = 'editor';


/** 
  * Creates Layout in div provided by user
  * @param {string} id - The id of the div for layout inserting.
  */
  var createHtmlLayout = function(id) {
    var div = document.getElementById(id);
    div.appendChild(ctrls);
    div.appendChild(edt);
    ctrls.appendChild(szng);
    ctrls.appendChild(obj);
    szng.appendChild(sq);
    szng.appendChild(vert);
    szng.appendChild(hor);
    obj.appendChild(head);
    obj.appendChild(mtext);
    obj.appendChild(ilabel);
    ilabel.appendChild(image);
    obj.appendChild(saver);
  };

  /** 
  * Changes editor size after pressing sizing buttons
  */
  var sizeChange = function() {
    var prev = document.getElementsByClassName('selected');
    prev[0].classList.remove('selected');
    this.classList.add('selected');

    if (this.id == 'v_size') {
      edt.classList.remove('square', 'horizontal');
      edt.classList.add('vertical');
      ctrls.classList.add('cbig');
      ctrls.classList.remove('csmall');
    } else if (this.id == 'h_size') {
      edt.classList.remove('square', 'vertical');
      edt.classList.add('horizontal');
      ctrls.classList.add('csmall');
      ctrls.classList.remove('cbig');
    } else {
      edt.classList.remove('horizontal', 'vertical');
      edt.classList.add('square');
      ctrls.classList.add('csmall');
      ctrls.classList.remove('cbig');
    }
  };

  /** 
  * Call on wrap.click event; Specify events for wrap clicks
  */
  var wrapEvents = function(e) {
    var wrap = document.getElementById('wrapper');

    if ((e.target != document.getElementById('headline'))&&(e.target != document.getElementById('htools'))&&document.getElementById('headline')) {
      document.getElementById('headline').classList.remove('hclicked');
    }

    if (document.getElementsByClassName('colorPick').length) {
      var cp = document.getElementsByClassName('colorPick'),
      ci = document.getElementsByClassName('cinp'),
      ct = document.getElementsByClassName('ctext');

      if ((e.target !== wrap) && (e.target !== edt) && ((e.target == cp[0]) || (e.target == ci[0]) || (e.target == ct[0])))
        return;
      edt.removeChild(cp[0]);
    } 
    else {
      if (e.target !== edt)
        return;

      //if (head.classList.contains('pressed') || mtext.classList.contains('pressed') || image.classList.contains('pressed'))
        //return;

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
  };

  /** 
  * Call on head.click event
  */
  var headClick = function(){
    if (!head.classList.contains('pressed')) {
      head.classList.add('pressed');
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
  };

  /** 
  * Call on text.click event; Specify events for wrap clicks
  */
  var textClick = function(){
    if (!mtext.classList.contains('pressed')) {
      mtext.classList.add('pressed');
    }
  };

  /** 
  * Call on image.change event; Specify events for wrap clicks
  */
  var uploadFile = function(){
    if (!ilabel.classList.contains('pressed')) {
      ilabel.classList.add('pressed');
      var pic = document.getElementById('image').files[0];
      src = URL.createObjectURL(pic);
      imagebox = document.createElement('img');
      imagebox.id = 'imagebox';
      imagebox.src =  src;
      edt.appendChild(imagebox);

    }
  };
  
  /** 
  * Creates features for the layout
  */
  var createFeatures = function() {

    sq.addEventListener('click', sizeChange);
    vert.addEventListener('click', sizeChange);
    hor.addEventListener('click', sizeChange);

    var wrap = document.getElementById('wrapper');
    wrap.addEventListener('click', wrapEvents);

    //saver.addEventListener('change', uploadFile);

    head.addEventListener('click', headClick);
    mtext.addEventListener('click',textClick);
    image.addEventListener('change', uploadFile);

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


