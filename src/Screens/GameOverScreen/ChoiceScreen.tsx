import React from 'react'
import './ChoiceScreen.scss'
import {Choice, ActionType} from '../../model'
import {AppContext} from '../../context'

export const ChoiceScreen = () => {
    const {dispatch} = React.useContext(AppContext)

    const select = React.useCallback(
        (choice: Choice) => {
            dispatch({type: ActionType.CHOICE, choice})

            setTimeout(() => {
                dispatch({type: ActionType.CALCULATE})
            }, 5000)
        },
        [dispatch],
    )

    return (
        <div>
            <div className="choices">
                <button className="rock" onClick={() => select(Choice.ROCK)}>
                    <img alt="rock" src="https://img.icons8.com/color/96/000000/clenched-fist.png" />
                </button>
                <button className="scissor" onClick={() => select(Choice.SCISSOR)}>
                    <img alt="paper" src="https://img.icons8.com/color/96/000000/hand-scissors.png" />
                </button>
                <button className="paper" onClick={() => select(Choice.PAPER)}>
                    <img alt="scissor" src="https://img.icons8.com/color/96/000000/hand.png" />
                </button>
            </div>
        </div>
    )
}
