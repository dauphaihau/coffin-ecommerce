const uiControllerReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_ADDRESS_MODAL': {
      return {...state, openAddressModal: true};
    }
    case 'OPEN_SEARCH_MODAL': {
      return {...state, openSearchModal: true};
    }
    case 'OPEN_SEARCH_LOGIN_REGISTER': {
      return {...state, openLoginRegisterModal: true};
    }
    case 'OPEN_CART_DRAWER': {
      return {...state, openCartDrawer: true};
    }
    case 'OPEN_NAV_DRAWER': {
      return {...state, openNavDrawer: true};
    }
    case 'OPEN_FILTER_DRAWER': {
      return {...state, openFiltersDrawer: true};
    }

    case 'CLOSE_DRAWER_MODAL': {
      return {
        ...state,
        openAddressModal: false,
        openSearchModal: false,
        openLoginRegisterModal: false,
        openCartDrawer: false,
        openFiltersDrawer: false,
        openNavDrawer: false,
        launchBackdrop: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default uiControllerReducer