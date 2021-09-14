# A simple tic-tac-toe terminal-based game. Computer input is generated through minimax algorithm.
import TicTacToe

if __name__ == "__main__":
    tictactoe1 = TicTacToe.HumanVsRandom(plotGame=True)
    tictactoe2 = TicTacToe.ComputerVsComputer(plotGame=True)
    tictactoe1.run_game()
    tictactoe2.run_game()
