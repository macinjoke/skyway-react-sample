import React, {
  ChangeEventHandler,
  FormEventHandler,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import Button from './atoms/Button'
import TextInput from './atoms/TextInput'
import { copyText } from 'src/utils'

type Props = {
  id: string
  onSubmit: FormEventHandler<HTMLFormElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  fieldValue: string
}

export type ImperativeObject = {
  focus: () => void
}

const Step2 = forwardRef<ImperativeObject, Props>(({ id, onSubmit, fieldValue, onChange }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (!inputRef.current) return
      inputRef.current.focus()
    },
  }))

  const onClick = () => {
    copyText(id)
  }
  return (
    <div>
      <p>
        Your id :{id} <Button onClick={onClick}>Copy</Button>
      </p>
      <p>Share this id with others so they can call you.</p>
      <h3>Make a call</h3>
      <form onSubmit={onSubmit} className="pure-form">
        <TextInput
          ref={inputRef}
          placeholder="Call user id..."
          value={fieldValue}
          onChange={onChange}
        />
        <Button type="submit">Call</Button>
      </form>
    </div>
  )
})
Step2.displayName = 'Step2'

export default Step2
