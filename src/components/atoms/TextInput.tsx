import React, { InputHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'

type Props = InputHTMLAttributes<HTMLInputElement>

const _Input = styled.input`
  font-size: 16px;
  height: 40px;
  border-radius: 3px;
  border: solid 1px #cccccc;
`

const Input = forwardRef<HTMLInputElement, Props>(({ children, ...props }, ref) => {
  return (
    <_Input ref={ref} {...props}>
      {children}
    </_Input>
  )
})
Input.displayName = 'Input'

export default Input
