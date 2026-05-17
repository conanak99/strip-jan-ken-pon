import React from 'react'
import {type Action, GameScreen, type GameState} from './model'

const TOTAL_CLOTHES = 4
const TOTAL_HEART = 4

export const defaultState: GameState = {
    heart: TOTAL_HEART,
    clothes: TOTAL_CLOTHES,
    screen: GameScreen.CHOICE,
    videoNumber: TOTAL_CLOTHES,
}

export interface ContextValue {
    state: GameState
    dispatch: (action: Action) => void
}

const defaultContextValue: ContextValue = {
    state: defaultState,
    dispatch: () => undefined,
}

export const AppContext = React.createContext(defaultContextValue)
