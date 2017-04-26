'use strict';

window.setDraggable = (function () {
  var callback = null;
  var startCoords = null;
  var handle = null;
  var limitDragPlace = null;

  var mouseDownHandler = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var dragConstraints = {
      minX: 0,
      minY: 0,
      maxX: limitDragPlace.clientWidth - handle.clientWidth,
      maxY: limitDragPlace.clientHeight - handle.clientHeight
    };

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newX = handle.offsetLeft - shift.x;
    var newY = handle.offsetTop - shift.y;
    if ((newX >= dragConstraints.minX && newX <= dragConstraints.maxX) &&
      (newY >= dragConstraints.minY && newY <= dragConstraints.maxY)) {
      handle.style.left = newX + 'px';
      handle.style.top = newY + 'px';
    }

    callback(newX, newY);
  };

  var mouseUpHandler = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  return function (draggableElement, limitationPlace, cb) {
    callback = cb;
    handle = draggableElement;
    limitDragPlace = limitationPlace;

    draggableElement.addEventListener('mousedown', mouseDownHandler);
  };
})();
