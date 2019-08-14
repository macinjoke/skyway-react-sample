// Type definitions for SkyWay@1.1.17
// Project: https://github.com/skyway/skyway-js-sdk
// Definitions by: Toshiya Nakakura <https://github.com/nakakura>
//                 Atsushi Izumihara <https://github.com/izmhr>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0
//
// Updated by macinjoke

declare module 'skyway-js' {
  import { EventEmitter } from 'events'

  export interface Options {
    key: string
    debug?: number
    turn?: boolean
    credential?: Credential
    config?: RTCConfiguration
  }

  export interface Credential {
    timestamp?: number
    ttl?: number
    authToken?: string
  }

  export interface CallOptions {
    metadata?: any
    videoBandWidth?: number
    audioBandwidth?: number
    videoCodec?: string
    audioCodec?: string
    videoReceiveEnabled?: boolean
    audioReceiveEnabled?: boolean
    label?: string
  }

  export interface ConnectOptions {
    metadata?: any
    serialization?: string
    dcInit?: RTCDataChannelInit
    label?: string
  }

  export interface RoomOptions {
    mode?: string
    stream?: MediaStream
    videoBandwidth?: number
    audioBandwidth?: number
    videoCodec?: string
    audioCodec?: string
    videoReceiveEnabled?: boolean
    audioReceiveEnabled?: boolean
  }

  export interface AnswerOptions {
    videoBandwidth?: number
    audioBandwidth?: number
    videoCodec?: string
    audioCodec?: string
  }

  export default class Peer extends EventEmitter {
    constructor(id: string, options: Options)
    constructor(options: Options)
    constructor(arg1: string | Options, arg2?: Options)

    connections: any
    id: string
    open: boolean
    rooms: any

    call(
      peerId: string,
      stream?: MediaStream,
      options?: CallOptions,
    ): MediaConnection | undefined
    connect(
      peerId: string,
      options?: ConnectOptions,
    ): DataConnection | undefined
    destroy(): undefined
    disconnect(): undefined
    joinRoom(
      roomName: string,
      roomOptions?: RoomOptions,
    ): SFURoom | MeshRoom | undefined | null
    listAllPeers(cb: (peerIds: string[]) => void): void
    updateCredential(newCredential: Credential): undefined

    on(type: 'open', listener: (id: string) => void): this
    on(type: 'call', listener: (call: MediaConnection) => void): this
    on(type: 'close', listener: () => void): void
    on(type: 'connection', listener: (connection: DataConnection) => void): void
    on(type: 'disconnected', listener: (id: string) => void): void
    on(type: 'error', listener: (err: any) => void): void
    on(type: 'open' | 'call' | 'close' | 'connection' | 'disconnected' | 'error', listener: (ret: any) => void): void
  }

  export class MediaConnection {
    metadata: any
    open: boolean
    remoteId: string
    peer: string

    answer(stream: MediaStream, options?: AnswerOptions): undefined
    close(): void | undefined
    replaceStream(stream: MediaStream): undefined

    on(event: string, cb: () => void): void
    on(event: 'stream', cb: (stream: MediaStream) => void): void
    on(event: 'close', cb: () => void): void
    on(event: 'removeStream', cb: (reamoteStream: MediaStream) => void): void
  }

  export class DataConnection {
    metadata: any
    open: boolean
    remoteId: string
    peer: string

    send(data: any): void
    close(): void | undefined

    on(event: string, cb: () => void): void
    on(event: 'data', cb: (data: any) => void): void
    on(event: 'close', cb: () => void): void
  }

  interface DataObject {
    src: string
    data: any
  }

  export class MeshRoom {
    close(): undefined
    getLog(): undefined
    replaceStream(stream: MediaSource): undefined
    send(data: any): undefined

    on(event: string, cb: () => void): void
    on(event: 'open', cb: () => void): void
    on(event: 'peerJoin', cb: (peerId: string) => void): void
    on(event: 'peerLeave', cb: (peerId: string) => void): void
    on(event: 'log', cb: (logs: string[]) => void): void
    once(event: 'log', cb: (logs: string[]) => void): void
    on(event: 'stream', cb: (stream: MediaStream) => void): void
    on(event: 'data', cb: (object: DataObject) => void): void
    on(event: 'close', cb: () => void): void
    on(event: 'removeStream', cb: (stream: MediaStream) => void): void
  }

  export class SFURoom {
    close(): undefined
    getLog(): undefined
    replaceStream(stream: MediaSource): undefined
    send(data: any): undefined

    on(event: string, cb: () => void): void
    on(event: 'open', cb: () => void): void
    on(event: 'peerJoin', cb: (peerId: string) => void): void
    on(event: 'peerLeave', cb: (peerId: string) => void): void
    on(event: 'log', cb: (logs: string[]) => void): void
    once(event: 'log', cb: (logs: string[]) => void): void
    on(event: 'stream', cb: (stream: MediaStream) => void): void
    on(event: 'data', cb: (object: DataObject) => void): void
    on(event: 'close', cb: () => void): void
    on(event: 'removeStream', cb: (stream: MediaStream) => void): void
  }
}
