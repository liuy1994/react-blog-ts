interface Action {
    type: string; // 操作类型
    userName?: string
}
interface State {
    userName: string | undefined
}
const defaultState = {
    userName: ''
}

const user = (state = defaultState, action: Action): State => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                userName: action.userName
            }
            break
        case 'LOGOUT':
            return {
                ...state,
                userName: ''
            }
            break
        default:
            return state
    }
}

export default user