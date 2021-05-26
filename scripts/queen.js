function queenCheck({ whiteX, whiteY, blackX, blackY }) {    
    let rowsAndColumns = rookCheck({ whiteX, whiteY, blackX, blackY });
    let diagonals = bishopCheck({ whiteX, whiteY, blackX, blackY });
    let squares = rowsAndColumns.concat(diagonals);

    return squares;
  }
  