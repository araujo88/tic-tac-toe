import TicTacToe

if __name__ == "__main__":
    tictactoe1 = TicTacToe.HumanVsRandom(plotGame=True) # Player vs Computer (random)
    tictactoe1.run_game()
    tictactoe2 = TicTacToe.ComputerVsComputer(plotGame=True) # Computer vs Computer (random)
    tictactoe2.run_game()
    tictactoe3 = TicTacToe.HumanVsAI(plotGame=True) # Player vs AI (minimax algorithm)
    tictactoe3.run_game()
