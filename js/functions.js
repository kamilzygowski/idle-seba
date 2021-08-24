
var utils = {};
{
  function walka() {
    console.log('jajks');
  }

  function dragElement(elmnt, id) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elmnt.id + id)) {
      // if present, the shopView is where you move the DIV from:
      document.getElementBy(elmnt.id + id).onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:

      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      console.log(elmnt.style.top, elmnt.style.left);
    }

    function closeDragElement(e) {
      e = e || window.event;
      e.preventDefault();
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;

    }
  }

  function createImage(x, y, width, height, src) {


    var image = new Image();
    image.src = src;
    image.onload = function () {
      this.ctx.drawImage(image, x,y, width, height);
    };
  }

  utils.walka = walka;
  utils.dragElement = dragElement;
  utils.createImage = createImage;
}
