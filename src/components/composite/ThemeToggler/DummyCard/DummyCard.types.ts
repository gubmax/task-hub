import { Theme } from 'src/helpers/theme'

export type DummyCardProps = {
  className?: string,
  type: Theme,
  active: boolean,
  onClick: (type: boolean) => void,
}
