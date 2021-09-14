
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
            return -1
        if game_tile == "o":
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
        if (self._plot):
            if self._has_finished == -1:
                print("'X' wins!")
            if self._has_finished == 1:
                print("'O' wins!")
            if self._has_finished == 0:
                print("Draw!")
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
                    self._game[x][y] = "x"
                    break
            except ValueError:
                print("The coordinates you entered are not valid! Please enter valid coordinates.")

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = "o"
                break

class ComputerVsComputer(TicTacToe):
    def player1_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = "x"
                break

    def player2_input(self):
        while True:
            x = random.randint(0, 2)
            y = random.randint(0, 2)
            if self._game[x][y] == "_": # Check if tile is empty
                self._game[x][y] = "o"
                break

class HumanVsAI(TicTacToe):   
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

    def isMovesLeft(self):
        for i in range(3) :
            for j in range(3) :
                if (self._game[i][j] == '_') :
                    return True
        return False

    def minimax(self, depth, isMax):
        score = self.check_win()
    
        # If Maximizer has won the game return his/her
        # evaluated score
        if (score == 1):
            return score
    
        # If Minimizer has won the game return his/her
        # evaluated score
        if (score == -1):
            return score
    
        # If there are no more moves and no winner then
        # it is a tie
        if (self.isMovesLeft() == False):
            return 0
    
        # If this maximizer's move
        if isMax:    
            best = -1000
    
            # Traverse all cells
            for i in range(3):        
                for j in range(3):
                
                    # Check if cell is empty
                    if (self._game[i][j] == "_"):
                    
                        # Make the move
                        self._game[i][j] = "o"
    
                        # Call minimax recursively and choose
                        # the maximum value
                        best = max(best, self.minimax(depth + 1, not isMax))
    
                        # Undo the move
                        self._game[i][j] = "_"
            return best

        # If this minimizer's move
        else:
            best = 1000
    
            # Traverse all cells
            for i in range(3) :        
                for j in range(3) :
                
                    # Check if cell is empty
                    if (self._game[i][j] == '_') :
                    
                        # Make the move
                        self._game[i][j] = "x"
    
                        # Call minimax recursively and choose
                        # the minimum value
                        best = min(best, self.minimax(depth + 1, not isMax))
    
                        # Undo the move
                        self._game[i][j] = "_"
            return best

        # This will return the best possible move for the player
    def player2_input(self):
        bestVal = -10
        bestMove = (-1, -1)
    
        # Traverse all cells, evaluate minimax function for
        # all empty cells. And return the cell with optimal
        # value.
        for i in range(3):    
            for j in range(3):
            
                # Check if cell is empty
                if (self._game[i][j] == "_") :
                
                    # Make the move
                    self._game[i][j] = "o"
    
                    # compute evaluation function for this
                    # move.
                    moveVal = self.minimax(0, False)
    
                    # Undo the move
                    self._game[i][j] = "_"
    
                    # If the value of the current move is
                    # more than the best value, then update
                    # best/
                    if (moveVal > bestVal) :               
                        bestMove = (i, j)
                        bestVal = moveVal

        self._game[bestMove[0]][bestMove[1]] = "o"
