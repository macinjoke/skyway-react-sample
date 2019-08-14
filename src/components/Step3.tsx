import React, { MouseEventHandler } from 'react'
import Button from './atoms/Button'

type Props = {
  localPeerId: string
  remotePeerId: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Step3 = ({ localPeerId, remotePeerId, onClick }: Props) => {
  return (
    <div>
      <p>Your id: {localPeerId}</p>
      <p>Currently in call with {remotePeerId}</p>
      <p>
        <Button onClick={onClick}>End call</Button>
      </p>
    </div>
  )
}

export default Step3
