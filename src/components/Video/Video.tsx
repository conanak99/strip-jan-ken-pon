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
    opacity: 0.75;
    object-fit: cover;
    z-index: -1;
`

export const Video = ({play, videoNumber, onVideoEnded}: Props) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null)

    React.useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.currentTime = 0

            if (play) {
                video.play()
            }
        }

        return () => {
            if (video) {
                video.pause()
            }
        }
    }, [play, videoRef])

    return (
        <StyledVideo
            key={videoNumber}
            ref={videoRef as any}
            poster={`/images/preview_${videoNumber}.jpg`}
            onEnded={onVideoEnded}
            preload="auto">
            <source src={`/videos/${videoNumber}.mp4`} type="video/mp4" />
        </StyledVideo>
    )
}
