/* eslint-disable no-param-reassign */
import { useState, useEffect, useMemo } from 'react'

import {
  ICreateStore, TListener, IStore, IAssociatedUseStore,
  TAssociateActions, TActions, TState,
} from './createStore.interface'

const setState = (
  store: IStore,
  newState: TState,
  afterUpdateCallback: (...args: any[]) => any,
) => {
  store.state = { ...store.state, ...newState }

  store.listeners.forEach((listener) => {
    listener.run!(store.state)
  })

  if (afterUpdateCallback) {
    afterUpdateCallback()
  }
}

const associateActions = (store: IStore, actions: TActions): TAssociateActions => {
  const associatedActions: any = {};

  (Object.keys(actions) as Array<string>).forEach((key) => {
    if (typeof actions[key] === 'function') {
      associatedActions[key] = actions[key].bind(null, store)
      return
    }
    if (typeof actions[key] === 'object') {
      associatedActions[key] = associateActions(store, actions[key])
    }
  })

  return associatedActions as TAssociateActions
}

const useStore = (store: IStore, mapState: any, mapActions: any) => {
  const [, setStoreState] = useState()

  const state = mapState ? mapState(store.state) : store.state
  const actions = useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
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
  }

  store.setState = setState.bind(null, store)
  store.actions = associateActions(store, actions)

  return useStore.bind(null, store) as IAssociatedUseStore
}

export { createStore }
