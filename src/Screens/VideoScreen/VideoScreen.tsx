import React from 'react'
import styled from 'styled-components'

import {ActionType} from '../../model'
import {AppContext} from '../../context'

const ButtonContainer = styled.div`
    position: absolute;
    width: 100vw;
    bottom: 10vh;
    text-align: center;
`

export const VideoScreen = () => {
    const {dispatch} = React.useContext(AppContext)

    const skip = React.useCallback(() => {
        dispatch({type: ActionType.NEXT_ROUND})
    }, [dispatch])

    return (
        <ButtonContainer>
            <button type="button" className="nes-btn is-primary" onClick={skip}>
                Skip, hông thèm coi
            </button>
        </ButtonContainer>
    )
}
