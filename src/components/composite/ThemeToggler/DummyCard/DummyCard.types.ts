import { Theme } from 'src/helpers/theme'

export type DummyCardProps = {
  className?: string,
  text: string,
  type: Theme,
  active: boolean,
  onClick: (type: boolean) => void,
}
