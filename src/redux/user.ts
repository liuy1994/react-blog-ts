interface Action {
  type: string,
  userName?: string
}
interface State {
  userName: string
}
const defaultState = {
  userName: ''
}
const user = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        userName: action.userName
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        userName: ''
      })
    default:
      return state
  }
}

export default user