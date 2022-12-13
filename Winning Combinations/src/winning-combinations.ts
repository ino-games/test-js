type WinningCombinationsResult = [number, number[]][];

function call(lines: number[]): WinningCombinationsResult {
  const array: WinningCombinationsResult = [];
  const paySymbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const payingSymbols: number[][] = [];
  let matchLines = [];
  let payLineZero = 0;
  let payLine = 0;

  for (let i = 0; i <= lines.length; i++) {
    //se todos os valores do array sao 0, então payLineZero + 1.
    if (lines[i] === 0) {
      payLineZero++;
      // se os valores do array sao paySimbols
    } else if (paySymbols.includes(lines[i])) {
      //caso os valores cumpram com as regras para obter uma Winning Combination, temos pelo menos uma combinação ganhadora.
      if (
        (lines[i] === lines[i + 1] && lines[i] === lines[i + 2]) ||
        (lines[i + 1] === 0 && lines[i + 2] === 0) ||
        (lines[i - 1] === 0 && lines[i - 2] === 0) ||
        (lines[i + 1] === lines[i] && lines[i - 1] === 0) ||
        (lines[i - 1] === lines[i] && lines[i + 1] === 0) ||
        (lines[i + 1] === 0 && lines[i + 2] === lines[i])
      ) {
        //como um mesmo numero pode cumprir estas condições mais de uma vez, 
        //primeiro sao enviados para o array matchLines.
        matchLines.push(lines[i]);
      } else {
        array;
      }
    }
  }
//precorre o array matchLines, para ver se os numeros se repetem,
// e envia para o array payingSymbols, um único numero de cada valor.
//soma 1 payLine a cada valor enviado para payingSymbols.
  for (let i = 0; i < matchLines.length; i++) {
    if (matchLines[i] !== matchLines[i + 1]) {
      payingSymbols.push([matchLines[i]]);
      payLine++;
    }
  }

  if (lines.length === payLineZero) {
    let indexJ = [];
    let idx = lines.indexOf(0);
    while (idx != -1) {
      indexJ.push(idx);
      idx = lines.indexOf(0, idx + 1);
    }
    array.push([0, indexJ]);
  } else if (payLine >= 1) {
    for (let x = 0; x < payingSymbols.length; x++) {
      payingSymbols[x].forEach((num) => {
        let index = [];
        let idx = lines.indexOf(num);
        let idxZero = lines.indexOf(0);
        //index dos valores 0 caso existam.
        while (idxZero != -1) {
          index.push(idxZero);
          idxZero = lines.indexOf(0, idxZero + 1);
        }
        //index dos valores que se encontram em payingSymbols.
        while (idx != -1) {
          index.push(idx);
          idx = lines.indexOf(num, idx + 1);
        }
        index.sort();
        // precisamos filtrar os indexes consecutivos, para enviar a aqueles que cumprem a regra de Winning Combination.
        let firstFilter = [];
        let secondFilter = [];
        for (let j = 0; j < index.length; j++) {
          if (
            index[j + 1] - index[j] == 1 ||
            (index[j] - index[j - 1] == 1 && index[j + 2] - index[j] == 2) ||
            index[j] - index[j - 2] == 2
          ) {
            firstFilter.push(index[j]);
          }
        }
        //confere se os números que ficaram no primeiro filtro realmente sao consecutivos.
        for (let z = 0; z < firstFilter.length; z++) {
          if (
            firstFilter[z + 1] - firstFilter[z] == 1 ||
            firstFilter[z] - firstFilter[z - 1] == 1
          ) {
            secondFilter.push(firstFilter[z]);
          }
        }
        //enviamos o numero e os indexes correspondentes para o array.
        array.push([num, secondFilter]);
      });
    }
  }

  return array;
}

export const WinningCombinations = { call };
