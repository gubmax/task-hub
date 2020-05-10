/* eslint-disable no-param-reassign */
import { useState, useEffect, useMemo } from 'react'

import {
  ICreateStore, TListener, IStore, TMapState,
  TMapAssociateActions, TAssociateActions, TActions, TState,
  TSetState, IUseStore,
} from './store.interface'

const setState: TSetState = (store, newState, afterUpdateCallback) => {
  store.state = { ...store.state, ...newState }

  store.listeners.forEach((listener) => {
    listener.run!(store.state)
  })

  if (afterUpdateCallback) {
    afterUpdateCallback()
  }
}

const associateActions = (store: IStore, actions: TActions): TAssociateActions => {
  const associatedActions: TAssociateActions = {};

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

const useStore = (store: IStore, mapState: TMapState, mapActions: TMapAssociateActions) => {
  const [, setStoreState] = useState()

  const state = mapState ? mapState(store.state) : store.state
  const actions = useMemo(
    () => (store.actions && mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions],
  )

  useEffect(() => {
    const newListener: TListener = {
      prevState: {},
    }

    const setStoreMappedState = (newState: TState) => {
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
  }, [mapState, store.state, store.listeners])

  return [state, actions]
}

const createStore: ICreateStore = (initialState, actions) => {
  const store: IStore = {
    state: initialState,
    listeners: [],
    setState: () => {},
  }

  store.setState = setState.bind(null, store)

  if (actions) {
    store.actions = associateActions(store, actions) 
  }

  return useStore.bind(null, store) as IUseStore
}

export { createStore }
