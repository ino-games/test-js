
type WinningCombinationsResult = [number, number[]][];

function call(lines: string | any[] | number[]): WinningCombinationsResult {
  const paySymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const nonPaySymbols = [10, 11, 12, 13, 14, 15];
  
  const results = [];
  
  // Check horizontal pay lines
  for (let row = 0; row < 3; row++) {
    const line = lines.slice(row * 5, row * 5 + 5);
    const payLine = checkPayLine(line, paySymbols, nonPaySymbols);
    if (payLine) {
      results.push([payLine, [row * 5 + payLine[1], row * 5 + payLine[2], row * 5 + payLine[3]]]);
    }
  }
  
  // Check diagonal pay lines
  const diagonal1 = [lines[0], lines[6], lines[12], lines[18], lines[24]];
  const diagonal2 = [lines[4], lines[8], lines[12], lines[16], lines[20]];
  const diagonalPay1 = checkPayLine(diagonal1, paySymbols, nonPaySymbols);
  const diagonalPay2 = checkPayLine(diagonal2, paySymbols, nonPaySymbols);
  if (diagonalPay1) {
    results.push([diagonalPay1, [0, 6, 12, 18, 24][diagonalPay1[1]]]);
  }
  if (diagonalPay2) {
    results.push([diagonalPay2, [4, 8, 12, 16, 20][diagonalPay2[1]]]);
  }
  
  return results;
}

function checkPayLine(line: any[], paySymbols: string | any[], nonPaySymbols: number[]) {
  const wildIndex = line.indexOf(0);
  if (wildIndex >= 0) {
    // Wild symbol can match any other paying symbol
    for (let i = 0; i < paySymbols.length; i++) {
      if (line.indexOf(paySymbols[i]) >= 0) {
        const indexes = [wildIndex];
        for (let j = 0; j < 5; j++) {
          if (line[j] === paySymbols[i] || line[j] === 0) {
            indexes.push(j);
          }
        }
        return indexes;
      }
    }
  } else {
    // No wild symbol, check for matching symbols
    for (let i = 0; i < paySymbols.length; i++) {
      const indexes = [];
      for (let j = 0; j < 5; j++) {
        if (line[j] === paySymbols[i]) {
          indexes.push(j);
        }
      }
      if (indexes.length === 3) {
        return indexes;
      }
    }
  }
  
  return null;
}
export const WinningCombinations = {
  call: call,
};