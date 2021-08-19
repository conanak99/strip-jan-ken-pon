import styled from 'styled-components'
import {TABLET_BREAKPOINT} from '../../config'

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const BotChoice = styled.div`
    transform: rotate(180deg);
`
export const ResultContainer = styled.div`
    margin: 20px;
    font-size: 44px;

    ${TABLET_BREAKPOINT} {
        margin: 10px;
    }
`
export const PlayerChoice = styled.div`
    margin-bottom: 32px;
`
