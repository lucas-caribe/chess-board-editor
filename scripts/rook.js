function rookCheck({ whiteX, whiteY, blackX, blackY }) {
  let squares = [];
  let startingX, startingY;

  // left
  startingX = whiteX;
  startingY = whiteY - 1;

  for (let x = startingX, y = startingY; y >= 0; y--) {
    let hit = x === blackX && y === blackY;

    squares.push({ x, y, hit });

    if (hit) break;
  }

  // top
  startingX = whiteX - 1;
  startingY = whiteY;

  for (let x = startingX, y = startingY; x >= 0; x--) {
    let hit = x === blackX && y === blackY;

    squares.push({ x, y, hit });

    if (hit) break;
  }

  // right
  startingX = whiteX;
  startingY = whiteY + 1;

  for (let x = startingX, y = startingY; y < 8; y++) {
    let hit = x === blackX && y === blackY;

    squares.push({ x, y, hit });

    if (hit) break;
  }

  // bottom
  startingX = whiteX + 1;
  startingY = whiteY;

  for (let x = startingX, y = startingY; x < 8; x++) {
    let hit = x === blackX && y === blackY;

    squares.push({ x, y, hit });

    if (hit) break;
  }

  return squares;
}
