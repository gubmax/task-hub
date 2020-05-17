import { ChangeEvent } from 'react'

export interface SwitchProps {
  className?: string,
  id: string,
  checked?: boolean,
  description?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}
