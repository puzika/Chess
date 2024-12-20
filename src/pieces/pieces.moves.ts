import { Color, Piece, Coords, Move } from "../components/board/board.slice"
import { getIdxFromCoords, getCoordsFromIdx } from "../components/board/board.utils";

type Moves = Record<'K' | 'Q' | 'R' | 'B' | 'N' | 'P', (origin: Coords, board: string[][], player: Color) => Coords[]>;

const constructCoords = (row: number, col: number): Coords => {
   return {
      row,
      col,
   }
}

export const getPieceColor = (piece: Piece): Color => {
   return piece.toLowerCase() === piece ? 'b' : 'w';
}

const canTake = (piece1: string, piece2: string): boolean => {
   return getPieceColor(piece1 as Piece) !== getPieceColor(piece2 as Piece);
}

const isOnBoard = (target: Coords): boolean => {
   return (
      target.row < 8 &&
      target.row >= 0 &&
      target.col < 8 &&
      target.col >= 0
   );
}

const isValidMove = (move: Move, board: string[][]): boolean => {
   const { origin, target } = move;

   return (
      isOnBoard(target) &&
      (board[target.row][target.col] === '' || canTake(board[origin.row][origin.col], board[target.row][target.col]))
   )
}

const getMovesPawn = (origin: Coords, board: string[][], player: Color): Coords[] => {
   const pawnMoves: Coords[] = [];
   const { row, col }: Coords = origin;
   const pawnColor: Color = getPieceColor(board[row][col] as Piece);

   if (pawnColor === player) {
      if (board[row - 1][col] === '') pawnMoves.push(constructCoords(row - 1, col));
      if (row === 6 && board[row - 2][col] === '') pawnMoves.push(constructCoords(row - 2, col));
      if (board[row - 1][col - 1] && canTake(board[row - 1][col - 1], board[row][col])) pawnMoves.push(constructCoords(row - 1, col - 1));
      if (board[row - 1][col + 1] && canTake(board[row - 1][col + 1], board[row][col])) pawnMoves.push(constructCoords(row - 1, col + 1));
   }

   if (pawnColor !== player) {
      if (board[row + 1][col] === '') pawnMoves.push(constructCoords(row + 1, col));
      if (row === 1 && board[row + 2][col] === '') pawnMoves.push(constructCoords(row + 2, col));
      if (board[row + 1][col - 1] && canTake(board[row + 1][col - 1], board[row][col])) pawnMoves.push(constructCoords(row + 1, col - 1));
      if (board[row + 1][col + 1] && canTake(board[row + 1][col + 1], board[row][col])) pawnMoves.push(constructCoords(row + 1, col + 1));
   }

   return pawnMoves;
}

const getMovesRook = (origin: Coords, board: string[][]): Coords[] => {
   const rookMoves: Coords[] = [];
   const { row, col } = origin;
   let canMoveHorLeft: boolean = true;
   let canMoveHorRight: boolean = true;
   let canMoveVertUp: boolean = true;
   let canMoveVertDown: boolean = true;
   let idx: number = 1;

   while (canMoveHorLeft || canMoveHorRight || canMoveVertUp || canMoveVertDown) {
      if (canMoveHorLeft && isValidMove({ origin, target: {row, col: col - idx} }, board)) {
         rookMoves.push(constructCoords(row, col - idx));
         canMoveHorLeft = board[row][col - idx] === '';
      } else canMoveHorLeft = false;

      if (canMoveHorRight && isValidMove({ origin, target: {row, col: col + idx} }, board)) {
         rookMoves.push(constructCoords(row, col + idx));
         canMoveHorRight = board[row][col + idx] === '';
      } else canMoveHorRight = false;

      if (canMoveVertUp && isValidMove({ origin, target: {row: row - idx, col} }, board)) {
         rookMoves.push(constructCoords(row - idx, col));
         canMoveVertUp = board[row - idx][col] === '';
      } else canMoveVertUp = false;

      if (canMoveVertDown && isValidMove({ origin, target: {row: row + idx, col} }, board)) {
         rookMoves.push(constructCoords(row + idx, col));
         canMoveVertDown = board[row + idx][col] === '';
      } else canMoveVertDown = false;

      idx++;
   }

   return rookMoves;
}

const getMovesBishop = (origin: Coords, board: string[][]): Coords[] => {
   const bishopMoves: Coords[] = [];
   const { row, col } = origin;
   let canMoveLeftUp: boolean = true;
   let canMoveLeftDown: boolean = true;
   let canMoveRightUp: boolean = true;
   let canMoveRightDown: boolean = true;
   let idx: number = 1;

   while (canMoveLeftUp || canMoveLeftDown || canMoveRightUp || canMoveRightDown) {
      if (canMoveLeftUp && isValidMove({ origin, target: { row: row - idx, col: col - idx}}, board)) {
         bishopMoves.push(constructCoords(row - idx, col - idx));
         canMoveLeftUp = board[row - idx][col - idx] === '';
      } else canMoveLeftUp = false;

      if (canMoveLeftDown && isValidMove({ origin, target: { row: row + idx, col: col - idx}}, board)) {
         bishopMoves.push(constructCoords(row + idx, col - idx));
         canMoveLeftDown = board[row + idx][col - idx] === '';
      } else canMoveLeftDown = false;

      if (canMoveRightUp && isValidMove({ origin, target: { row: row - idx, col: col + idx}}, board)) {
         bishopMoves.push(constructCoords(row - idx, col + idx));
         canMoveRightUp = board[row - idx][col + idx] === '';
      } else canMoveRightUp = false;

      if (canMoveRightDown && isValidMove({ origin, target: { row: row + idx, col: col + idx}}, board)) {
         bishopMoves.push(constructCoords(row + idx, col + idx));
         canMoveRightDown = board[row + idx][col + idx] === '';
      } else canMoveRightDown = false;

      idx++;
   }

   return bishopMoves;
}

const getMovesKnight = (origin: Coords, board: string[][]): Coords[] => {
   const knightMoves: Coords[] = [];
   const { row, col } = origin;
   const dirs: [number, number][] = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, 2], [1, -2]];

   for (const [drow, dcol] of dirs) {
      if (isValidMove({ origin, target: { row: row + drow, col: col + dcol }}, board)) {
         knightMoves.push(constructCoords(row + drow, col + dcol));
      }
   }

   return knightMoves;
}

const getMovesQueen = (origin: Coords, board: string[][]): Coords[] => {
   const queenMoves: Coords[] = [];

   const diagonalMoves: Coords[] = getMovesBishop(origin, board);
   const horVertMoves: Coords[] = getMovesRook(origin, board);

   return queenMoves.concat(diagonalMoves).concat(horVertMoves);
}

const getMovesKing = (origin: Coords, board: string[][]): Coords[] => {
   const kingMoves: Coords[] = [];
   const { row, col } = origin;
   const dirs: [number, number][] = [[-1, 0], [-1, -1], [-1, 1], [0, -1], [0, 1], [1, 0], [1, -1], [1, 1]];

   for (const [drow, dcol] of dirs) {
      if (isValidMove({ origin, target: { row: row + drow, col: col + dcol }}, board)) {
         kingMoves.push(constructCoords(row + drow, col + dcol));
      }
   }

   return kingMoves;
}

const moves: Moves = {
   P: getMovesPawn,
   R: getMovesRook,
   B: getMovesBishop,
   N: getMovesKnight,
   Q: getMovesQueen,
   K: getMovesKing,
}

const getPseudoLegalMoves = (board: string[][], turn: Color, player: Color): Map<number, Coords[]> => {
   const [rows, cols]: [number, number] = [board.length, board[0].length];
   const pseudoLegalMoves: Map<number, Coords[]> = new Map();

   for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < cols; j++) {
         if (board[i][j] === '' || turn !== getPieceColor(board[i][j] as Piece)) continue;

         const origin: Coords = constructCoords(i, j);
         const pieceMoves: Coords[] = moves[board[i][j].toUpperCase() as keyof Moves](origin, board, player);

         pseudoLegalMoves.set(getIdxFromCoords(origin), pieceMoves);
      }
   }

   return pseudoLegalMoves;
}

const willBeChecked = (move: Move, board: string[][], player: Color): boolean => {
   const [rows, cols] = [board.length, board[0].length];
   const { origin, target } = move;
   const turn: Color = getPieceColor(board[origin.row][origin.col] as Piece);
   const opponent: Color = turn === 'w' ? 'b' : 'w';
   const kingCoords: Coords = { row: -1, col: -1 };

   const targetPiece: string = board[target.row][target.col];
   board[target.row][target.col] = board[origin.row][origin.col];
   board[origin.row][origin.col] = '';

   for (let i: number = 0; i < rows; i++) {
      for (let j: number = 0; j < cols; j++) {
         if (
            board[i][j].toLowerCase() === 'k' &&
            getPieceColor(board[i][j] as Piece) === turn
         ) {
            kingCoords.row = i;
            kingCoords.col = j;
            break;
         }
      }
   }

   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves(board, opponent, player);

   for (const [_, piecePseudoLegalMoves] of pseudoLegalMoves) {
      if (piecePseudoLegalMoves.some(m => m.row === kingCoords.row && m.col === kingCoords.col)) {
         board[origin.row][origin.col] = board[target.row][target.col];
         board[target.row][target.col] = targetPiece;
         
         return true;
      }
   }

   board[origin.row][origin.col] = board[target.row][target.col];
   board[target.row][target.col] = targetPiece;

   return false;
}

export const isChecked = (board: string[][], turn: Color, player: Color): boolean => {
   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves(board, turn, player);

   for (const [_, piecePseudoLegalMoves] of pseudoLegalMoves) {
      if (piecePseudoLegalMoves.some(m => board[m.row][m.col].toLowerCase() === 'k')) return true;
   }

   return false;
}

export function getLegalMoves(board: string[][], turn: Color, player: Color): Map<number, Coords[]> {
   const legalMoves: Map<number, Coords[]> = new Map();
   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves(board, turn, player);

   for (const [pieceIdx, piecePseudoLegalMoves] of pseudoLegalMoves) {
      const origin: Coords = getCoordsFromIdx(pieceIdx);
      const pieceLegalMoves: Coords[] = piecePseudoLegalMoves.filter(m => !willBeChecked({ origin, target: m }, board, player));

      legalMoves.set(pieceIdx, pieceLegalMoves);
   }

   return legalMoves;
}