export function isValidMove(
    board: number[][],
    row: number,
    col: number,
    value: number
): boolean {
    //row check
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === value && c !== col) 
            return false;
    }

    //column check
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === value && r !== row) 
            return false;
    }

    //3x3 subgrid check
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r <3; r++) {
        for (let c = 0; c < 3; c++) {
            const current = board[startRow + r][startCol + c];
            if (current === value && (startRow + r !== row || startCol + c !== col)) 
                return false;
        }
    }

    return true;

}