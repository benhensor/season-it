import { createContext, useContext, useEffect, useState } from 'react'

// Create a context for the shopping list
const ShoppingListContext = createContext()

// Custome hook to use the shopping list context
export const useShoppingList = () => {
    return useContext(ShoppingListContext)
}

// Provider component
export const ShoppingListProvider = ({ children }) => {

    const [shoppingList, setShoppingList] = useState(() => {
        const savedShoppingList = localStorage.getItem('shoppingList')
        return savedShoppingList ? JSON.parse(savedShoppingList) : []
    })

    // Save shopping list to local storage on update
    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
    }, [shoppingList])
    
    // Functions to update the shopping list
    const addToShoppingList = (item) => {
        setShoppingList((prevList) => [...prevList, item])
        // console.log(`Added ${item.name} to shopping list`)
      };

    const removeFromShoppingList = (itemName) => {
        setShoppingList((prevList) => prevList.filter((item) => item.name !== itemName))
        // console.log(`Removed ${itemName} from shopping list`)
    }

    const clearShoppingList = () => {
        setShoppingList([])
        // console.log('Shopping list cleared')
    }

    return (
        <ShoppingListContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList, }}>
            {children}
        </ShoppingListContext.Provider>
    )
}


