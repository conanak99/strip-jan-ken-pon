import React from 'react'
import styled from 'styled-components'

import {ActionType, GameScreen} from '../../model'
import {AppContext} from '../../context'

interface Props {
    screen: GameScreen.GAME_OVER_WIN | GameScreen.GAME_OVER_LOSE
}

const Container = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

const codes = [
    'MIDE-628',
    'MIDE-619',
    'MIDE-589',
    'MIDE-582',
    'MIDE-533',
    'MIDE-542',
    'MIDE-448',
    'MIDE-440',
    'MIDE-430',
    'AVOP-210',
    'MIDE-777',
    'MIDE-765',
    'MIDE-754',
    'MIDE-742',
    'MIDE-730',
    'MIDE-719',
    'MIDE-709',
    'OAE-140',
    'MIDE-696',
    'MIDE-686',
    'MIDE-678',
    'MIDE-670',
    'MIDE-663',
    'TEK-097',
    'MIDE-645',
    'MIDE-636',
]

function getRandomCode(): string {
    return codes[Math.floor(Math.random() * codes.length)]
}

export const GameOverScreen = ({screen}: Props) => {
    const {dispatch} = React.useContext(AppContext)

    return (
        <Container>
            <section className="message-list">
                <section className="message -left">
                    <i className="nes-octocat animate"></i>

                    <div className="nes-balloon from-left">
                        {screen === GameScreen.GAME_OVER_WIN && (
                            <p>
                                Chúc mừng bạn đã chiến thắng ahihi!
                                <br /> Mã số may mắn của bạn là <i>{getRandomCode()}</i>
                            </p>
                        )}
                        {screen === GameScreen.GAME_OVER_LOSE && <p>Thua rồi, nhục quá, chơi lại đi hihi!</p>}

                        <button
                            type="button"
                            className="nes-btn is-primary"
                            onClick={() => {
                                dispatch({type: ActionType.RESTART})
                            }}>
                            Chơi lại
                        </button>
                    </div>
                </section>
            </section>
        </Container>
    )
}
