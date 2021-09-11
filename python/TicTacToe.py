
import numpy as np
import random

empty = [["" for i in range(3)] for j in range(3)]

class TicTacToe:
    def __init__(self, initialGame=None, initialTurn=None, plotGame=None):
        if initialGame is None:
            initialGame = empty
        if initialTurn is None:
            initialTurn = 0
        if plotGame is None:
            plotGame = False
        self.game = initialGame
        self.turn = initialTurn
        self.plot = plotGame
        self.has_finished = self.check_win()
        self.seed = random.randint(0, 1) # random seed to check who begins
        if (self.plot):
            if self.seed == 0:
                print("'X' begins the game!")
            else:
                print("'O' begins the game!")

    # Print game
    def print_game(self):
        print(np.matrix(self.game))

    # Check who is winner
    def check_winner(self, game_tile):
        if game_tile == "x":
            if (self.plot):
                print("'X' wins!")
            return -1
        if game_tile == "o":
            if (self.plot):
                print("'O' wins!")
            return 1

    # Check if there is a winner
    def check_win(self):
        # Check diagonals
        if ((self.game[0][0] == self.game[1][1]) and (self.game[1][1] == self.game[2][2]) and (self.game[0][0] != "")):
            return self.check_winner(self.game[0][0])
        if ((self.game[0][2] == self.game[1][1]) and (self.game[1][1] == self.game[2][0]) and (self.game[0][2] != "")):
            return self.check_winner(self.game[0][2])
        # Check straight lines
        for i in range(3):
            if ((self.game[0][i] == self.game[1][i]) and (self.game[1][i] == self.game[2][i]) and (self.game[0][i] != "")):
                return self.check_winner(self.game[0][i])
            if ((self.game[i][0] == self.game[i][1]) and (self.game[i][1] == self.game[i][2]) and (self.game[i][0] != "")):
                return self.check_winner(self.game[i][0])
        # Check for draw
        for i in range(3):
            for j in range(3):
                if self.game[i][j] == "":
                    return None
        if (self.plot):
            print("Draw!")
        return 0

    def player1_input(self):
        pass

    def player2_input(self):
        pass

    def run_game(self):
        # Loops game until victory or draw
        while (self.has_finished == None):
            print("Turn: {}".format(self.turn))
            if self.seed == 0: # player 1 begins the game
                self.player1_input()
                self.has_finished = self.check_win()
                if self.has_finished == None:
                    self.player2_input()
                    self.has_finished = self.check_win()
                    self.print_game()
                else:
                    self.print_game()
            else: # player 2 begins the game
                self.player2_input()
                self.print_game()
                self.has_finished = self.check_win()
                if self.has_finished == None:
                    self.player1_input()
                    self.has_finished = self.check_win()
                    self.print_game()
                else:
                    self.print_game()
            self.turn += 1

class HumanVsRandom(TicTacToe):

    def player1_input(self):
        while True:
            try:
                x = int(input("Input x coordinate: "))
                y = int(input("Input y coordinate: "))
                if ((x > 2) or (x < 0) or (y < 0) or (y > 2)):
                    print("Invalid coordinate! Please enter a value of x and y between 0 and 2.")
                elif (self.game[x][y] != ""):
                    print("Tile already filled! Please enter another coordinate.")
                else:
                    self.game[x][y] = 'x'
                    break
            except ValueError:
                print("The coordinates you entered are not valid! Please enter valid coordinates.")

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self.game[x][y] == "": # Check if tile is empty
                self.game[x][y] = 'o'
                break

class ComputerVsComputer(TicTacToe):

    def player1_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self.game[x][y] == "": # Check if tile is empty
                self.game[x][y] = 'x'
                break

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self.game[x][y] == "": # Check if tile is empty
                self.game[x][y] = 'o'
                break