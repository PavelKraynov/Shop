export const LOG_UPDATE = '@log/LOG_UPDATE'

const initialState = {
  logList : []
}

export default (state = initialState, action) => {
  switch (action.type){
    case LOG_UPDATE: {
      return {
        ...state,
        logList: [ action.log, ...state.logList,]
      }
    }
    default:
      return state
  }
}