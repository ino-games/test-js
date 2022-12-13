Teste realizado para processo seletivo da Ino Games.

Exercícios propostos; 

# Winning Combinations Challenge

## What is the challenge?

We are developing a slot game, and you are responsible for the functionality that checks whether a pay line has occurred.

A pay line is a combination of symbols that results in a win on a slot machine. The original slot machines only had one pay line, which would pay if three matching symbols created a horizontal line.

You will have an array of numbers with 5 or 6 positions containing the game symbols, but we have some rules regarding the symbols:

- `0` is the wild symbol. It forms a pay line with any other paying symbol. For example, if the received array was: `[1, 2, 0, 2, 3]`, we have a pay line;

- the paying symbols are: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`;

- and there are the non-paying symbols, which are: `[10, 11, 12, 13, 14, 15]`.

---

Implement a function to solve a game need: **slot machine cadence**.

## Example of how the game works

The game has a slot machine with 5 columns and 6 rows. (A matrix of 5x6)
Every time a new round starts, the machine spins all columns and receive a new set of symbol for each position.
When the machine stop spinning each column stops with a default cadence.
But the game has a special symbol that can appear when receive the new set of symbols,
and that special symbol can change the machine column cadence to stop.
The special symbol has minimum number of symbols to start changing the cadence and a maximum number of symbols to end the change in cadence.
This change of cadence is called Anticipation.