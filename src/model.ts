export enum GameScreen {
    CHOICE,
    RESULT,
    STRIP_VIDEO,
    GAME_OVER,
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

    SKIP,
    RESTART,
}

export type Action =
    | {
          type: ActionType.CHOICE
          choice: Choice
      }
    | {type: ActionType.SKIP}
    | {type: ActionType.RESTART}
    | {type: ActionType.CALCULATE}
