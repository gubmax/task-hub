import { MainActions } from './actions.types'

const actions: MainActions = {
  setThemeMode: ({ state, setState }, payload) => {
    const { bySystem } = state.theme
    setState({
      theme: {
        bySystem,
        mode: payload,
      },
    })
  },

  setThemeBySystem: ({ state, setState }, payload) => {
    const { mode } = state.theme
    setState({
      theme: {
        bySystem: payload,
        mode,
      },
    })
  },

  setAcessToken: ({ setState }, payload) => {
    setState({
      user: {
        accessToken: payload,
      },
    })
  },

  removeAcessToken: ({ setState }) => {
    setState({
      user: {
        accessToken: null,
      },
    })
  },

  toggleSidebar: ({ state, setState }) => {
    const { showSidebar } = state
    setState({ showSidebar: !showSidebar })
  },

  setSearching: ({ setState }, payload) => {
    setState({
      search: {
        isSearching: payload,
      },
    })
  },
}

export { actions }
