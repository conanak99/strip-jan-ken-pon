import React from 'react'
import {Choice, ActionType} from '../../model'
import {AppContext} from '../../context'
import {ChoiceImg} from '../../components/ChoiceImg/ChoiceImg'

import {Container, Choices, ChoiceButton} from './ChoiceScreen.style'

export const ChoiceScreen = () => {
    const {dispatch} = React.useContext(AppContext)

    const select = React.useCallback(
        (choice: Choice) => {
            dispatch({type: ActionType.CHOICE, choice})
        },
        [dispatch],
    )

    return (
        <Container>
            <Choices>
                {[Choice.ROCK, Choice.SCISSOR, Choice.PAPER].map((choice) => (
                    <ChoiceButton key={choice} onClick={() => select(choice)}>
                        <ChoiceImg choice={choice} />
                    </ChoiceButton>
                ))}
            </Choices>
        </Container>
    )
}
