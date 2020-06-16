import React from 'react'
import './App.scss'
import {GameState, GameScreen, Choice, MatchResult, Action, ActionType} from '../model'
import {defaultState, ContextValue, AppContext} from '../context'
import {ChoiceScreen} from '../Screens/ChoiceScreen/ChoiceScreen'

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
            if (state.screen !== GameScreen.RESULT) {
                return state
            }

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
    }

    return state
}

function App() {
    const [state, dispatch] = React.useReducer(gameLogicReducer, defaultState)

    const context: ContextValue = {
        state,
        dispatch,
    }

    const clothes = (
        <img className="clothes" alt="clothes" src="https://img.icons8.com/emoji/96/000000/womans-clothes.png" />
    )
    const clothesArray: JSX.Element[] = new Array(state.clothes)
    clothesArray.fill(clothes)

    const heart = <img alt="heart" className="heart" src="https://img.icons8.com/plasticine/100/000000/like--v1.png" />
    const emptyHeart = (
        <img alt="empty-heart" className="heart" src="https://img.icons8.com/plasticine/100/000000/like--v2.png" />
    )
    const heartArray: JSX.Element[] = new Array(defaultState.heart)
    heartArray.fill(heart, 0, state.heart)
    heartArray.fill(emptyHeart, state.heart)

    return (
        <AppContext.Provider value={context}>
            <div className="container">
                <div className="clothes-section">{clothesArray}</div>
                <div className="heart-section">{heartArray}</div>

                <code>{JSON.stringify(state, null, 2)}</code>

                {state.screen === GameScreen.CHOICE && <ChoiceScreen />}
            </div>
        </AppContext.Provider>
    )
}

export default App
