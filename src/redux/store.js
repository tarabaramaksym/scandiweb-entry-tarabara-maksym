import { configureStore } from '@reduxjs/toolkit';
import { ADD, DECREMENT_COUNT, INCREMENT_COUNT, SET_SELECTED_ATTRIBUTE, SET_SELECTED_CURRENCY, TOGGLE_SHOPPING_CART_MODAL } from './constants';

const initState = {
  shoppingCart: [],
  selectedCurrency: 0,
  isShoppingCartOpen: false,
  routes: []
}


// might be a good idea, to make two different reducers, for working with the shopping cart and currency,
// but I left it as it is
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD:
    case SET_SELECTED_ATTRIBUTE:
    case INCREMENT_COUNT: {
      return {
        ...state,
        shoppingCart: action.payload
      }
    }
    case DECREMENT_COUNT: {
      return {
        ...state,
        shoppingCart: action.payload,
        isShoppingCartOpen: action.payload.length === 0 ? false : state.isShoppingCartOpen
      }
    }
    case SET_SELECTED_CURRENCY: {
      return {
        ...state,
        selectedCurrency: action.payload
      }
    }
    case TOGGLE_SHOPPING_CART_MODAL: {
      return {
        ...state,
        isShoppingCartOpen: action.payload
      }
    }

    default: return state;
  }
}

const store = configureStore({ reducer: rootReducer });

export default store;
