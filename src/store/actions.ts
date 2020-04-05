import { TTheme, TStore } from './state.interface'

const actions = {
  setThemeMode: ({ state, setState }: TStore, payload: TTheme) => {
    const { bySystem } = state.theme
    setState!({
      theme: {
        bySystem,
        mode: payload,
      },
    })
  },

  setThemeBySystem: ({ state, setState }: TStore, payload: boolean) => {
    const { mode } = state.theme
    setState!({
      theme: {
        bySystem: payload,
        mode,
      },
    })
  },

  setAcessToken: ({ setState }: TStore, payload: string) => {
    setState!({
      user: {
        acessToken: payload,
      },
    })
  },

  removeAcessToken: ({ setState }: TStore) => {
    setState!({
      user: {
        acessToken: null,
      },
    })
  },

  toggleSidebar: ({ state, setState }: TStore) => {
    const { showSidebar } = state
    setState!({ showSidebar: !showSidebar })
  },
}

export { actions }
