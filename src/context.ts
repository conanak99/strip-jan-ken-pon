import {GameState, GameScreen, Action} from './model'
import React from 'react'

export const defaultState: GameState = {
    heart: 5,
    clothes: 3,
    screen: GameScreen.CHOICE,
    videoUrl: '',
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
