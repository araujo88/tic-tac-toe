#include <iostream>
#include <fstream>
#include <list>
#include <algorithm>
#include <vector>
#include <numeric>

#include "RandomInt.hpp"

using namespace std;

template <typename T>
void printMatrix(const vector< vector<T> > & matrix)
{
    for(auto row_obj : matrix)
    {
        for (auto elem: row_obj)
        {
            cout<<elem<<", ";
        }
        cout<<endl;
    }
    cout<<endl;
}

template <typename T>
void printVector(const vector<T> & vector)
{
    for (auto i: vector)
    std::cout << i << ' ';
}

typedef struct Coordinates {
    int x;
    int y;
} coor;

typedef struct Result {
    vector < int > moves1x;
    vector < int > moves1y;
    vector < int > moves2x;
    vector < int > moves2y;
    int totalTurns;
    int score;
} res;

class TicTacToe {
    protected:
        int game[3][3];
        int turn;
        bool plot;
        int hasFinished;
        int seed;
        int p1x;
        int p1y;
        int p2x;
        int p2y;
        coor p1, p2;
        res gameResult;
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
        virtual coor player1Input() { }
        virtual coor player2Input() { }
    public:
        TicTacToe () { }
        void setValue(int initialGame[3][3], int initialTurn, bool plotGame, int initialSeed)
        {
            memcpy(game, initialGame, 9*sizeof(int));
            turn = initialTurn;
            plot = plotGame;
            seed = initialSeed;
        }
        res runGame() {
            if (plot == true) {
                cout << "\nBeginning game ..." << endl;
            }
            if (plot == true) {
                if (seed == 0) {
                    cout << "'X' begins the game!" << endl;
                }
                else {
                    cout << "'O' begins the game!" << endl;
                }
            }
            hasFinished = checkWin();
            while (hasFinished == 2) {
                if (seed == 0) {
                    p1 = player1Input();
                    gameResult.moves1x.push_back(p1.x);
                    gameResult.moves1y.push_back(p1.y);
                    if (plot == true) {
                        printGame();
                    }
                    hasFinished = checkWin();
                    turn++;
                    if (plot == true) {
                        cout << "\nTurn: " << turn << endl;
                        cout << "\n------------------------------------\n" << endl;
                    }
                    if (hasFinished == 2) {
                        p2 = player2Input();
                        gameResult.moves2x.push_back(p2.x);
                        gameResult.moves2y.push_back(p2.y);
                        hasFinished = checkWin();
                        if (plot == true) {
                            printGame();
                        }
                        turn++;
                        if (plot == true) {
                            cout << "\nTurn: " << turn << endl;
                            cout << "\n------------------------------------\n" << endl;
                        }
                    }
                    else {
                        if (plot == true) {
                            printGame();
                        }
                    }
                }
                else {
                    p2 = player2Input();
                    gameResult.moves2x.push_back(p2.x);
                    gameResult.moves2y.push_back(p2.y);
                    if (plot == true) {
                        printGame();
                    }
                    hasFinished = checkWin();
                    turn++;
                    if (plot == true) {
                        cout << "\nTurn: " << turn << endl;
                        cout << "\n------------------------------------\n" << endl;
                    }
                    if (hasFinished == 2) {
                        p1 = player1Input();
                        gameResult.moves1x.push_back(p1.x);
                        gameResult.moves1y.push_back(p1.y);
                        hasFinished = checkWin();
                        if (plot == true) {
                            printGame();
                        }
                        turn++;
                        if (plot == true) {
                            cout << "\nTurn: " << turn << endl;
                            cout << "\n------------------------------------\n" << endl;
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
            }
            gameResult.totalTurns = turn;
            gameResult.score = checkWin();
            return gameResult;
        }
        ~TicTacToe () { }
};

class HumanVsComputer: public TicTacToe {
    protected:
        coor player1Input() {
            coor p;
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
            p.x = x;
            p.y = y;
            return p;
        }
        coor player2Input() {
            coor p;
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
            p.x = x;
            p.y = y;
            return p;
        }
};

class ComputerVsComputer: public TicTacToe {
    protected:
        coor player1Input() {
            coor p;
            int x;
            int y;
            while (true) {
                x = randomInt(0, 2);
                y = randomInt(0, 2);
                if (game[x][y] == 0) {
                    game[x][y] = 1;
                    break;
                }
            }
            p.x = x;
            p.y = y;
            return p;
        }
        coor player2Input() {
            coor p;
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
            p.x = x;
            p.y = y;
            return p;
        }
};