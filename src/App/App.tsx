import React from 'react'
import {GameState, GameScreen, Choice, MatchResult, Action, ActionType} from '../model'
import {defaultState, ContextValue, AppContext} from '../context'
import {ChoiceScreen} from '../screens/ChoiceScreen/ChoiceScreen'
import {ResultScreen} from '../screens/ResultScreen/ResultScreen'
import {VideoScreen} from '../screens/VideoScreen/VideoScreen'
import {GameOverScreen} from '../screens/GameOverScreen/GameOverScreen'
import {Video} from '../components/Video/Video'
import {Container, ClothesSection, HeartSection} from './App.style'

const audios: Record<MatchResult, HTMLAudioElement> = {
    [MatchResult.WIN]: new Audio('/sounds/win.mp3'),
    [MatchResult.DRAW]: new Audio('/sounds/draw.mp3'),
    [MatchResult.LOSE]: new Audio('/sounds/lose.mp3'),
}

function getBotChoice() {
    // return Choice.PAPER // For easy testing

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

        case ActionType.NEXT_ROUND:
            if (state.clothes === 0) {
                return {...state, screen: GameScreen.GAME_OVER_WIN}
            }
            return {...state, videoNumber: state.clothes, screen: GameScreen.CHOICE}

        case ActionType.CHOICE: {
            const playerChoice = action.choice
            const botChoice = getBotChoice()
            const matchResult = getMatchResult(playerChoice, botChoice)
            const audio = audios[matchResult]
            audio && audio.play()

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
                    return {...state, clothes, screen: GameScreen.STRIP_VIDEO}
                case MatchResult.LOSE:
                    const heart = state.heart - 1
                    if (heart === 0) {
                        return {...state, heart, screen: GameScreen.GAME_OVER_LOSE}
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

    const clothes = <img className="clothes" alt="clothes" src="/images/icons/clothes.png" />
    const clothesArray: JSX.Element[] = new Array(state.clothes)
    clothesArray.fill(clothes)

    const heart = <img alt="heart" className="heart" src="/images/icons/heart.png" />
    const emptyHeart = <img alt="empty-heart" className="heart" src="/images/icons/heart-empty.png" />
    const heartArray: JSX.Element[] = new Array(defaultState.heart)
    heartArray.fill(heart, 0, state.heart)
    heartArray.fill(emptyHeart, state.heart)

    return (
        <AppContext.Provider value={context}>
            <Container>
                <ClothesSection>{clothesArray}</ClothesSection>
                <HeartSection>{heartArray}</HeartSection>

                <Video
                    play={state.screen === GameScreen.STRIP_VIDEO}
                    videoNumber={state.videoNumber}
                    onVideoEnded={() => dispatch({type: ActionType.NEXT_ROUND})}></Video>

                {state.screen === GameScreen.CHOICE && <ChoiceScreen />}
                {state.screen === GameScreen.RESULT && <ResultScreen />}
                {state.screen === GameScreen.STRIP_VIDEO && <VideoScreen />}

                {state.screen === GameScreen.GAME_OVER_WIN && <GameOverScreen screen={state.screen} />}
                {state.screen === GameScreen.GAME_OVER_LOSE && <GameOverScreen screen={state.screen} />}
            </Container>
        </AppContext.Provider>
    )
}

export default App
