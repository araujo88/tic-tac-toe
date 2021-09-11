# A simple tic-tac-toe terminal-based game. Computer input is generated through minimax algorithm.
import TicTacToe

if __name__ == "__main__":
    tictactoe = TicTacToe.HumanVsRandom(plotGame=True)
    tictactoe.run_game()
