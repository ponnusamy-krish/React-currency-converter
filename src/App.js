import './App.css';
import CurrencyRow from './CurrencyRow.js';
import { useEffect, useState } from 'react';




const BASE_URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}`



function App() {

  const [currencyOptions,setCurrencyOptions] = useState([])
  const [fromCurrency,setFromCurrency] = useState()
  const [toCurrency,setToCurrency] = useState()
  
  useEffect(()=>{
    fetch(BASE_URL).then(res =>{
      return res.json();
    })
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0];      
      setCurrencyOptions([data.base,...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      console.log(data)
    })
  },[])
  return (
   <>
    <h1>Convert</h1>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency}/>
    <div className='equals'>=</div>
    <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency}/>
   </>
  );
}

export default App;
