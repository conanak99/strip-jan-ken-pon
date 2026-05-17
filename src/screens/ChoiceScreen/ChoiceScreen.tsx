import React from 'react'
import {ChoiceImg} from '../../components/ChoiceImg/ChoiceImg'
import {AppContext} from '../../context'
import {ActionType, Choice} from '../../model'

import {ChoiceButton, Choices, Container} from './ChoiceScreen.style'

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
