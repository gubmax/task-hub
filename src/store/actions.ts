import { TTheme, TStore } from './state.interface'

const actions = {
  toggleSidebar: ({ state, setState }: TStore) => {
    const { showSidebar } = state
    setState!({ showSidebar: !showSidebar })
  },

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
}

export { actions }
