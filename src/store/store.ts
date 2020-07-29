/* eslint-disable no-param-reassign */
import { useState, useEffect, useMemo } from 'react'

import { noop } from 'src/helpers'
import {
  CreateStore, Listener, Store, MapState,
  MapActions, AssociatedActions, StoreActions, State,
  StoreSetState, UseStore,
} from './store.types'

const setState: StoreSetState = (store, newState, afterUpdateCallback) => {
  store.state = { ...store.state, ...newState }

  store.listeners.forEach((listener) => {
    listener.run!(store.state)
  })

  if (afterUpdateCallback) {
    afterUpdateCallback()
  }
}

const associateActions = (store: Store, actions: StoreActions): AssociatedActions => {
  const associatedActions: AssociatedActions = {}

  Object.keys(actions).forEach((key) => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store)
      return
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key])
    }
  })

  return associatedActions
}

const useStore = (store: Store, mapState?: MapState, mapActions?: MapActions) => {
  const [, setStoreState] = useState()

  const state = mapState ? mapState(store.state) : store.state
  const actions = useMemo(
    () => (store.actions && mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions],
  )

  useEffect(() => {
    const newListener: Listener = {
      prevState: {},
    }

    const setStoreMappedState = (newState: State) => {
      const mappedState = mapState!(newState)

      if (mappedState !== newListener.prevState) {
        newListener.prevState = mappedState
        setStoreState(mappedState)
      }
    }

    newListener.run = mapState
      ? setStoreMappedState
      : setStoreState

    store.listeners.push(newListener)

    return () => {
      store.listeners = store.listeners.filter(
        (listener) => listener !== newListener,
      )
    }
  }, [mapState, store])

  return [state, actions]
}

const createStore: CreateStore = (initialState, actions) => {
  const store: Store = {
    state: initialState,
    listeners: [],
    setState: noop,
  }

  store.setState = setState.bind(null, store)

  if (actions) {
    store.actions = associateActions(store, actions)
  }

  return useStore.bind(null, store) as UseStore
}

export { createStore }
