import { ChangeEvent } from 'react'

export interface SwitchProps {
  className?: string,
  id: string,
  checked?: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
