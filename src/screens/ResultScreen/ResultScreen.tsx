import React from 'react'

import {AppContext} from '../../context'
import {ChoiceImg} from '../../components/ChoiceImg/ChoiceImg'
import {MatchResult, ActionType} from '../../model'
import {BotChoice, ResultContainer, PlayerChoice, Container} from './ResultScreen.style'

export const ResultScreen = () => {
    const {state, dispatch} = React.useContext(AppContext)

    const {botChoice, playerChoice, matchResult} = state

    const next = React.useCallback(() => dispatch({type: ActionType.CALCULATE}), [dispatch])

    let result: JSX.Element = <span />
    switch (matchResult!) {
        case MatchResult.WIN:
            result = <span className="nes-text is-success">Thắng rồi ahihi!!</span>
            break
        case MatchResult.DRAW:
            result = <span className="nes-text is-primary"> Hoà</span>
            break
        case MatchResult.LOSE:
            result = <span className="nes-text is-error"> Thua rùi lêu lêu!!</span>
            break
    }

    return (
        <Container>
            <BotChoice>
                <ChoiceImg size={140} choice={botChoice!} />
            </BotChoice>

            <ResultContainer>{result}</ResultContainer>

            <PlayerChoice>
                <ChoiceImg size={140} choice={playerChoice!} />
            </PlayerChoice>

            <button onClick={next} type="button" className="nes-btn is-primary">
                Tiếp tục
            </button>
        </Container>
    )
}
