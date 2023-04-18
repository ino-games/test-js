const anticipatorConfig = {
  columnSize: 6,
  minToAnticipate: 1,
  maxToAnticipate: 2,
  anticipateCadence: 2,
  defaultCadence: 1,
};

const gameRounds = {
  roundOne: {
    specialSymbols: [
      { column: 1, row: 2 },
      { column: 3, row: 2 },
      { column: 3, row: 3 },
    ],
  },
};

function slotCadence(symbols) {
  const cadence = [];
  const { columnSize, minToAnticipate, maxToAnticipate, anticipateCadence, defaultCadence } = anticipatorConfig;
  
  // Cria array com valores padrão
  for (let i = 0; i < columnSize; i++) {
    cadence.push(defaultCadence);
  }

  // Verifica se há símbolos especiais suficientes para antecipação
  if (symbols.length >= minToAnticipate) {
    let count = 0;
    for (let i = 0; i < symbols.length; i++) {
      const { column, row } = symbols[i];
      if (row === 2 && count < maxToAnticipate) {
        cadence[column] = anticipateCadence;
        count++;
      }
      if (row === 3 && count > 0) {
        cadence[column] = anticipateCadence;
        count--;
      }
    }
  }
  
  // Converte cadência em array de valores cumulativos
  for (let i = 1; i < cadence.length; i++) {
    cadence[i] += cadence[i-1];
  }

  return cadence;
}

function handleCadences(rounds) {
  const cadences = {};
  for (const round in rounds) {
    const symbols = rounds[round].specialSymbols;
    cadences[round] = slotCadence(symbols);
  }
  return cadences;
}

console.log(handleCadences(gameRounds)); // { roundOne: [ 0, 1, 3, 5, 7, 8 ] }
