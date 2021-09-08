# A simple tic-tac-toe terminal-based game. Computer input is generated randomly.

import numpy as np
import random

# Initialize game with matrix filled with empty strings
def initialize_game():
    game = [["" for i in range(3)] for j in range(3)]
    print("Welcome to Tic-tac-toe! Can you beat the computer?")
    return game

# Print game
def print_game(game):
    print(np.matrix(game))

# Check who is winner
def check_winner(game_tile):
    if game_tile == "x":
        print("Human wins!")
        return True
    if game_tile == "o":
        print("Computer wins!")
        return True

# Check if there is a winner
def check_win(game):
    # Check diagonals
    if ((game[0][0] == game[1][1]) and (game[1][1] == game[2][2]) and (game[0][0] != "")):
        return check_winner(game[0][0])
    if ((game[0][2] == game[1][1]) and (game[1][1] == game[2][0]) and (game[0][2] != "")):
        return check_winner(game[0][2])
    # Check straight lines
    for i in range(3):
        if ((game[0][i] == game[1][i]) and (game[1][i] == game[2][i]) and (game[0][i] != "")):
            return check_winner(game[0][i])
        if ((game[i][0] == game[i][1]) and (game[i][1] == game[i][2]) and (game[i][0] != "")):
            return check_winner(game[i][0])
    # Check for draw
    for i in range(3):
        for j in range(3):
            if game[i][j] == "":
                return False
    print("Draw!")
    return True

# Human input
def human_input(game):
    while True:
        try:
            x = int(input("Input x coordinate: "))
            y = int(input("Input y coordinate: "))
            if ((x > 2) or (x < 0) or (y < 0) or (y > 2)):
                print("Invalid coordinate! Please enter a value of x and y between 0 and 2.")
            elif (game[x][y] != ""):
                print("Tile already filled! Please enter another coordinate.")
            else:
                game[x][y] = 'x'
                break
        except ValueError:
            print("The coordinates you entered are not integers! Please enter a valid coordinate.")

    return game

# Computer input - random
def computer_input(game):
    while True:
        x = random.randint(0, 2)
        y = random.randint(0, 2)
        if game[x][y] == "": # Check if tile is empty
            game[x][y] = 'o'
            break
    return game

# Initializes game and variables
game = initialize_game()
print(np.matrix(game))
turn = 0
has_finished = check_win(game)
seed = random.randint(0, 1) # random seed to check who begins
if seed == 0:
    print("Human begins the game!")
else:
    print("Computer begins the game!")

# Loops game until victory or draw
while (has_finished == False):
    print("Turn: {}".format(turn))
    if seed == 0: # human begins the game
        game = human_input(game)
        has_finished = check_win(game)
        if has_finished == False:
            game = computer_input(game)
            has_finished = check_win(game)
            print_game(game)
        else:
            print_game(game)
    else: # computer begins the game
        game = computer_input(game)
        print_game(game)
        has_finished = check_win(game)
        if has_finished == False:
            game = human_input(game)
            has_finished = check_win(game)
            print_game(game)
        else:
            print_game(game)
    turn += 1
