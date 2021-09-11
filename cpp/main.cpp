#include "TicTacToe.hpp"

using namespace std;

int main(void) {
    int initialGame[3][3] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
    int seed = randomInt(0, 1);
    HumanVsComputer game1;
    game1.setValue(initialGame, 0, true, seed);
    game1.runGame();
    ComputerVsComputer game2;
    game2.setValue(initialGame, 0, true, seed);
    game2.runGame();
    
    return 0;
}
