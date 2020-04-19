export type TListener<State = any> = {
  run?: (s: TState<State>) => void,
  prevState?: TState<State>,
}

export type TState<State = any> = {
  [K in keyof State]: State[K] extends object
    ? TState<State[K]>
    : State[K]
}

export type TActions<Actions = any> = {
  [K in keyof Actions]: Actions[K] extends object
    ? TActions<Actions[K]>
    : Actions[K]
}

export interface IStore<State = any, Actions = any> {
  state: TState<State>,
  listeners: TListener<State>[],
  setState?: (...args: any[]) => any,
  actions?: TActions<Actions>,
}

export type TMapProp<P, A> = (arg: A) => P

type OmitFirstArg<F> = F extends (state: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never

export type TAssociateActions<T = any> = T extends { [K in keyof T]: T[K] }
  ? { [K in keyof T]: OmitFirstArg<T[K]> }
  : never

export type TMapAssociateActions<P = any, A = any> = (actions: TAssociateActions<A>) => P

type AssociateStoreForAction<
  ActionList,
  K extends keyof ActionList,
  State,
> = ActionList[K] extends () => infer R
  ? (store: IStore<State, ActionList>) => R
  : (
    ActionList[K] extends (payload: infer P) => infer R
    ? (store: IStore<State, ActionList>, payload: P) => R
    : never
  )

export type Actions<State = any, ActionList = any> = ActionList extends { [K in keyof ActionList]: ActionList[K] }
  ? { [K in keyof ActionList]: AssociateStoreForAction<ActionList, K, State> }
  : never

export interface IUseStore<State = any, Actions = any> {
  <TStateProps, TActionsProps>(
    store: IStore<State, Actions>,
    mapState?: TMapProp<TStateProps, State>,
    mapActions?: TMapProp<TActionsProps, Actions>,
  ): [TStateProps, TActionsProps]
}

export interface IAssociatedUseStore<State = any, Actions = any> {
  (): [State, TAssociateActions<Actions>]

  <TStateProps = {}, TActionsProps = {}>(
    mapState: TMapProp<TStateProps, State>,
    mapActions: TMapAssociateActions<TActionsProps, Actions>,
  ): [TStateProps, TActionsProps]

  <noState = {}, TActionsProps = {}>(
    mapState: null | undefined,
    mapActions: TMapAssociateActions<TActionsProps, Actions>,
  ): [State, TActionsProps]

  <TStateProps = {}, noActions = {}>(
    mapState: TMapProp<TStateProps, State>,
    mapActions?: null | undefined,
  ): [TStateProps, TAssociateActions<Actions>]

  <noState = {}, noActions = {}>(
    mapState?: null | undefined,
    mapActions?: null | undefined,
  ): [State, TAssociateActions<Actions>]
}

export interface ICreateStore {
  <State, Actions>(
    initialState: TState<State>,
    actions: TActions<Actions>,
  ): IAssociatedUseStore<State, Actions>
}
