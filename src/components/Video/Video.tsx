import React from 'react'
import styled from 'styled-components'

interface Props {
    play?: boolean
    videoNumber: number
    onVideoEnded: () => void
}

const StyledVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    opacity: 0.8;
    object-fit: cover;
    z-index: -1;
`

const Preview = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    opacity: 0.8;
    object-fit: cover;
    z-index: -1;
`

export const Video = ({play, videoNumber, onVideoEnded}: Props) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null)

    React.useEffect(() => {
        const video = videoRef.current
        if (video) {
            console.log({video})
            video.currentTime = 0
            // Later, sound might not work on Safari mobile due to permission
            // Dunno why it can work now, lol
            video.muted = false
        }
    }, [play, videoRef])

    if (!play) {
        return <Preview src={`/images/preview_${videoNumber}.jpg`} />
    }

    return (
        <StyledVideo ref={videoRef as any} onEnded={onVideoEnded} playsInline autoPlay muted>
            <source src={`/videos/${videoNumber}.mp4`} type="video/mp4" />
        </StyledVideo>
    )
}
