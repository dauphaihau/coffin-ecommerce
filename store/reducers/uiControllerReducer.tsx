export enum uiControllerActionsKind {
  OPEN_ADDRESS_MODAL = 'OPEN_ADDRESS_MODAL',
  OPEN_LOGIN_REGISTER = 'OPEN_LOGIN_REGISTER',
  OPEN_SEARCH_MODAL = 'OPEN_SEARCH_MODAL',
  OPEN_LOGOUT_DIALOG = 'OPEN_LOGOUT_DIALOG',
  OPEN_FILTER_DRAWER = 'OPEN_FILTER_DRAWER',
  OPEN_CONFIRM_DELETE = 'OPEN_CONFIRM_DELETE',
  CLOSE_DRAWER_MODAL = 'CLOSE_DRAWER_MODAL',
  OPEN_NAV_DRAWER = 'OPEN_NAV_DRAWER',
  OPEN_CART_DRAWER = 'OPEN_CART_DRAWER',
}

export interface uiControllerActions {
  type: uiControllerActionsKind;
  payload?: any,
}

export interface uiControllerState {
  openCartDrawer: boolean,
  openAddressModal: boolean,
  openSearchModal: boolean,
  openConfirmLogout: boolean,
  confirmDelete: {
    openDialog: boolean,
    id: string,
    status: any,
  },
  openLoginRegisterModal: boolean,
  openNavDrawer: boolean,
  openFiltersDrawer: boolean,
  launchBackdrop: boolean,
  categories: [],
  progress: number,
}

const uiControllerReducer = (state: uiControllerState | Error, action: uiControllerActions) => {
  const {type, payload} = action
  switch (type) {
    case uiControllerActionsKind.OPEN_ADDRESS_MODAL: {
      return {...state, openAddressModal: true};
    }
    case uiControllerActionsKind.OPEN_SEARCH_MODAL: {
      return {...state, openSearchModal: true};
    }
    case uiControllerActionsKind.OPEN_LOGOUT_DIALOG: {
      return {...state, openConfirmLogout: true};
    }
    case uiControllerActionsKind.OPEN_LOGIN_REGISTER: {
      return {...state, openLoginRegisterModal: true};
    }
    case uiControllerActionsKind.OPEN_CONFIRM_DELETE: {
      return {
        ...state, confirmDelete: {
          openDialog: true, id: payload, status: payload
        }
      };
    }
    case uiControllerActionsKind.OPEN_CART_DRAWER: {
      return {...state, openCartDrawer: true};
    }
    case uiControllerActionsKind.OPEN_NAV_DRAWER: {
      return {...state, openNavDrawer: true};
    }
    case uiControllerActionsKind.OPEN_FILTER_DRAWER: {
      return {...state, openFiltersDrawer: true};
    }

    case uiControllerActionsKind.CLOSE_DRAWER_MODAL: {
      return {
        ...state,
        openAddressModal: false,
        openSearchModal: false,
        openConfirmLogout: false,
        openLoginRegisterModal: false,
        confirmDelete: {openDialog: false, id: 0, status: false},
        openCartDrawer: false,
        openFiltersDrawer: false,
        openNavDrawer: false,
        launchBackdrop: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

export default uiControllerReducer