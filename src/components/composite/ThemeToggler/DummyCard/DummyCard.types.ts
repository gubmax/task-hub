import { Theme } from 'src/store/state.types'

export type DummyCardProps = {
  className?: string,
  type: Theme,
  active: boolean,
  onClick: (type: boolean) => void,
}
