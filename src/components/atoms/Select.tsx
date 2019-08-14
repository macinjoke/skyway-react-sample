import React, { SelectHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'

type Props = SelectHTMLAttributes<HTMLSelectElement>

const _Container = styled.div`
  display: inline-block;
  position: relative;
  min-width: 160px;
`

const _Select = styled.select`
  width: 100%;
  height: 50px;
  padding-left: 4px;
  padding-right: 32px;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  appearance: none;
`

const _SymbolContainer = styled.div`
  height: 32px;
  width: 20px;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  font: 16px 'Consolas', monospace;
  color: #333;
  border-left: 1px solid #999;
  pointer-events: none;
`

const _SymbolDiv = styled.div`
  transform: rotate(90deg);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: -7px;
  margin: auto;
`

const Select = forwardRef<HTMLSelectElement, Props>(({ children, ...props }, ref) => {
  return (
    <_Container>
      <_Select ref={ref} {...props}>
        {children}
      </_Select>
      <_SymbolContainer>
        <_SymbolDiv>{'<>'}</_SymbolDiv>
      </_SymbolContainer>
    </_Container>
  )
})
Select.displayName = 'Select'

export default Select
