import { useState } from 'react';
import './App.css';
import pic from '../src/absa.png';
import { useEffect } from 'react';
import { useMain } from './context/Appcontext';

function App() {

  const {selected} = useMain();

  return (
    <div className="App"> 
      <LeftSide />
      {selected.length !== 0 ?  <RightSide /> : null}
    </div>
  );


  function LeftSide(){
    const [friendOpen, setFriendOpen] = useState(false);
    const [name, setName] = useState('');
    const {selected, dispatch, people} = useMain();

    function handleOpen(){
      setFriendOpen(!friendOpen);
    }

    function addFriend(){
      if(name)
      {
        const person = {name: name, billValue: '', expenseA: '', expenseB: '', pays: true, id: Number(new Date())};
        dispatch({type: "addPeople", payload: person})
        dispatch({type: "addSelected", payload: person.id})
      }
      setName('');
    }
    return (
      <div className='left'>
        {people.map((x, i)=><People details={x} key={i} selected={selected}/>)}   
        <Friend isOpen={friendOpen} addFriend={addFriend} name={name} setName={setName} /> 

        <div className='modal'>
        <button onClick={handleOpen}>{friendOpen ? 'Close' : 'Add friend'}</button>
        </div>
       
      </div>
    );
   }
}
 function RightSide(){
  const {dispatch, selected} = useMain();
  const [billValue, setBillValue] = useState(selected[0]?.billValue);
  const [ expenseA, setExpenseA] = useState(selected[0]?.expenseA);
  const [ expenseB, setExpenseB] = useState(selected[0]?.expenseB);
  const [select, setSelect] = useState(Number(selected[0]?.pays));

function handleSave(){
  dispatch({type: "updateSelected", payload: {selected: selected[0].id, billValue: billValue, expenseA: expenseA, expenseB: expenseB, pays: select}});

}
function handleOnchange(e){
 const val = Number(e.target.value);
 setExpenseA(val);
  setExpenseB(billValue-val);
}
function handleOnchangeb(e){
  const val = Number(e.target.value);
  setBillValue(val);
   setExpenseB(val-expenseA);
 }

 useEffect(() => {
  setExpenseA(selected[0]?.expenseA);
  setExpenseB(selected[0]?.expenseB);
  setBillValue(selected[0]?.billValue);
  setSelect(Number(selected[0]?.pays));
}, [selected[0]?.expenseA, selected[0]?.expenseB,selected[0]?.billValue,Number(selected[0]?.pays)]);


function handleSelect(e){
  setSelect(e.target.value);
}

  return (
    <div className='right'>
      <div className='container'>
      <h1>SPLIT A BILL WITH {selected[0]?.name?.toUpperCase()}</h1>
      <div className='container-text'>
        <h2>💰 Bill Value</h2>
        <input value={billValue} onChange={handleOnchangeb}/>
      </div>
      <div className='container-text'>
        <h2>🧍 Your Expense</h2>
        <input  value={expenseA} onChange={handleOnchange}/>
      </div>

      <div className='container-text'>
        <h2>👯‍♀️ {selected[0]?.name}'s Expense</h2>
        <input value={expenseB}disabled/>
      </div>

      <div className='container-text'>
        <h2> Who's paying the bill</h2>

        <select value={select} onChange={handleSelect}>
          <option value={0}>You</option>
          <option value={1}>{selected[0]?.name}</option>
        </select>
      </div>
      
      <button onClick={handleSave}>Split Bill</button>
   

    
      </div>
    </div>
  );
 }

function People({details}){
  const {selected, dispatch, people} = useMain();

  return(
    <div className={`people ${selected[0]?.id === details.id && 'selected'}`}  onClick={()=> dispatch({type: "addSelected", payload: details.id})}>
      <img src={pic} alt='hello'/>
      <div className='text'>
        <h2>{details.name}</h2>
        {details.billValue !== '' ? (<p className={!details.pays ? 'green' : ''}> {details.pays ? 'You' : details.name} {details.pays ? 'owe' : 'owes'} {!details.pays ? 'you' : details.name} {details.pays ? details.expenseA : details.expenseB} bob</p>) : null
}
      </div>
      <button onClick={()=>dispatch({type: "addSelected", payload: details.id})}>{selected[0]?.id !== details.id ? 'Select' : 'unselect'}</button>
    </div>
  );
}

function Friend ({isOpen, name, addFriend, setName}){

  if(!isOpen) return(null);

  return (
    
    <div className='friend'>

      
      <div className='friend-text'>
        <h2>🧑‍🤝‍🧑 Friend name</h2>
        <input value={name} onChange={(e)=>setName(e.target.value)}   onKeyDown={(e)=>{if (e.key === 'Enter') {addFriend()}}}/>
      </div>
       
    <div className='friend-button'>
       <button onClick={addFriend}>
        Add
       </button>
    </div>
     

    </div>
  );
}
export default App;
