import React from 'react'
import styled from 'styled-components'
import {Choice} from '../../model'

const RotatedImg = styled.img<{rotate: number; size: number}>`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    transform: rotate(${(props) => props.rotate}deg);
`

export const ChoiceImg = ({choice, size = 100}: {choice: Choice; size?: number}) => {
    switch (choice) {
        case Choice.ROCK:
            return <RotatedImg rotate={-15} size={size} alt="rock" src="/images/icons/rock.png" />
        case Choice.SCISSOR:
            return <RotatedImg rotate={-80} size={size} alt="paper" src="/images/icons/scissor.png" />
        case Choice.PAPER:
            return <RotatedImg rotate={15} size={size} alt="scissor" src="/images/icons/paper.png" />
    }
}
