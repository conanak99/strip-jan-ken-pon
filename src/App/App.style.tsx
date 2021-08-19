import styled from 'styled-components'
import {TABLET_BREAKPOINT} from '../config'

export const Container = styled.div`
    position: relative;
    height: 100vh;
`

export const HeartSection = styled.div`
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 5px;

    ${TABLET_BREAKPOINT} {
        width: 40vw;
    }

    .heart {
        width: 55px;
        height: 55px;
    }
`

export const ClothesSection = styled.div`
    z-index: 1;
    position: absolute;
    top: 5px;
    right: 5px;
    text-align: right;

    ${TABLET_BREAKPOINT} {
        width: 40vw;
    }

    .clothes {
        width: 60px;
        height: 60px;
    }
`
