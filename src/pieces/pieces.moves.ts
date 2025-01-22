import { Color, Piece, Coords, Move, FILES, RANKS } from "../components/board/board.slice"
import { getIdxFromCoords, getCoordsFromIdx } from "../components/board/board.utils";

type Moves = Record<'K' | 'Q' | 'R' | 'B' | 'N' | 'P', (origin: Coords, board: string[][], player: Color) => Coords[]>;

export type MoveData = {
   board: string[][],
   turn: Color,
   player: Color,
   castling: string,
   enpassant: string,
}

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
   const direction: number = (player === 'w' && pawnColor === 'w') || (player === 'b' && pawnColor === 'b') ? -1 : 1;
   const possiblePawnMoves: Coords[] = [
      { row: row + direction, col },
      { row: row + direction * 2, col },
      { row: row + direction, col: col - 1 },
      { row: row + direction, col: col + 1 },
   ];

   for (const { row: moveRow, col: moveCol } of possiblePawnMoves) {
      const verticalMoveDist: number = Math.abs(moveRow - row);
      const doubleMoveMidRow: number = (moveRow + row) / 2;

      if (!isOnBoard({ row: moveRow, col: moveCol })) continue;

      if (
         (moveCol === col && verticalMoveDist === 1 && board[moveRow][moveCol] === '') ||
         ((row === 1 || row === 6) && moveCol === col && verticalMoveDist === 2 && board[moveRow][moveCol] === '' && board[doubleMoveMidRow][moveCol] === '') ||
         (moveCol !== col && board[moveRow][moveCol] !== '' && canTake(board[row][col], board[moveRow][moveCol])) 
      ) pawnMoves.push({ row: moveRow, col: moveCol });
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

const getPseudoLegalMoves = (moveData: MoveData): Map<number, Coords[]> => {
   const { board, turn, player} = moveData;

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

const willBeChecked = (move: Move, moveData: MoveData): boolean => {
   const { board } = moveData;
   const [rows, cols] = [board.length, board[0].length];
   const { origin, target } = move;
   const turn: Color = getPieceColor(board[origin.row][origin.col] as Piece);
   const opponent: Color = turn === 'w' ? 'b' : 'w';
   const moveDataTurnOpponent: MoveData = { ...moveData, turn: opponent };
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

   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves(moveDataTurnOpponent);

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

export const isChecked = (moveData: MoveData): boolean => {
   const { board, turn } = moveData;
   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves({ ...moveData, turn: turn === 'w' ? 'b' : 'w'});

   for (const [_, piecePseudoLegalMoves] of pseudoLegalMoves) {
      if (piecePseudoLegalMoves.some(m => board[m.row][m.col].toLowerCase() === 'k')) return true;
   }

   return false;
}

const getCastlingMoves = (moveData: MoveData): Coords[] => {
   const { board, castling, turn, player } = moveData;
   const [rows, cols] = [board.length, board[0].length];
   const opponent: Color = turn === 'w' ? 'b' : 'w';
   const castlingMoves: Coords[] = [];

   if (castling === '-' || isChecked({ ...moveData, turn: opponent })) return castlingMoves;

   const castlingCombinations: [Coords, Coords, string][] = [
      [{ row: 0, col: 0 }, player === 'w' ? { row: 0, col: 4 } : { row: 0, col: 3 }, player === 'w' ? 'q' : 'K'],
      [{ row: 0, col: cols - 1}, player === 'w' ? { row: 0, col: 4 } : { row: 0, col: 3 }, player === 'w' ? 'k' : 'Q'],
      [{ row: rows - 1, col: 0 }, player === 'w' ? { row: rows - 1, col: 4 } : { row: rows - 1, col: 3 }, player === 'w' ? 'Q' : 'k'],
      [{ row: rows - 1, col: cols - 1 }, player === 'w' ? { row: rows - 1, col: 4 } : { row: rows - 1, col: 3 }, player === 'w' ? 'K' : 'q']
   ];

   const areEmpty = (cellOne: Coords, cellTwo: Coords): boolean => {
      let startCell: Coords;
      let endCell: Coords;

      [startCell, endCell] = (cellTwo.col - cellOne.col > 0) ? [cellOne, cellTwo] : [cellTwo, cellOne];

      const { row, col: startCol } = startCell;
      const { col: endCol } = endCell;

      for (let i: number = startCol + 1; i < endCol; i++) {
         if (board[row][i] !== '') return false;
      }

      return true;
   }

   for (const [rookCoords, kingCoords, castlingType] of castlingCombinations) {
      const castlingColor: Color = castlingType.toLowerCase() === castlingType ? 'b' : 'w';
      const direction: number = kingCoords.col - rookCoords.col > 0 ? -1 : 1;
      const regularMove: Coords = { row: kingCoords.row, col: kingCoords.col + direction };
      const castlingMove: Coords = { row: kingCoords.row, col: kingCoords.col + 2 * direction };

      if (
         castlingColor === turn &&
         castling.includes(castlingType) &&
         areEmpty(kingCoords, rookCoords) &&
         !willBeChecked({ origin: kingCoords, target: regularMove }, moveData) &&
         !willBeChecked({ origin: kingCoords, target: castlingMove }, moveData)
      ) castlingMoves.push(castlingMove);
   }

   return castlingMoves;
}

const getEnpassantCoords = (enpassant: string, player: Color): Coords => {
   const ranks: string[] = player === 'w' ? [...RANKS].reverse() : RANKS;
   const files: string[] = player === 'w' ? FILES : [...FILES].reverse();
   const [file, rank] = [...enpassant] as [string, string];

   const col: number = files.findIndex(currFile => currFile === file);
   const row: number = ranks.findIndex(currRank => currRank === rank);

   return {
      row,
      col
   };
}

const addEnpassant = (pseudoLegalMoves: Map<number, Coords[]>, moveData: MoveData): void => {
   const { enpassant, board, turn, player } = moveData;
   const enpassantCoords: Coords = getEnpassantCoords(enpassant, player);
   const { row, col } = enpassantCoords;
   const enpassantPawnRow: number = (player === 'w' && turn === 'w') || (player === 'b' && turn === 'b') ? row + 1 : row - 1;

   const leftPawn: Coords = { row: enpassantPawnRow, col: col - 1 };
   const rightPawn: Coords = { row: enpassantPawnRow, col: col + 1 };

   const leftPawnMoves: Coords[] | undefined = pseudoLegalMoves.get(getIdxFromCoords(leftPawn));
   const rightPawnMoves: Coords[] | undefined = pseudoLegalMoves.get(getIdxFromCoords(rightPawn));

   if (!!leftPawnMoves && board[leftPawn.row][leftPawn.col].toLowerCase() === 'p') leftPawnMoves.push(enpassantCoords);
   if (!!rightPawnMoves && board[rightPawn.row][rightPawn.col].toLowerCase() === 'p') rightPawnMoves.push(enpassantCoords);
}

export function getLegalMoves(moveData: MoveData): Map<number, Coords[]> {
   const { board, enpassant } = moveData;
   const legalMoves: Map<number, Coords[]> = new Map();
   const pseudoLegalMoves: Map<number, Coords[]> = getPseudoLegalMoves(moveData);
   
   if (enpassant !== '-') addEnpassant(pseudoLegalMoves, moveData);

   for (const [pieceIdx, piecePseudoLegalMoves] of pseudoLegalMoves) {
      const origin: Coords = getCoordsFromIdx(pieceIdx);
      const pieceLegalMoves: Coords[] = piecePseudoLegalMoves.filter(m => !willBeChecked({ origin, target: m }, moveData));

      if (board[origin.row][origin.col].toLowerCase() === 'k') {
         const castlingMoves: Coords[] = getCastlingMoves(moveData);
         castlingMoves.length > 0 && pieceLegalMoves.push(...castlingMoves);
      }

      legalMoves.set(pieceIdx, pieceLegalMoves);
   }

   return legalMoves;
}