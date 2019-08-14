import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
}

const _Footer = styled.footer`
  border: solid 1px #cccccc;
  width: 100%;
  height: 64px;
  font-family: 'Century Gothic', sans-serif;
`

const _p = styled.p`
  margin: 8px;
`

const Footer: FC<Props> = ({ className }) => {
  return (
    <_Footer className={className}>
      <_p>
        Author: <a href="https://twitter.com/macinjoke">macinjoke</a>
      </_p>
      <_p>
        Code:{' '}
        <a href="https://github.com/macinjoke/my-skyway-sample">
          https://github.com/macinjoke/my-skyway-sample
        </a>
      </_p>
    </_Footer>
  )
}

export default Footer
