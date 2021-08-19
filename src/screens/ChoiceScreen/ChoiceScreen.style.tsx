import styled from 'styled-components'
import {TABLET_BREAKPOINT} from '../../config'

export const Container = styled.div`
    position: relative;
    height: 100vh;
`

export const Choices = styled.div`
    position: absolute;
    width: 100vw;
    bottom: 10vh;
    text-align: center;
`

export const ChoiceButton = styled.button`
    opacity: 0.8;
    cursor: pointer;
    background-color: transparent;
    border: none;
    transition: all 0.5s;

    &:hover {
        opacity: 1;
        transform: translateY(-10px) scale(1.2);
    }

    ${TABLET_BREAKPOINT} {
    }
`
