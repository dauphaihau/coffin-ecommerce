import {Reducer} from "react";

export enum uiControllerActionsType {
  OPEN_ADDRESS_MODAL = 'OPEN_ADDRESS_MODAL',
  OPEN_LOGIN_REGISTER = 'OPEN_LOGIN_REGISTER',
  OPEN_SEARCH_MODAL = 'OPEN_SEARCH_MODAL',
  OPEN_LOGOUT_DIALOG = 'OPEN_LOGOUT_DIALOG',
  OPEN_FILTER_DRAWER = 'OPEN_FILTER_DRAWER',
  OPEN_CONFIRM_DELETE_USER = 'OPEN_CONFIRM_DELETE_USER',
  OPEN_NAV_DRAWER = 'OPEN_NAV_DRAWER',
  OPEN_CART_DRAWER = 'OPEN_CART_DRAWER',
  CLOSE_DRAWER_MODAL = 'CLOSE_DRAWER_MODAL',
}

export interface uiControllerActions {
  type: uiControllerActionsType;
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
    status: boolean,
  },
  openLoginRegisterModal: boolean,
  openNavDrawer: boolean,
  openFiltersDrawer: boolean,
  launchBackdrop: boolean,
  categories: [],
  progress: number,
}

const uiControllerReducer: Reducer<uiControllerState, uiControllerActions> = (state, action) => {
// const uiControllerReducer = (state: uiControllerState | Error, action: uiControllerActions) => {
  const {type, payload} = action
  switch (type) {
    case uiControllerActionsType.OPEN_ADDRESS_MODAL: {
      return {...state, openAddressModal: true};
    }
    case uiControllerActionsType.OPEN_SEARCH_MODAL: {
      return {...state, openSearchModal: true};
    }
    case uiControllerActionsType.OPEN_LOGOUT_DIALOG: {
      return {...state, openConfirmLogout: true};
    }
    case uiControllerActionsType.OPEN_LOGIN_REGISTER: {
      return {...state, openLoginRegisterModal: true};
    }
    case uiControllerActionsType.OPEN_CONFIRM_DELETE_USER: {
      return {
        ...state, confirmDeleteUser: {
          openDialog: true, id: payload.id, status: payload.status
        }
      };
    }
    case uiControllerActionsType.OPEN_CART_DRAWER: {
      return {...state, openCartDrawer: true};
    }
    case uiControllerActionsType.OPEN_NAV_DRAWER: {
      return {...state, openNavDrawer: true};
    }
    case uiControllerActionsType.OPEN_FILTER_DRAWER: {
      return {...state, openFiltersDrawer: true};
    }

    case uiControllerActionsType.CLOSE_DRAWER_MODAL: {
      return {
        ...state,
        openAddressModal: false,
        openSearchModal: false,
        openConfirmLogout: false,
        openLoginRegisterModal: false,
        confirmDeleteUser: {openDialog: false, id: 0, status: false},
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