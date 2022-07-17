import { ADD, DECREMENT_COUNT, INCREMENT_COUNT, SET_SELECTED_ATTRIBUTE, SET_SELECTED_CURRENCY, TOGGLE_SHOPPING_CART_MODAL } from "./constants";

const compareArrays = (arr1, arr2) => {
  let equal = true;
  arr1.map((element, index) => {
    if (equal && element != arr2[index]) {
      equal = false;
    }
  });
  return equal;
}

export const addToShoppingCart = (product) => (dispatch, getState) => {
  const shoppingCart = [...getState().shoppingCart];
  let isNewProduct = true;

  // check if there is already product with the same name and attributes
  shoppingCart.forEach((p, index) => {
    if (product.name === p.name) {
      if (compareArrays(product.selectedAttributes, p.selectedAttributes)) {
        shoppingCart[index] = { ...shoppingCart[index], count: shoppingCart[index].count + 1 }
        isNewProduct = false;
      }
    }
  });

  if (isNewProduct) {
    shoppingCart.push({ ...product, count: 1 });
  }

  dispatch({
    type: ADD,
    payload: shoppingCart
  });

}

export const setSelectedCurrency = (index) => (dispatch, getState) => {
  dispatch({
    type: SET_SELECTED_CURRENCY,
    payload: index
  });
}

export const incrementCount = (index) => (dispatch, getState) => {
  let shoppingCart = [...getState().shoppingCart];

  shoppingCart[index] = { ...shoppingCart[index], count: shoppingCart[index].count + 1 };

  dispatch({
    type: INCREMENT_COUNT,
    payload: shoppingCart
  })
}


export const decrementCount = (index) => async (dispatch, getState) => {

  let shoppingCart = [...getState().shoppingCart];

  // if count of elements is 0, remove element from array
  if (shoppingCart[index].count - 1 <= 0) {
    shoppingCart = shoppingCart.slice(0, index).concat(shoppingCart.slice(index + 1));
    toggleShoppingCartModal()
  }
  else {
    shoppingCart[index] = { ...shoppingCart[index], count: shoppingCart[index].count - 1 };
  }

  dispatch({
    type: DECREMENT_COUNT,
    payload: shoppingCart
  });

}

export const setSelectedAttribute = (productIndex, attributeIndex, attributeValueIndex) => (dispatch, getState) => {

  let shoppingCart = [...getState().shoppingCart];
  // create new attributes
  let newAttributes = shoppingCart[productIndex].selectedAttributes.map((a, i) => (i == attributeIndex ? attributeValueIndex : a));
  let elementsConcatted = false;

  shoppingCart.forEach((p, index) => {
    // check if there is already exists element with the same attributes and name
    if (!elementsConcatted && shoppingCart[productIndex].name === p.name && index != productIndex) {
      if (compareArrays(newAttributes, p.selectedAttributes)) {
        let buf = shoppingCart[productIndex].count;

        // if yes delete element
        shoppingCart = [
          ...shoppingCart.slice(0, productIndex),
          ...shoppingCart.slice(productIndex + 1)
        ];

        // and modify count, depending on the index difference between the two
        if (index > productIndex) {
          shoppingCart[index - 1] = { ...shoppingCart[index - 1], count: shoppingCart[index - 1].count + buf };
        }
        else {
          shoppingCart[index] = { ...shoppingCart[index], count: shoppingCart[index].count + buf };
        }
        elementsConcatted = true;
      }
    }
  });

  // if element with the same attributes not found, modify element
  if (!elementsConcatted) {
    shoppingCart[productIndex] = { ...shoppingCart[productIndex], selectedAttributes: newAttributes };
  }

  dispatch({
    type: SET_SELECTED_ATTRIBUTE,
    payload: shoppingCart
  });
}

export const toggleShoppingCartModal = () => (dispatch, getState) => {
  const isOpen = getState().isShoppingCartOpen;
  dispatch({
    type: TOGGLE_SHOPPING_CART_MODAL,
    payload: !isOpen
  });

}
