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
    
    // Add item to shopping list
    const addToShoppingList = (produce) => {
        const existingItem = shoppingList.some((listing) => listing.id === produce.id)
        if (!existingItem) {
            setShoppingList((prevList) => [...prevList, { id: produce.id, item: produce, marked: false}])
      };
    }

    // Remove item from shopping list
    const removeFromShoppingList = (listing) => {
        const itemId = listing.item.id
        setShoppingList((prevList) => prevList.filter((item) => item.item.id !== itemId))
    }

    // Clear shopping list
    const clearShoppingList = () => {
        setShoppingList([])
    }

    // Toggle marked status of item
    const toggleMarked = (item) => {
        setShoppingList((prevList) =>
        prevList.map((listing) => {
            if (listing.item.name === item.name) {
                return { ...listing, marked: !listing.marked };
            }
            return listing;
        })
        );
    }

    // Clear marked items
    const clearMarkedItems = () => {
        setShoppingList((prevList) =>
        prevList.map((item) => {
            return { ...item, marked: false };
        })
        );
    }

    return (
        <ShoppingListContext.Provider value={{ shoppingList, addToShoppingList, removeFromShoppingList, clearShoppingList, toggleMarked, clearMarkedItems }}>
            {children}
        </ShoppingListContext.Provider>
    )
}


