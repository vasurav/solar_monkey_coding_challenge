# //  =============================================================================
# //  PUZZLE 1
# //  Write the implementation of the diamond function. The single parameter passed
# //  in is the width of the diamond. Even numbers don't generate beautiful
# //  diamonds, nor do negative ones, so return an empty string in those cases. See
# //  the tests for the expected output. Mind the (trailing) spaces!
# //  Feel free to add more tests, or clean up your solution afterwards.


def diamond(n):
    # return empty string for invalid diamond sizes
    if n <= 0 or n % 2 == 0:
        return ''

    # start with base line
    diamond_string = char_string(n, '*')

    # add smaller lines of stars to the diamond
    for i in range(n - 2, 0, -2):
        new_line = diamond_line(n, i)
        diamond_string = add_line_around_string(diamond_string, new_line)

    # add leading and trailing line breaks
    return '\n' + diamond_string + '\n'


def add_line_around_string(original_string, new_line):
    return new_line + '\n' + original_string + '\n' + new_line


def diamond_line(diamond_width, current_line):
    spaces = calc_spaces(diamond_width, current_line)

    space_line = char_string(spaces, ' ')
    star_line = char_string(current_line, '*')

    return space_line + star_line + space_line


def calc_spaces(diamond_width, current_line):
    """calculates the number of leading and trailing spaces needed for a given line in a diamond"""
    return int((diamond_width - current_line)/2)


def char_string(num_chars, char):
    """returns a number (num_chars) of character (char) as a string"""
    return_string = ''

    for i in range(num_chars):
        return_string += char

    return return_string


print('Puzzle 1 Checks: ')
print(f'diamond(0): {diamond(0)}')
print(f'diamond(2): {diamond(2)}')
print(f'diamond(-3): {diamond(-3)}')
print(f'diamond(3): {diamond(3)}')
print(f'diamond(5): {diamond(5)}')


# // //  ===========================================================================
# // // PUZZLE 2
# // // Write a sudoku validator:
# // // 1. The `solution_valid(board)` function should return True when the
# // //    solution is True, False otherwise. The cells of the sudoku board may
# // //    also contain 0's, which represent empty cells. Boards with empty cells
# // //    are invalid of course. For the standard rules see
# // //    https://en.wikipedia.org/wiki/Sudoku
# // // 2. Divide the problem into subproblems, write separate functions for
# // //    these.
# // // 3. Make sure to write some tests for these functions.

def validate_sudoku(board):
    return check_zeros(board) and \
           check_rows(board) and \
           check_columns(board) and \
           check_blocks(board)


def check_zeros(board):
    """checks if the board has any zeros in it"""
    for row in board:
        if 0 in row:
            return False

    return True


def check_rows(board):
    """checks each row of the board for duplicates"""
    for row in board:
        if check_for_duplicates(row):
            return False

    return True


def check_columns(board):
    """checks each column of the board for duplicates"""
    for col_index in range(len(board)):
        col_array = []
        for row in board:
            col_array.append(row[col_index])

        if check_for_duplicates(col_array):
            return False

    return True


def check_blocks(board, square_dim=3):
    """checks each block of the board for duplicates"""
    blocks_horizontal = square_dim
    blocks_vertical = square_dim
    block_width = square_dim
    block_height = square_dim

    for i in range(blocks_horizontal):
        for j in range(blocks_vertical):
            start_coordinate = [i * block_width, j * block_height]
            block = get_block(board, start_coordinate, block_width, block_height)
            if check_for_duplicates(block):
                return False

    return True


def get_block(board, start_coordinate, block_width, block_height):
    """returns a block based on the starting coordinate of that block in the board"""
    block = []
    for i in range(start_coordinate[0], start_coordinate[0] + block_width):
        for j in range(start_coordinate[1], start_coordinate[1] + block_height):
            block.append(board[i][j])

    return block


def check_for_duplicates(list_check):
    return len(list_check) != len(set(list_check))


board_correct = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]

board_zeros = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 0, 3, 4, 9],
            [1, 0, 0, 3, 4, 2, 5, 6, 0],
            [8, 5, 9, 7, 6, 1, 0, 2, 0],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 0, 1, 5, 3, 7, 2, 1, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 0, 0, 4, 8, 1, 1, 7, 9],
        ]

board_bad_columns = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 5, 8, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ]

board_bad_rows = [
            [5, 3, 4, 8, 7, 6, 9, 2, 2],
            [8, 7, 2, 1, 9, 5, 3, 4, 6],
            [1, 9, 6, 3, 4, 2, 5, 8, 7],
            [6, 4, 9, 7, 8, 1, 5, 1, 3],
            [4, 2, 8, 6, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 6, 5, 8],
            [9, 8, 1, 5, 3, 7, 2, 6, 4],
            [2, 6, 7, 4, 1, 9, 8, 3, 5],
            [3, 4, 5, 2, 6, 8, 1, 7, 9],
        ]

board_bad_blocks = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
        ]

print('Puzzle 2 Checks:')

print(f'Zero check Good Board: {check_zeros(board_correct)}')
print(f'Zero check Zeros: {check_zeros(board_zeros)}')

print(f'Row check Good Board: {check_rows(board_correct)}')
print(f'Row check Bad Row: {check_rows(board_bad_rows)}')

print(f'Column check Good Board: {check_columns(board_correct)}')
print(f'Column check Bad Column: {check_columns(board_bad_columns)}')

print(f'Block check Good Board: {check_blocks(board_correct)}')
print(f'Block check Bad Block: {check_blocks(board_bad_blocks)}')

print('\n')

print(f'Validate Sudoku: Correct: {validate_sudoku(board_correct)}')
print(f'Validate Sudoku: Zeros: {validate_sudoku(board_zeros)}')
print(f'Validate Sudoku: Bad Row: {validate_sudoku(board_bad_rows)}')
print(f'Validate Sudoku: Bad Column: {validate_sudoku(board_bad_columns)}')
print(f'Validate Sudoku: Bad Block: {validate_sudoku(board_bad_blocks)}')



