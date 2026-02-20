import { createContext, useContext, useReducer, useCallback } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = {
        ...action.payload,
        cartId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      }
      return { ...state, items: [...state.items, newItem] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.cartId !== action.payload),
      }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartId === action.payload.cartId
            ? { ...item, ...action.payload.updates }
            : item
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeItem = useCallback((cartId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }, [])

  const updateItem = useCallback((cartId, updates) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { cartId, updates } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' })
  }, [])

  const setCartOpen = useCallback((isOpen) => {
    dispatch({ type: 'SET_CART_OPEN', payload: isOpen })
  }, [])

  const totalItems = state.items.length

  const totalPrice = state.items.reduce((sum, item) => {
    return sum + (item.price || 0) + (item.matPrice || 0)
  }, 0)

  const value = {
    ...state,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    toggleCart,
    setCartOpen,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
