import { useState, useEffect } from 'react';
import './App.css';

const App = (props) => {
  const [value, setValue] = useState(props.amountUAH);
  let bankData;

  useEffect(async () => {
       bankData = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
             .then((response) => {
               return response.json();
              })
             .then((data) => {           
                  return data.map(item => ({
                        currencyСode: item.r030,
                        currencyValue: item.rate
                    }));        
      })
  });

 const currencyСonversion = (currencyСode) => {
   reset();
   for(let i = 0; i < bankData.length; i++){
       if(bankData[i].currencyСode === currencyСode) {
         setValue(value => (value/bankData[i].currencyValue).toFixed(2));      
       }
   }
 }
 
 function reset() {
     setValue(value => value = props.amountUAH);
 }

  return (
    <div className="app">
      <div className="counter">{value}</div>
        <div className="controls">
          <button onClick={() => currencyСonversion(840)}>USD</button>
          <button onClick={() => currencyСonversion(978)}>EUR</button>
          <button onClick={() => currencyСonversion(643)}>RUB</button>
          <button onClick={reset}>RESET</button>
        </div>
    </div>
  )

}

export default App;
