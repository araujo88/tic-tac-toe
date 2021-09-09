#include <iostream>
#include <fstream>
#include <string>
#include <list>
#include <algorithm>
#include <vector>
#include <random>

using namespace std;

unsigned int randomInt(unsigned int min, unsigned int max)
{
    int r;
    const unsigned int range = 1 + max - min;
    const unsigned int buckets = RAND_MAX / range;
    const unsigned int limit = buckets * range;

    /* Create equal size buckets all in a row, then fire randomly towards
     * the buckets until you land in one of them. All buckets are equally
     * likely. If you land off the end of the line of buckets, try again. */
    do
    {
        r = rand();
    } while (r >= limit);

    return min + (r / buckets);
}

class TicTacToe {
    private:
        int game[3][3];
        int turn;
        bool plot;
        int hasFinished;
        int seed;

        void printGame()
        {
            cout << "\n ___  ___  ___ \n";
            for (int i=0; i<3; i++) {
                for (int j=0; j<3; j++) {
                    if (game[i][j] == 0) {
                        cout << "|   |";
                    }
                    if (game[i][j] == 1) {
                        cout << "| x |";
                    }
                    if (game[i][j] == 2) {
                        cout << "| o |";
                    }
                }
                cout << "\n|___||___||___|";
                cout << "\n";
            }
        }
        int checkWinner(int gameTile)
        {
            if (gameTile == 1) {
                if (plot == true) {
                    cout << "\n 'X' wins!\n";
                }
                return -1;
            }
            if (gameTile == 2) {
                if (plot == true) {
                    cout << "\n 'O' wins!\n";
                }
                return 1;
            }
        }
        int checkWin()
        {
            if ((game[0][0] == game[1][1]) && (game[1][1] == game[2][2]) && (game[0][0] != 0)) {
                return checkWinner(game[0][0]);
            }
            if ((game[0][2] == game[1][1]) && (game[1][1] == game[2][0]) && (game[0][2] != 0)) {
                return checkWinner(game[0][2]);
            }
            for (int i=0; i<3; i++) {
                if ((game[0][i] == game[1][i]) && (game[1][i] == game[2][i]) && (game[0][i] != 0))
                    return checkWinner(game[0][i]);
                if ((game[i][0] == game[i][1]) && (game[i][1] == game[i][2]) && (game[i][0] != 0))
                    return checkWinner(game[i][0]);
            }
            for (int i=0; i<3; i++) {
                for (int j=0; j<3; j++) {
                    if (game[i][j] == 0) {
                        return 2;
                    }
                }
            }
            if (plot == true) {
                cout << "\nDraw!";
            }
            return 0;
        }
        void playerInput() {
            int x;
            int y;
            while (true) {
                cout << "Input x coordinate: " << endl;
                cin >> x;
                cout << "Input y coordinate: " << endl;
                cin >> y;
                if ((x > 2) || (x < 0) || (y < 0) || (y > 2)) {
                    cout << "Invalid coordinates! Please enter a value of x and y between 0 and 2." << endl;
                }
                if (game[x][y] != 0) {
                    cout << "Tile already filled! Please enter another coordinate." << endl;
                }
                else {
                    game[x][y] = 1;
                    break;
                }
            }
        }
        void computerInput() {
            int x;
            int y;
            while (true) {
                x = randomInt(0, 2);
                y = randomInt(0, 2);
                if (game[x][y] == 0) {
                    game[x][y] = 2;
                    break;
                }
            }
        }
    public:
        TicTacToe () {
            seed = randomInt(0, 1);
            if (plot == true) {
                if (seed == 0) {
                    cout << "'X' begins the game!" << endl;
                }
                else {
                    cout << "'O' begins the game!" << endl;
                }
            }
        }
        void setValue(int initialGame[3][3], int initialTurn, bool plotGame)
        {
            memcpy(game, initialGame, 9*sizeof(int));
            turn = initialTurn;
            plot = plotGame;
        }
        void runGame() {
            if (plot == true) {
                cout << "\nBeginning game ..." << endl;
            }
            hasFinished = checkWin();
            while (hasFinished == 2) {
                if (plot == true) {
                    cout << "\nTurn: " << turn << endl;
                    cout << "\n------------------------------------\n" << endl;
                }
                if (seed == 0) {
                    playerInput();
                    hasFinished = checkWin();
                    if (hasFinished == 2) {
                        computerInput();
                        hasFinished = checkWin();
                        if (plot == true) {
                            printGame();
                        }
                    }
                    else {
                        if (plot == true) {
                            printGame();
                        }
                    }
                }
                else {
                    computerInput();
                    if (plot == true) {
                        printGame();
                    }
                    hasFinished = checkWin();
                    if (hasFinished == 2) {
                        playerInput();
                        hasFinished = checkWin();
                        if (plot == true) {
                            printGame();
                        }
                    }
                    else {
                        if (plot == true) {
                            printGame();
                        }
                    }
                    if (plot == true) {
                    cout << "------------------------------------\n" << endl;
                    }
                }
                turn++;
            }
        }
        ~TicTacToe () { }
};

int main(void) {
    TicTacToe game1;
    int initialGame[3][3] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
    while (true) {
        game1.setValue(initialGame, 0, true);
        game1.runGame();
    }
    
    return 0;
}
