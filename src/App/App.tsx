import React from 'react'
import {Video} from '../components/Video/Video'
import {AppContext, type ContextValue, defaultState} from '../context'
import {type Action, ActionType, Choice, GameScreen, type GameState, MatchResult} from '../model'
import {ChoiceScreen} from '../screens/ChoiceScreen/ChoiceScreen'
import {GameOverScreen} from '../screens/GameOverScreen/GameOverScreen'
import {ResultScreen} from '../screens/ResultScreen/ResultScreen'
import {VideoScreen} from '../screens/VideoScreen/VideoScreen'
import {ClothesSection, Container, HeartSection} from './App.style'

const audios: Record<MatchResult, HTMLAudioElement> = {
    [MatchResult.WIN]: new Audio('/sounds/win.mp3'),
    [MatchResult.DRAW]: new Audio('/sounds/draw.mp3'),
    [MatchResult.LOSE]: new Audio('/sounds/lose.mp3'),
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
            if (audio) {
                void audio.play()
            }

            return {...state, playerChoice, botChoice, matchResult, screen: GameScreen.RESULT}
        }

        case ActionType.CALCULATE: {
            if (state.screen !== GameScreen.RESULT) {
                return state
            }

            switch (state.matchResult) {
                case MatchResult.WIN: {
                    const clothes = state.clothes - 1
                    return {...state, clothes, screen: GameScreen.STRIP_VIDEO}
                }
                case MatchResult.LOSE: {
                    const heart = state.heart - 1
                    if (heart === 0) {
                        return {...state, heart, screen: GameScreen.GAME_OVER_LOSE}
                    }
                    return {...state, heart, screen: GameScreen.CHOICE}
                }
                case MatchResult.DRAW:
                    return {...state, screen: GameScreen.CHOICE}
                default:
                    return state
            }
        }

        default:
            return state
    }
}

function App() {
    const [state, dispatch] = React.useReducer(gameLogicReducer, defaultState)

    const context: ContextValue = {
        state,
        dispatch,
    }

    const clothesArray: React.JSX.Element[] = []
    for (let i = 0; i < state.clothes; i++) {
        clothesArray.push(
            <img key={`clothes-${i}`} className="clothes" alt="clothes" src="/images/icons/clothes.png" />,
        )
    }

    const heartArray: React.JSX.Element[] = []
    for (let i = 0; i < defaultState.heart; i++) {
        const filled = i < state.heart
        heartArray.push(
            <img
                key={`heart-${i}`}
                alt={filled ? 'heart' : 'empty-heart'}
                className="heart"
                src={filled ? '/images/icons/heart.png' : '/images/icons/heart-empty.png'}
            />,
        )
    }

    return (
        <AppContext.Provider value={context}>
            <Container>
                <ClothesSection>{clothesArray}</ClothesSection>
                <HeartSection>{heartArray}</HeartSection>

                <Video
                    play={state.screen === GameScreen.STRIP_VIDEO}
                    videoNumber={state.videoNumber}
                    onVideoEnded={() => dispatch({type: ActionType.NEXT_ROUND})}
                />

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
