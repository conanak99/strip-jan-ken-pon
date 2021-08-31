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

const codes = ["MIZD-241", "MIDE-953", "MIZD-238", "MIDE-943", "MIDE-928", "MIDE-915", "MIDE-902", "MBDD-2053", "MIDE-862", "MIDE-889", "MIDE-875", "MIZD-995", "MIZD-211", "MIDE-862", "MIZD-984", "MIDE-850", "OAE-202", "MIDE-777", "MIDE-814", "MIDE-805", "MIDE-828", "MIDE-837", "MIDE-828", "MIDE-791", "MIZD-178", "MIDE-814", "VRMT-001", "MIDE-805", "MIDE-754", "MIDE-791", "MIDE-777", "MIDE-765", "MIDE-742", "MIDE-754", "MIDE-742", "MIDE-730", "MIDE-709", "MIDE-719", "MIDE-440", "MIDE-696", "MIDE-670", "AVOP-210", "TEK-077", "MIDE-619", "MIDE-533", "MIDE-560", "MIMK-055", "MIDE-582", "TEK-077", "MIDE-500", "MIDE-542", "MIDE-551", "MIMK-055", "MIDE-575", "MIDE-686", "MIZD-153", "MIDE-678", "MIDE-670", "MIDE-663", "MIDE-654", "MIDE-645", "MIDE-636", "MIDE-360", "AVOP-210", "MIDE-369", "TEK-077", "OAE-108", "MIDE-628", "MIDE-619", "MIDE-379", "MIDE-389", "MIDE-399", "MIDE-409", "MIDE-419", "MIDE-430", "MIDE-440", "MIDE-448", "MIDE-456", "MIDE-465", "MIDE-471", "MIDE-481", "MIDE-489", "MIDE-500", "MIDE-511", "OAE-140", "MIDE-522", "MIDE-533", "MIDE-542", "MIDE-551", "MIDE-560", "MIMK-055", "MIDE-575", "MIDE-582", "MIDE-589", "SSNI-356", "TEK-097", "MIDE-608"]

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
