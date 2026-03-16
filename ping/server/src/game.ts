// --- Types ---

export type SetScore = [number, number];

export interface PlayerState {
  name: string;
  points: number; // points in the current set
  sets: number;   // sets won
}

export interface State {
  players: [PlayerState, PlayerState];
  totalSets: number;
  currentSet: number;
  setHistory: SetScore[];
  winner: 0 | 1 | null;
}

// --- Factory ---

export function makeState(
  player1Name: string,
  player2Name: string,
  totalSets: number
): State {
  return {
    players: [
      { name: player1Name, points: 0, sets: 0 },
      { name: player2Name, points: 0, sets: 0 },
    ],
    totalSets,
    currentSet: 1,
    setHistory: [],
    winner: null,
  };
}

// --- Game logic ---

export function checkSetWinner(state: State): 0 | 1 | null {
  const [p0, p1] = state.players;
  for (const i of [0, 1] as const) {
    const mine   = i === 0 ? p0.points : p1.points;
    const theirs = i === 0 ? p1.points : p0.points;
    if (mine >= 11 && mine - theirs >= 2) return i;
  }
  return null;
}

export function updateState(state: State, playerIndex: 0 | 1): State {
  if (state.winner !== null) return state;

  const next: State = {
    ...state,
    players: [
      { ...state.players[0] },
      { ...state.players[1] },
    ],
    setHistory: [...state.setHistory],
  };

  next.players[playerIndex].points++;

  const setsToWin = Math.ceil(next.totalSets / 2);
  const setWinner = checkSetWinner(next);

  if (setWinner !== null) {
    next.setHistory.push([next.players[0].points, next.players[1].points]);
    next.players[setWinner].sets++;

    if (next.players[setWinner].sets === setsToWin) {
      next.winner = setWinner;
    } else {
      next.players[0].points = 0;
      next.players[1].points = 0;
      next.currentSet++;
    }
  }

  return next;
}
