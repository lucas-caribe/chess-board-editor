function checkKnight({ whiteX, whiteY, blackX, blackY }) {
  let squares = [];

  let knightCaptureX = [-1, -2, -2, -1, 1, 2, 2, 1];
  let knightCaptureY = [-2, -1, 1, 2, 2, 1, -1, -2];

  for (let i = 0; i < 8; i++) {
    let candidateX = knightCaptureX[i] + whiteX;
    let candidateY = knightCaptureY[i] + whiteY;

    if (candidateX < 0 || candidateX > 7) continue;
    if (candidateY < 0 || candidateY > 7) continue;

    let knightCheckX = candidateX === blackX;
    let knightCheckY = candidateY === blackY;

    squares.push({
      x: candidateX,
      y: candidateY,
      hit: knightCheckX && knightCheckY,
    });
  }

  return squares;
}
