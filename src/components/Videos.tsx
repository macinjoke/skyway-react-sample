import React, { FC, RefObject } from 'react'
import styled from 'styled-components'

const _RootDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const _LocalVideoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 200px;
  max-width: 400px;
`

const _LocalVideo = styled.video`
  width: 100%;
  vertical-align: bottom;
`

const _RemoteVideoDiv = styled.div`
  flex: 2 1 300px;
  max-width: 600px;
`

const _RemoteVideo = styled.video`
  width: 100%;
  vertical-align: bottom;
`

type Props = {
  localVideoRef: RefObject<HTMLVideoElement>
  remoteVideoRef: RefObject<HTMLVideoElement>
  isRemoteVisible: boolean
}

const Videos: FC<Props> = ({ localVideoRef, remoteVideoRef, isRemoteVisible }) => {
  return (
    <_RootDiv>
      <_LocalVideoDiv>
        <_LocalVideo ref={localVideoRef} muted autoPlay></_LocalVideo>
      </_LocalVideoDiv>
      {isRemoteVisible && (
        <_RemoteVideoDiv>
          <_RemoteVideo ref={remoteVideoRef} autoPlay></_RemoteVideo>
        </_RemoteVideoDiv>
      )}
    </_RootDiv>
  )
}

export default Videos
