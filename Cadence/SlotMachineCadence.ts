// tipagem da configuração da antecipação
type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

// tipagem da coordenada do slot
type SlotCoordinate = {
  column: number;
  row: number;
};

// tipagem dos simbolos especiais
type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

// tipagem dos rounds dos símbolos
type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

// tipagem do slot da cadência
type SlotCadence = Array<number>;

// tipagem dos rounds por cadência - Rounds Value
type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

/**
 * Anticipator configuration. Has all information needed to check anticipator.
 * @param columnSize It's the number of columns the slot machine has.
 * @param minToAnticipate It's the minimum number of symbols to start anticipation.
 * @param maxToAnticipate It's the maximum number of symbols to end anticipation.
 * @param anticipateCadence It's the cadence value when has anticipation.
 * @param defaultCadence It's the cadence value when don't has anticipation.
 */
const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

/**
 * Game rounds with special symbols position that must be used to generate the SlotCadences.
 */
const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 1, row: 3 },
      { column: 3, row: 4 },
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 },
      { column: 0, row: 3 },
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 },
      { column: 4, row: 3 },
    ],
  },
};

/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences: RoundsCadences = {
  roundOne: [],
  roundTwo: [],
  roundThree: [],
};

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  // Realizando a desestruturação do objeto
  const {
    anticipateCadence,
    columnSize,
    defaultCadence,
    maxToAnticipate,
    minToAnticipate,
  } = anticipatorConfig;

  //  Criando a variavél que será retornanda no final desta função
  const resultRound: number[] = [];
  resultRound[0] = 0;

  // Vou separar as colunas com os símbolos dentro de uma variável para depois percorrer as linhas em busca de antecipação
  const columnsSymbols = symbols.map((s) => s.column);

  // Definindo o tamanho máximo que preciso percorrer do meu resultado
  const resultRoundLength = columnSize - 1;

  // Capturando o valor máximo e minímo a ser utilizado
  const maxValue = Math.max(...columnsSymbols);
  const minValue = Math.min(...columnsSymbols);

  // Primeira validação - Simbolos são menores que os valores máx. dos símbolos e maior ou igual que os valores min. ?
  if (symbols.length < maxToAnticipate && symbols.length >= minToAnticipate) {
    // Percorrendo as linhas para procurar alguma antecipação
    for (let i = 0; resultRound.length <= resultRoundLength; i++) {
      // Se a minha linha tiver o valor igual ao mínimo para realizar a antecipação, realizar a soma da linha + Antecipação
      if (i === minToAnticipate) {
        for (i; resultRound.length < resultRoundLength; i++) {
          resultRound.push(resultRound[i] + anticipateCadence);
        }
        // Se não passar na validação anterior, mantem o valor "padrão"
      } else {
        resultRound.push(resultRound[i] + defaultCadence);
      }
    }

    //  Segunda validação - Símbolos são igual ao Máx. valor e tem o valor Maior igual ao min. para antecipar
  } else if (
    symbols.length == maxToAnticipate &&
    symbols.length >= minToAnticipate
  ) {
    for (let i = 0; resultRound.length <= resultRoundLength; i++) {
      // Se a minha linha tiver o valor igual ao mínimo para realizar a antecipação, realizar a soma da linha + Antecipação
      if (i >= minValue && i < maxValue) {
        resultRound.push(resultRound[i] + anticipateCadence);
      } else {
        resultRound.push(resultRound[i] + defaultCadence);
      }
    }
  } else {
    for (let i = 0; resultRound.length <= resultRoundLength; i++) {
      if (i == minValue) {
        for (i; resultRound.length <= resultRound.length; i++) {
          resultRound.push(resultRound[i] + anticipateCadence);
        }
      } else {
        resultRound.push(resultRound[i] + defaultCadence);
      }
    }
  }

  return resultRound;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  slotMachineCadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  slotMachineCadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  slotMachineCadences.roundThree = slotCadence(
    rounds.roundThree.specialSymbols
  );

  return slotMachineCadences;
}

console.log("CADENCES: ", handleCadences(gameRounds));
