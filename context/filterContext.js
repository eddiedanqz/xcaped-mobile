import React, { useReducer,createContext } from 'react';
import filterReducer from './filterReducer';

//Initial State
const initialState = {
    filters:{
        venue:'',
        category:'',
        date:''
    },
    }

export const FilterContext = createContext();

//Provider Component
export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer,initialState)

    //Actions
    const addFilters = (filter) =>{
        dispatch({
            type: 'ADD_FILTERS',
            payload:filter
        });
        
     }
    const clearFilters = (filter) =>{
        dispatch({
            type: 'CLEAR_FILTERS',
            payload:filter
        });
        
     }
     
     return (
         <FilterContext.Provider value={{filters:state.filters, addFilters,clearFilters}}>
             {children}
         </FilterContext.Provider>
       )
}  

