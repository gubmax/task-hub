export type State<S = any> = {
  [K in keyof S]: S[K] extends object
    ? State<S[K]>
    : S[K]
}

export type Listener<S = any> = {
  run?: (state: State<S>) => void,
  prevState?: State<S>,
}

export type StoreActions<A = any> = {
  [K in keyof A]: A[K] extends object
    ? StoreActions<A[K]>
    : A[K]
}

export type StoreSetState<> = (
  store: Store,
  newState: Partial<State>,
  afterUpdateCallback?: (...args: any[]) => any,
) => void

export type SetState<S> = (newState: Partial<State<S>>) => void

export interface Store<S = any, A = any> {
  state: State<S>,
  listeners: Listener<S>[],
  setState: SetState<S>,
  actions?: StoreActions<A>,
}

export type MapState<P = any, A = any> = (arg: A) => P

type OmitFirstArg<F> = F extends (state: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never

export type AssociatedActions<T = any> = {
  [K in keyof T]: T[K] extends Function
    ? OmitFirstArg<T[K]>
    : AssociatedActions<T[K]>
}

export type MapActions<P = any, A = any> = (actions: AssociatedActions<A>) => P

type AssociateStoreForAction<
  ActionList,
  K extends keyof ActionList,
  S,
> = ActionList[K] extends () => infer R
  ? (store: Store<S, ActionList>) => R
  : (
    ActionList[K] extends (payload: infer P) => infer R
    ? (store: Store<S, ActionList>, payload: P) => R
    : never
  )

export type Actions<S = any, ActionList = any> = (
  ActionList extends { [K in keyof ActionList]: ActionList[K] }
    ? { [K in keyof ActionList]: AssociateStoreForAction<ActionList, K, S> }
    : never
)

export interface UseStore<S = any, A = any> {
  (): [S, AssociatedActions<A>]

  <StateProps = {}, ActionsProps = {}>(
    mapState: MapState<StateProps, S>,
    mapActions: MapActions<ActionsProps, A>,
  ): [StateProps, ActionsProps]

  <noState = {}, ActionsProps = {}>(
    mapState: null | undefined,
    mapActions: MapActions<ActionsProps, A>,
  ): [S, ActionsProps]

  <StateProps = {}, noActions = {}>(
    mapState: MapState<StateProps, S>,
    mapActions?: null | undefined,
  ): [StateProps, AssociatedActions<A>]
}

export interface CreateStore {
  <S, A>(
    initialState: State<S>,
    actions?: StoreActions<A>,
  ): UseStore<S, A>
}
