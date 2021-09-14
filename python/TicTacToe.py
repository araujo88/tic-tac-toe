import numpy as np
import copy
import random

class TicTacToe:
    def __init__(self, initialGame=None, initialTurn=None, plotGame=None):
        self._empty = [["_" for i in range(3)] for j in range(3)]
        if initialGame is None:
            initialGame = copy.copy(self._empty)
        if initialTurn is None:
            initialTurn = 0
        if plotGame is None:
            plotGame = False

        self._game = copy.copy(initialGame)
        self._turn = initialTurn
        self._plot = plotGame
        self._has_finished = self.check_win()
        self._seed = random.randint(0, 1) # random seed to check who begins

        if (self._plot):
            if self._seed == 0:
                print("'X' begins the game!")
            else:
                print("'O' begins the game!")

    # Print game
    def print_game(self):
        print("\n-------------------------------------\n")
        print(np.matrix(self._game))
        print("\n-------------------------------------\n")

    # Check who is winner
    def check_winner(self, game_tile):
        if game_tile == "x":
            if (self._plot):
                print("'X' wins!")
            return -1
        if game_tile == "o":
            if (self._plot):
                print("'O' wins!")
            return 1

    # Check if there is a winner
    def check_win(self):
        # Check diagonals
        if ((self._game[0][0] == self._game[1][1]) and (self._game[1][1] == self._game[2][2]) and (self._game[0][0] != "")):
            return self.check_winner(self._game[0][0])
        if ((self._game[0][2] == self._game[1][1]) and (self._game[1][1] == self._game[2][0]) and (self._game[0][2] != "")):
            return self.check_winner(self._game[0][2])
        # Check straight lines
        for i in range(3):
            if ((self._game[0][i] == self._game[1][i]) and (self._game[1][i] == self._game[2][i]) and (self._game[0][i] != "")):
                return self.check_winner(self._game[0][i])
            if ((self._game[i][0] == self._game[i][1]) and (self._game[i][1] == self._game[i][2]) and (self._game[i][0] != "")):
                return self.check_winner(self._game[i][0])
        # Check for draw
        for i in range(3):
            for j in range(3):
                if self._game[i][j] == "_":
                    return None
        if (self._game):
            print("Draw!")
        return 0

    def player1_input(self):
        pass

    def player2_input(self):
        pass

    def run_game(self):
        # Loops game until victory or draw
        while (self._has_finished == None):
            print("Turn: {}".format(self._turn))
            if self._seed == 0: # player 1 begins the game
                self.player1_input()
                self._has_finished = self.check_win()
                if self._has_finished == None:
                    self.player2_input()
                    self._has_finished = self.check_win()
                    self.print_game()
                else:
                    self.print_game()
            else: # player 2 begins the game
                self.player2_input()
                self.print_game()
                self._has_finished = self.check_win()
                if self._has_finished == None:
                    self.player1_input()
                    self._has_finished = self.check_win()
                    self.print_game()
                else:
                    self.print_game()
            self._turn += 1
    
    def clear_game(self):
        self._game = self._empty

class HumanVsRandom(TicTacToe):   
    def player1_input(self):
        while True:
            try:
                x = int(input("Input x coordinate: "))
                y = int(input("Input y coordinate: "))
                if ((x > 2) or (x < 0) or (y < 0) or (y > 2)):
                    print("Invalid coordinate! Please enter a value of x and y between 0 and 2.")
                elif (self._game[x][y] != "_"):
                    print("Tile already filled! Please enter another coordinate.")
                else:
                    self._game[x][y] = 'x'
                    break
            except ValueError:
                print("The coordinates you entered are not valid! Please enter valid coordinates.")

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = 'o'
                break

class ComputerVsComputer(TicTacToe):
    def player1_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = 'x'
                break

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = 'o'
                break
