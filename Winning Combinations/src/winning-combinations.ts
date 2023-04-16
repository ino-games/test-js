type WinningCombinationsResult = [number, number[]][];

/*
  To understand the example below, read in this order:
  - First Iteration (3 comments)
  - Second Iteration (3 comments)
  - Third Iteration (1 commented, but follows the 2nd iteration logic)
  - Fourth Iteration (4 comments)
  - Fifth Iteration

  Read following the indexes of the iteration, like:
  1- First Iteration
  2- First Iteration
  and so on...
  These indexes represent the order of the iteration, it'll help in your comprehension.

  PS: These comments were created to help you understand what the code is doing, but if it's not helping, you can delete the comments.
*/

function call(symbolLine: number[]): WinningCombinationsResult {
  const payingSymbols = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const output: WinningCombinationsResult = [];
  let indexes: number[] = [];
  let i = 0;
  let num = 0;

  // this function ends the sequence
  const addToOutput = () => {
    // 3- Fourth Iteration: indexes array is [0, 1, 2]. As I mentioned in the 2nd comment, 2 broke the 5 sequence,
    // so, 5 (which is num) and indexes are stored in the output array.
    // 3- Fifth Iteration: For 2, indexes will be [3, 4]. As its length is not more than 2, indexes and num are going to get a reset.
    if (indexes.length > 2) {
      output.push([num, indexes]);
    }

    // reset these variables for the next sequence
    indexes = [];
    num = 0;
  };

  // the code below runs while i is less than the length of the symbolLine array
  while (i < symbolLine.length) {
    // num in this case will be the sequenceSymbol if it's a payingSymbol
    if (!num && payingSymbols.has(symbolLine[i])) {
      num = symbolLine[i];
    }
    // Example: [5, 5, 5, 2, 2];
    // 1- First Iteration: num = 5;
    // 1- Second Iteration: Next symbol is 5, so the if above won't do anything.
    // 1- Third Iteration will work like the second one.
    // 1- Fourth Iteration: if above won't do anything.
    // 1- Fifth Iteration: will work like the second iteration, but here the iteration is done.

    // 2- First Iteration: After the assignment, the symbol index is saved in indexes array.
    /* 
      2- Second Iteration: the if below will save the index of this next symbol, because:
      currentSymbol (5) == num (num is 5, as it is the previous symbol, before the i++)
    */
    if (symbolLine[i] == 0 || symbolLine[i] == num) {
      indexes.push(i);

      /*
        2- Fourth Iteration: For the if above, 2 isn't zero, and 2 isn't equal to num (num = 5 in the example).
        If below: 2 is a payingSymbol, but it broke the previous sequence, so addToOutput() will save the previous sequence.
      */
    } else if (payingSymbols.has(symbolLine[i])) {
      addToOutput();

      i--;

      while (!symbolLine[i]) {
        i--;
      }
    } else {
      // this else is for nonPayingSymbols -> [10, 11, 12, 13, 14, 15]
      addToOutput();
    }

    // 3- First Iteration: Then, i++, so we can access the next symbol in symbolLine array.
    // 3- Second Iteration: i++ again for the next symbol.
    // 4- Fourth Iteration: i was reduced in the else if above and here come back to normal, so we can access the next symbol.
    i++;
  }

  // 2- Fifth Iteration: while loop is done, so this function will save/reset a sequence, depending on indexes length.
  addToOutput();

  // iteration ended, in the example, the return output would be: [[5, [0, 1, 2]]]
  return output;
}
export const WinningCombinations = { call };
