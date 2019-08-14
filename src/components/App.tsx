import React, {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { useEvent } from 'react-use'
import styled from 'styled-components'
import Step1 from './Step1'
import Step2, { ImperativeObject } from './Step2'
import Step3 from './Step3'
import Footer from './Footer'
import Peer, { MediaConnection } from 'skyway-js'
import { CONFIG } from 'src/constants'
import SourceSelectors from './SourceSelectors'
import Videos from './Videos'

type State = {
  mediaDevices: MediaDeviceInfo[]
  isReady: boolean
  inputPeerId: string
  remotePeerId?: string
  selectedAudioId?: string
  selectedVideoId?: string
  isGetUserMediaError: boolean
}

const initialState: State = {
  mediaDevices: [],
  isReady: false,
  inputPeerId: '',
  isGetUserMediaError: false,
}

type Action =
  | {
      type: 'addMediaDevicesInfo'
      payload: MediaDeviceInfo[]
    }
  | {
      type: 'changeAudio'
      payload: string
    }
  | {
      type: 'changeVideo'
      payload: string
    }
  | {
      type: 'ready'
    }
  | {
      type: 'setInputPeerId'
      payload: string
    }
  | {
      type: 'setRemotePeerId'
      payload: string
    }
  | {
      type: 'getUserMediaError'
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addMediaDevicesInfo':
      return {
        ...state,
        mediaDevices: action.payload,
        selectedAudioId: action.payload.filter(device => device.kind === 'audioinput')[0].deviceId,
        selectedVideoId: action.payload.filter(device => device.kind === 'videoinput')[0].deviceId,
      }
    case 'changeAudio':
      return {
        ...state,
        selectedAudioId: action.payload,
      }
    case 'changeVideo':
      return {
        ...state,
        selectedVideoId: action.payload,
      }
    case 'ready':
      return {
        ...state,
        isReady: true,
        isGetUserMediaError: false,
      }
    case 'setInputPeerId':
      return {
        ...state,
        inputPeerId: action.payload,
      }
    case 'setRemotePeerId':
      return {
        ...state,
        remotePeerId: action.payload,
      }
    case 'getUserMediaError':
      return {
        ...state,
        isGetUserMediaError: true,
      }
    default:
      return state
  }
}

const usePeer = (...args: ConstructorParameters<typeof Peer>) => {
  const peerRef = useRef<Peer>()
  if (!peerRef.current) {
    peerRef.current = new Peer(...args)
    peerRef.current.off = peerRef.current.removeListener // なぜかoffがundefined なので必要
  }
  return peerRef.current
}

const _RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const _H2 = styled.h2`
  color: cornflowerblue;
`

const __SourceSelectors = styled(SourceSelectors)`
  margin-top: 8px;
`

const __Footer = styled(Footer)`
  margin-top: auto;
`

const PEER_KEY = String(Math.floor(Math.random() * 9999))

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const localStreamRef = useRef<MediaStream>()
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<MediaConnection>()
  const step2Ref = useRef<ImperativeObject>(null)
  const peer = usePeer(PEER_KEY, {
    key: CONFIG.skyway.apiKey,
    debug: 3,
  })

  const addConnectionListeners = () => {
    if (!connectionRef.current) return
    connectionRef.current.on('stream', stream => {
      if (!connectionRef.current) return
      dispatch({ type: 'setRemotePeerId', payload: connectionRef.current.remoteId })
      if (!remoteVideoRef.current) return
      remoteVideoRef.current.srcObject = stream
    })
    connectionRef.current.on('close', () => {
      console.log('close')
      dispatch({ type: 'setRemotePeerId', payload: '' })
    })
  }

  useEvent(
    'open',
    () => {
      console.log('open')
    },
    peer,
  )

  useEvent(
    'call',
    (connection: MediaConnection) => {
      connectionRef.current = connection
      if (!localStreamRef.current) return
      connection.answer(localStreamRef.current)
      addConnectionListeners()
    },
    peer,
  )

  useEvent(
    'error',
    (error: Error) => {
      alert(error.message)
    },
    peer,
  )

  const setStream = useCallback(async () => {
    if (!localVideoRef.current) return
    const constraints = {
      audio: { deviceId: { exact: state.selectedAudioId } },
      video: { deviceId: { exact: state.selectedVideoId } },
    }
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints)
      localVideoRef.current.srcObject = localStreamRef.current
      dispatch({ type: 'ready' })
      if (step2Ref.current) {
        step2Ref.current.focus()
      }
    } catch (e) {
      console.error(e.message)
      dispatch({ type: 'getUserMediaError' })
    }
  }, [state.selectedAudioId, state.selectedVideoId])

  const onChangeAudio: ChangeEventHandler<HTMLSelectElement> = e => {
    dispatch({ type: 'changeAudio', payload: e.currentTarget.value })
  }

  const onChangeVideo: ChangeEventHandler<HTMLSelectElement> = e => {
    dispatch({ type: 'changeVideo', payload: e.currentTarget.value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    connectionRef.current = peer.call(state.inputPeerId, localStreamRef.current)
    if (!connectionRef.current) {
      throw new Error('call error')
    }
    addConnectionListeners()
  }

  const onClickEndCall: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: 'setRemotePeerId', payload: '' })
    if (!connectionRef.current) return
    connectionRef.current.close()
  }

  const onClickRetry: MouseEventHandler<HTMLButtonElement> = () => {
    setStream()
  }

  const onChangeCallIdField: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch({ type: 'setInputPeerId', payload: e.currentTarget.value })
  }

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(deviceInfos => {
      dispatch({ type: 'addMediaDevicesInfo', payload: deviceInfos })
    })
  }, [])

  useEffect(() => {
    setStream()
  }, [setStream])

  return (
    <_RootDiv>
      <_H2>SkyWay React Sample</_H2>
      <Videos
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        isRemoteVisible={!!state.remotePeerId}
      />
      <__SourceSelectors
        mediaDevices={state.mediaDevices}
        onChangeAudio={onChangeAudio}
        onChangeVideo={onChangeVideo}
      />
      {!state.isReady && (
        <Step1 isGetUserMediaError={state.isGetUserMediaError} onClick={onClickRetry} />
      )}
      {state.isReady && !state.remotePeerId && (
        <Step2
          ref={step2Ref}
          id={peer.id}
          onSubmit={onSubmit}
          fieldValue={state.inputPeerId}
          onChange={onChangeCallIdField}
        />
      )}
      {state.remotePeerId && (
        <Step3 localPeerId={peer.id} remotePeerId={state.remotePeerId} onClick={onClickEndCall} />
      )}
      <__Footer />
    </_RootDiv>
  )
}

export default App
