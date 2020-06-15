import React from 'react'
import './App.css'

enum GameScreen {
    CHOICE,
    RESULT,
    STRIP_VIDEO,
    GAME_OVER,
}

enum Choice {
    ROCK = 0,
    PAPER = 1,
    SCISSOR = 2,
}

enum MatchResult {
    WIN,
    LOSE,
    DRAW,
}

interface GameState {
    heart: number
    clothes: number

    screen: GameScreen
    videoUrl: string

    playerChoice?: Choice
    botChoice?: Choice
    matchResult?: MatchResult
}

enum ActionType {
    CHOICE,
    CALCULATE,

    SKIP,
    RESTART,
}
type Action =
    | {
          type: ActionType.CHOICE
          choice: Choice
      }
    | {type: ActionType.SKIP}
    | {type: ActionType.RESTART}
    | {type: ActionType.CALCULATE}

const defaultState: GameState = {
    heart: 5,
    clothes: 3,
    screen: GameScreen.CHOICE,
    videoUrl: '',
}

function getBotChoice() {
    const choices = [Choice.PAPER, Choice.ROCK, Choice.SCISSOR]
    return choices[Math.floor(Math.random() * choices.length)]
}

function getMatchResult(playerChoice: Choice, botChoice: Choice) {
    if (playerChoice === botChoice) {
        return MatchResult.DRAW
    }

    if (playerChoice - botChoice === 1 || playerChoice - botChoice === -2) {
        return MatchResult.WIN
    }

    return MatchResult.LOSE
}

function gameLogicReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case ActionType.RESTART:
            return defaultState
        case ActionType.SKIP:
            return {...state, screen: GameScreen.CHOICE}
        case ActionType.CHOICE: {
            const playerChoice = action.choice
            const botChoice = getBotChoice()
            const matchResult = getMatchResult(playerChoice, botChoice)

            return {...state, playerChoice, botChoice, matchResult, screen: GameScreen.RESULT}
        }
        case ActionType.CALCULATE:
            const matchResult = state.matchResult
            switch (matchResult) {
                case MatchResult.WIN:
                    const clothes = state.clothes - 1
                    const videoUrl = `/strip_video/${clothes}`
                    return {...state, clothes, videoUrl, screen: GameScreen.STRIP_VIDEO}
                case MatchResult.LOSE:
                    const heart = state.heart - 1
                    if (heart === 0) {
                        return {...state, heart, screen: GameScreen.GAME_OVER}
                    }
                    return {...state, heart, screen: GameScreen.CHOICE}
                case MatchResult.DRAW:
                    return {...state, screen: GameScreen.CHOICE}
            }
        default:
            return state
    }
}

function App() {
    const [state, dispatch] = React.useReducer(gameLogicReducer, defaultState)

    const select = (choice: Choice) => {
        dispatch({type: ActionType.CHOICE, choice})

        setTimeout(() => {
            dispatch({type: ActionType.CALCULATE})
        }, 5000)
    }

    return (
        <div>
            <code>{JSON.stringify(state, null, 2)}</code>

            <div>
                <button onClick={() => select(Choice.ROCK)}>ROCK</button>
                <button onClick={() => select(Choice.PAPER)}>PAPER</button>
                <button onClick={() => select(Choice.SCISSOR)}>SCISSOR</button>
            </div>
        </div>
    )
}

export default App
