import { useState } from 'react';
import './App.css';
import pic from '../src/absa.png';
import { useEffect } from 'react';

function App() {

  const [people, setPeople] = useState([  {name: "Stanslaus", billValue: 80, expenseA: 20, expenseB: 60, pays: true, id: 864},
  {name: "Wanderi", billValue: 200, expenseA: 100, expenseB: 100, pays: false, id: 586}]);

  const [selected, setSelected] = useState([people[0]]);
  function addPeople(person){
    people.push(person);
  }

  function  addSelected  (id){
    setSelected(people.filter((item)=> item.id === id));
  }
  
  function updateSelected (id, billValue, expenseA, expenseB, pays){
   const newArray = people.map((item) =>{
    if(item.id === id){
      return {...item, billValue: billValue, expenseA: expenseA, expenseB: expenseB, pays: pays}
    }else{
      return item;
    }
   });
   setPeople(newArray);
  }

  return (
    <div className="App">
    
      <LeftSide people={people} addPeople={addPeople} addSelected={addSelected}/>
      <RightSide selected={selected[0]} updateSelected={updateSelected}/>
    </div>
  );


  function LeftSide({people, addPeople, addSelected}){

    const [friendOpen, setFriendOpen] = useState(false);
    const [name, setName] = useState('');


    function handleOpen(){
      setFriendOpen(!friendOpen);
    }

    function addFriend(){
      if(name)
      {
        const person = {name: name, billValue: '', expenseA: '', expenseB: '', pays: true, id: Number(new Date())};
        addPeople(person);
      }
      setName('');
    }
    return (
      <div className='left'>
        {people.map((x, i)=><People details={x} key={i} addSelected={addSelected} selected={selected}/>)}   
        <Friend isOpen={friendOpen} addFriend={addFriend} name={name} setName={setName} /> 

        <div className='modal'>
        <button onClick={handleOpen}>{friendOpen ? 'Close' : 'Add friend'}</button>
        </div>
       
      </div>
    );
   }
}
 function RightSide({selected, updateSelected}){
  const [billValue, setBillValue] = useState(selected.billValue);
  const [ expenseA, setExpenseA] = useState(selected.expenseA);
  const [ expenseB, setExpenseB] = useState(selected.expenseB);
  const [select, setSelect] = useState(Number(selected.pays));


function handleSave(){
  updateSelected(selected.id, billValue, expenseA, expenseB, select);
  // console.log()
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
  setExpenseA(selected.expenseA);
  setExpenseB(selected.expenseB);
  setBillValue(selected.billValue);
  setSelect(Number(selected.pays));
}, [selected.expenseA, selected.expenseB,selected.billValue,Number(selected.pays)]);


function handleSelect(e){
  setSelect(e.target.value);
}

  return (
    <div className='right'>
      <div className='container'>
      <h1>SPLIT A BILL WITH {selected.name?.toUpperCase()}</h1>
      <div className='container-text'>
        <h2>💰 Bill Value</h2>
        <input value={billValue} onChange={handleOnchangeb}/>
      </div>
      <div className='container-text'>
        <h2>🧍 Your Expense</h2>
        <input  value={expenseA} onChange={handleOnchange}/>
      </div>

      <div className='container-text'>
        <h2>👯‍♀️ {selected.name}'s Expense</h2>
        <input value={expenseB}disabled/>
      </div>

      <div className='container-text'>
        <h2> Who's paying the bill</h2>

        <select value={select} onChange={handleSelect}>
          <option value={0}>You</option>
          <option value={1}>{selected.name}</option>
        </select>
      </div>
      
      <button onClick={handleSave}>Split Bill</button>
   

    
      </div>
    </div>
  );
 }

function People({details, addSelected, selected}){

  return(
    <div className={`people ${selected[0].id === details.id && 'selected'}`}>
      <img src={pic} alt='hello'/>
      <div className='text'>
        <h2>{details.name}</h2>
        {details.billValue !== '' ? (<p className={!details.pays ? 'green' : ''}> {details.pays ? 'You' : details.name} {details.pays ? 'owe' : 'owes'} {!details.pays ? 'you' : details.name} {details.pays ? details.expenseA : details.expenseB} bob</p>) : null
}
      </div>
      <button onClick={()=>addSelected(details.id)}> Select</button>
    </div>
  );
}

function Friend ({isOpen, name, addFriend, setName}){

  if(!isOpen) return(null);

  return (
    
    <div className='friend'>

      
      <div className='friend-text'>
        <h2>🧑‍🤝‍🧑 Friend name</h2>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
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
