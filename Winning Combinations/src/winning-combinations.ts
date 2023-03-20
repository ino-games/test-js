type WinningCombinationsResult = [number, number[]][];

// Logic that will be developed - store the paying numbers and the wild card in a variable.
// After that, I need to go through the line in search of the result of 3 equal or greater symbols in sequence.

function call(lines: number[]): WinningCombinationsResult {
  // Variavél para guardar os valores válidos
  const symbolsPayment: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Variavél para guardar o símbolo coringa
  const symbolZero: number = 0;

  // Variavél que será retornada no final da função
  let result: [number, number[]][] = [];

  let countSymbol: number = 0;

  // Função para validar se o símbolo é um symbolo válido
  function validateSymbol(elem: number, array: number[]) {
    // Se não tiver elemento, para aqui
    if (!elem) {
      return false;
      // Se o elemento for igual a "0" - coringa, retorna True
    } else if (elem == 0) {
      return true;

      // Caso o elemento esteja incluido nos símbolos de pagamento, retorna True
    } else {
      return array.includes(elem);
    }
  }

  // Função para realizar a contagem de sequência de simbolos, aonde se for maior que 2 retorna True e se for menor, retorna False
  function symbolCount(elem: number, indice: number, array: number[]) {
    countSymbol = 0;
    // Primeira validação o próximo item do array tem que ser igual ao elemento ou coringa
    if (elem == array[indice + 1] || array[indice + 1] == 0) {
      countSymbol++;
      // Segunda validação depois de 2 casas o item do array tem que ser igual ao elemento ou coringa
      if (elem == array[indice + 2] || array[indice + 2] == 0) {
        countSymbol++;
        return true;
      }
    } else {
      return false;
    }
  }

  // Função para prerar o resultado caso o "countSymbol" for maior que 2, isto é, encontrar 3 na sequência
  function resultPrepar(elem: number, indice: number, array: number[]) {
    if (
      array[indice + 4] == 0 ||
      (elem == array[indice + 4] && array[indice + 3] == 0) ||
      elem == array[indice + 3]
    ) {
      result = [
        [elem, [indice, indice + 1, indice + 2, indice + 3, indice + 4]],
      ];
    } else if (array[indice + 3] == 0 || elem == array[indice + 3]) {
      result = [[elem, [indice, indice + 1, indice + 2, indice + 3]]];
    } else {
      result = [[elem, [indice, indice + 1, indice + 2]]];
    }
  }

  // Percorrendo o array de lines e chamando as funções feitas anteriormente.
  lines.forEach((elem, index) => {
    const symbolValid = validateSymbol(elem, symbolsPayment);

    if (symbolValid) {
      const findSymbol = symbolCount(elem, index, lines);
      if (findSymbol) {
        resultPrepar(elem, index, lines);
        // result = [[elem, [index, index + 1, index + 2]]];
        return result;
      }
    }
  });

  return result;
}
export const WinningCombinations = { call };
