import { createContext, useContext, useEffect, useState } from 'react'

// Create a context for the produce list 
const ProduceListContext = createContext()

// Custome hook to use the produce list context
export const useProduceList = () => {
    return useContext(ProduceListContext)
}

// Provider component
export const ProduceListProvider = ({ children }) => {

    const [produceList, setProduceList] = useState([])

    // Save produce list to local storage on update
    useEffect(() => {
        localStorage.setItem('produceList', JSON.stringify(produceList))
    }, [produceList])
    
    // Functions to update the produce list
    const updateProduceList = (array) => {
        setProduceList(array)
      };    

    return (
        <ProduceListContext.Provider value={{ produceList, updateProduceList }}>
            {children}
        </ProduceListContext.Provider>
    )
}