export enum GameScreen {
    CHOICE,
    RESULT,
    STRIP_VIDEO,
    GAME_OVER_LOSE,
    GAME_OVER_WIN,
}

export enum Choice {
    ROCK = 0,
    PAPER = 1,
    SCISSOR = 2,
}

export enum MatchResult {
    WIN,
    LOSE,
    DRAW,
}

export interface GameState {
    heart: number
    clothes: number

    screen: GameScreen
    videoUrl: string

    playerChoice?: Choice
    botChoice?: Choice
    matchResult?: MatchResult
}

export enum ActionType {
    CHOICE,
    CALCULATE,

    NEXT_ROUND,
    RESTART,
}

export type Action =
    | {
          type: ActionType.CHOICE
          choice: Choice
      }
    | {type: ActionType.NEXT_ROUND}
    | {type: ActionType.RESTART}
    | {type: ActionType.CALCULATE}
