function checkPawn({ whiteX, whiteY, blackX, blackY }) {
  let squares = [];

  let pawnCaptureX = [-1, -1];
  let pawnCaptureY = [-1, 1];

  for (let i = 0; i < 2; i++) {
    let candidateX = pawnCaptureX[i] + whiteX;
    let candidateY = pawnCaptureY[i] + whiteY;

    if (candidateX < 0 || candidateX > 7) continue;
    if (candidateY < 0 || candidateY > 7) continue;

    let pawnCheckX = candidateX === blackX;
    let pawnCheckY = candidateY === blackY;

    squares.push({
      x: candidateX,
      y: candidateY,
      hit: pawnCheckX && pawnCheckY,
    });
  }

  return squares;
}
