export interface REDUCER_STATE {
    isLoading: boolean;
    isEmptyField: boolean;
    isNotFound: boolean;
    startScreen: boolean;
  }
 export function reducer(state: REDUCER_STATE, action: any) {
    switch (action.type) {
      case "showLoading":
        return { ...state, isLoading: true };
      case "hideLoading":
        return { ...state, isLoading: false };
      case "showRequiredField":
        return { ...state, isEmptyField: true };
      case "hideRequiredField":
        return { ...state, isEmptyField: false };
      case "isNotFound":
        return { ...state, isNotFound: action.value };
      case "startScreen":
        return { ...state, startScreen: action.startScreen };
    }
  }