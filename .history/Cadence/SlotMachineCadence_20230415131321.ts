// Define a interface para a configuração do Anticipator.
type AnticipatorConfig = {
  columnSize: number;
  minToAnticipate: number;
  maxToAnticipate: number;
  anticipateCadence: number;
  defaultCadence: number;
};

// Define a interface para as coordenadas de uma posição no jogo de slot.
type SlotCoordinate = {
  column: number;
  row: number;
};

// Define a interface para o símbolo especial de um jogo de slot.
type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> };

// Define a interface para os símbolos das rodadas de um jogo de slot.
type RoundsSymbols = {
  roundOne: SpecialSymbol;
  roundTwo: SpecialSymbol;
  roundThree: SpecialSymbol;
};

// Define o tipo para uma cadência do jogo de slot.
type SlotCadence = Array<number>;

// Define a interface para as cadências de cada rodada do jogo de slot.
type RoundsCadences = {
  roundOne: SlotCadence;
  roundTwo: SlotCadence;
  roundThree: SlotCadence;
};

/**
 * Define a configuração do Anticipator. Contém todas as informações necessárias para verificar o Anticipator.
 * @param columnSize É o número de colunas do jogo de slot.
 * @param minToAnticipate É o número mínimo de símbolos para iniciar a antecipação.
 * @param maxToAnticipate É o número máximo de símbolos para terminar a antecipação.
 * @param anticipateCadence É o valor da cadência quando há antecipação.
 * @param defaultCadence É o valor da cadência quando não há antecipação.
 */
const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

/**
 * Define as rodadas do jogo com a posição dos símbolos especiais que devem ser usados para gerar as cadências do jogo de slot.
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
 * Deve ser usada para obter todas as cadências do jogo de slot.
 */
const slotMachineCadences: RoundsCadences = { roundOne: [], roundTwo: [], roundThree: [] };

/**
 * Esta função recebe um array de coordenadas relativas às posições na matriz do jogo de slot.
 * Este array é a posição dos símbolos especiais.
 * E deve retornar uma cadência de parada do jogo de slot.
 * @param symbols Array<SlotCoordinate> posições dos símbolos especiais. Exemplo: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array de números que representam a cadência de parada do
