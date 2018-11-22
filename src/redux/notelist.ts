interface Action {
  type: string,
  id: number
}
interface State {
  selectedNoteId: any
}
const defaultState = {
  selectedNoteId: null
}
const notelist = (state = defaultState, action: Action): State => {
  switch (action.type) {
    case 'SELECT_NOTE':
      return Object.assign({}, state, {
        selectedNoteId: action.id
      })
    default:
      return state
  }
}
export default notelist