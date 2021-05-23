function checkKnight(knightX, knightY, opponentX, opponentY) {
    let squares = [];

    let knightCaptureX = [-1, -2, -2, -1, 1, 2, 2, 1];
    let knightCaptureY = [-2, -1, 1, 2, 2, 1, -1, -2];

    for(let i = 0; i < 8; i++) {
        let candidateX = knightCaptureX[i] + knightX;
        let candidateY = knightCaptureY[i] + knightY;

        if (candidateX < 0 || candidateX > 7) continue;
        if (candidateY < 0 || candidateY > 7) continue;

        let knightCheckX = candidateX === opponentX;
        let knightCheckY = candidateY === opponentY;

        squares.push({
            x: candidateX,
            y: candidateY,
            hit: knightCheckX && knightCheckY,
        });
    }

    return squares;
}