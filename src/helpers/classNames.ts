const cn = (...args: Array<string | 0 | null | undefined | false>) =>
  args.filter(Boolean).join(' ')

export { cn }
