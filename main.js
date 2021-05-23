const board = document.querySelector('.board');
const selectors = document.querySelectorAll('.selector');
const checkButton = document.querySelector('#check-attack');

let selectedPiece;
let placedWhitePiece = { x: -1, y: -1, type: '' };
let placedBlackPiece = { x: -1, y: -1, type: '' };

// board generator
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if ((i + j) % 2 === 0)
      board.innerHTML += `<div class="square light" data-x="${i}" data-y="${j}"></div>`;
    else
      board.innerHTML += `<div class="square dark" data-x="${i}" data-y="${j}"></div>`;
  }
}

function clearBoard() {
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.removeAttribute('piece');
    square.removeAttribute('highlighted');
    square.removeAttribute('target');
  });
}

function clearHighlights() {
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.removeAttribute('highlighted');
    square.removeAttribute('target');
  });
}

function getSquare(x, y) {
  return document.querySelector(`[data-x='${x}'][data-y='${y}']`);
}

function getPosition(square) {
  const x = square.dataset.x;
  const y = square.dataset.y;

  return { x, y };
}

function getPieceXPosition(piece) {
  return Number(piece.x);
}

function getPieceYPosition(piece) {
  return Number(piece.y);
}

function removePiece(x, y) {
  const square = getSquare(x, y);

  square.removeAttribute('piece');
}

function checkPlacedWhitePiece() {
  return placedWhitePiece.type !== '';
}

function checkPlacedBlackPiece() {
  return placedBlackPiece.type !== '';
}

function setPiece(piece, destination) {
  const { x, y } = getPosition(destination);

  if (/white*/.test(piece)) {
    if (checkPlacedWhitePiece()) {
      clearHighlights();
      removePiece(placedWhitePiece.x, placedWhitePiece.y);
    }

    placedWhitePiece = { x, y, type: piece };
  } else {
    if (checkPlacedBlackPiece()) {
      clearHighlights();
      removePiece(placedBlackPiece.x, placedBlackPiece.y);
    }

    placedBlackPiece = { x, y, type: piece };
  }

  if (destination) destination.setAttribute('piece', piece);
}

// board events
board.addEventListener('click', (event) => {
  const targetX = event.target.getAttribute('data-x');
  const targetY = event.target.getAttribute('data-y');

  if (!selectedPiece) return;

  const destination = getSquare(targetX, targetY);

  setPiece(selectedPiece, destination);
});

// selector events
selectors.forEach((selector) => {
  selector.addEventListener('click', (event) => {
    const target = event.target;
    const previousSelected = document.querySelector('.selector > *[selected]');

    if (target.getAttribute('trash') !== null) {
      clearBoard();
      return;
    }

    if (target.getAttribute('pointer') !== null) {
      return;
    }

    if (previousSelected) previousSelected.removeAttribute('selected');

    target.setAttribute('selected', '');

    selectedPiece = target.getAttribute('piece');
  });
});

// button events
checkButton.addEventListener('click', (event) => {
  let attackedSquares = [];

  if (checkPlacedBlackPiece() && checkPlacedWhitePiece()) {
    const piecesPositions = {
      whiteX: getPieceXPosition(placedWhitePiece),
      whiteY: getPieceYPosition(placedWhitePiece),
      blackX: getPieceXPosition(placedBlackPiece),
      blackY: getPieceYPosition(placedBlackPiece),
    };

    switch (placedWhitePiece.type) {
      case 'white-knight':
        attackedSquares = checkKnight(piecesPositions);
        break;
      case 'white-pawn':
        attackedSquares = checkPawn(piecesPositions);
        break;
    }
  }

  if (attackedSquares.length > 0) {
    attackedSquares.forEach((attackedSquare) => {
      const square = getSquare(attackedSquare.x, attackedSquare.y);

      if (attackedSquare.hit) square.setAttribute('target', '');
      else square.setAttribute('highlighted', '');
    });
  }
});
