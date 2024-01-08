import { createContext, useContext, useReducer } from "react";
import { act } from "react-dom/test-utils";



const MainContext = createContext();

const initialState = {
people: [ {name: "Stanslaus", billValue: 80, expenseA: 20, expenseB: 60, pays: true, id: 864},
{name: "Wanderi", billValue: 200, expenseA: 100, expenseB: 100, pays: false, id: 586}],
selected: [],


}

function reducer(state, action){

    switch(action.type){
        case "addPeople":
            return {...state, people: [...state.people, action.payload]}        
        case "addSelected":
            return {...state, selected: state.people.filter((x)=> x.id === action.payload)}
        case "updateSelected":

   
            const newPeople = state.people.map((person)=>{
          
                if(action.payload.selected === person.id){
                    
                    var x;
                    if(action.payload.pays === 1){
                        x = true;
                      }else if(action.payload.pays === 0)
                      {
                        x = false;
                      }

                   person.pays = x;
                   person.billValue = action.payload.billValue;
                   person.expenseA = action.payload.expenseA;
                   person.expenseB = action.payload.expenseB;   
                } return person})
                // console.log(newPeople);
            return {...state, people: newPeople}
         default:
            throw new Error("cannot handle this actions")   
    }
}

function AppContext({children}){

const [{people, selected}, dispatch]= useReducer(reducer, initialState);



return <MainContext.Provider value={
    {
        dispatch,selected, people
}}>
{children}
</MainContext.Provider>
}

function useMain(){
    const mainContext = useContext(MainContext);

    return mainContext;
}


export {AppContext, useMain};