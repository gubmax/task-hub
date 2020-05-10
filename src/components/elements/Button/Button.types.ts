export interface ButtonProps {
  children: string,
  primary?: boolean,
  large?: boolean,
  loading?: boolean,
  className?: string,
  onClick: () => void,
}
