import {GameState, GameScreen, Action} from './model'
import React from 'react'

const TOTAL_CLOTHES = 4
const TOTAL_HEART = 3

export const defaultState: GameState = {
    heart: TOTAL_HEART,
    clothes: TOTAL_CLOTHES,
    screen: GameScreen.CHOICE,
    videoUrl: `/videos/${TOTAL_CLOTHES}.mp4`,
}

export interface ContextValue {
    state: GameState
    dispatch: (action: Action) => void
}

const defaultContextValue: ContextValue = {
    state: defaultState,
    dispatch: () => {},
}

export const AppContext = React.createContext(defaultContextValue)
