import type { Color } from "../board/board.slice";

export type GameData = {
   isChecked: boolean,
   hasLegalMoves: boolean,
   turn: Color,
}

export type GameOutcome = 'checkmate' | 'stalemate' | 'inssuficient material' | 'time control' | '-';

export function isCheckmate(gameData: GameData): boolean {
   const { isChecked, hasLegalMoves } = gameData;

   return isChecked && !hasLegalMoves;
}

export function isStalemate(gameData: GameData): boolean {
   const { isChecked, hasLegalMoves } = gameData;

   return !isChecked && !hasLegalMoves;
}

export function getGameOutcome(gameDate: GameData): GameOutcome {
   if (isCheckmate(gameDate)) return 'checkmate';
   if (isStalemate(gameDate)) return 'stalemate';

   return '-';
}