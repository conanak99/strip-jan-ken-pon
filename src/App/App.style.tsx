import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    height: 100vh;
`

export const HeartSection = styled.div`
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 5px;

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

    .clothes {
        width: 60px;
        height: 60px;
    }
`
