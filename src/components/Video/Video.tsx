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
        if (!play) return
        const video = videoRef.current
        if (video) {
            video.currentTime = 0
            video.muted = false
        }
    }, [play])

    if (!play) {
        return <Preview src={`/images/preview_${videoNumber}.jpg`} alt={`preview ${videoNumber}`} />
    }

    return (
        <StyledVideo ref={videoRef} onEnded={onVideoEnded} playsInline autoPlay muted>
            <source src={`/videos/${videoNumber}.mp4`} type="video/mp4" />
        </StyledVideo>
    )
}
