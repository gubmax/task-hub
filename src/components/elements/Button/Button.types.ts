export interface ButtonProps {
  children: string,
  type?: 'button' | 'reset' | 'submit',
  primary?: boolean,
  large?: boolean,
  loading?: boolean,
  className?: string,
  onClick?: () => void,
}
