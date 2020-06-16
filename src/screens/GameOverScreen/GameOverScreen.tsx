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

export const GameOverScreen = ({screen}: Props) => {
    const {dispatch} = React.useContext(AppContext)

    return (
        <Container>
            <section className="message-list">
                <section className="message -left">
                    <i className="nes-octocat animate"></i>

                    <div className="nes-balloon from-left">
                        {screen === GameScreen.GAME_OVER_WIN && <p>Chúc mừng bạn đã chiến thắng ahihi!</p>}
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
