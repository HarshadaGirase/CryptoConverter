import React, { useEffect, useState } from 'react'
import { Card ,Form, Input, Select} from 'antd';
import { RiCoinsLine } from "react-icons/ri";
function Converter() {

    const defaultFirstSelectValue="Bitcoin";
    const defaultSecondSelectValue="Ether";
     const[cryptoList, setCryptoList]=useState([]);
     const apiUrl= 'https://api.coingecko.com/api/v3/exchange_rates';

    const [inputValue, setInputValue]=useState("0");
    const [firstSelect, setfirstSelect]=useState(defaultFirstSelectValue);
    const [secondSelect, setsecondSelect]=useState(defaultSecondSelectValue);
     const [result, setResult]=useState('0');
    
   useEffect(()=>{
    fetchData();
   },[]); 

   useEffect(()=>{

if(cryptoList.length == 0) return;
    //find the rate according to the first select value;
    const firstSelectRate = cryptoList.find((item)=>{
        return item.value === firstSelect;
    }).rate;

 //find the rate according to the second select value;
    const secondSelectRate = cryptoList.find((item)=>{
        return item.value === secondSelect;
    }).rate;

    const resultValue= (inputValue * secondSelectRate)/firstSelectRate;

    setResult(resultValue.toFixed(5));

   console.log(firstSelectRate, secondSelectRate);
   },[inputValue, firstSelect, secondSelect]);

   async function fetchData(){
    const response = await fetch(apiUrl);
    const jsonData= await response.json();
    const data= jsonData.rates;
    // const tempArray=[];
     //this function is helps to convert objects into many parts for easiness of accessing elements;
    // Object.entries(data).forEach(item=>{
    //     const tempObj={
    //         value:item[1].name,
    //         label:item[1].name,
    //         rate:item[1].value
    //     }
    //     tempArray.push(tempObj);
    //     console.log(tempArray);
    // });

    
    //using map function making new array
    const tempArray=Object.entries(data).map(item=>{
        return {
            value:item[1].name,
            label:item[1].name,
            rate:item[1].value
        }
    })
    console.log(tempArray);

    setCryptoList(tempArray);

   }

  return (
    <div className='container'>
         <Card className='crypto-card'
    title={<h1 ><RiCoinsLine /> Crypto Converter</h1>}>
        <Form>
            <Form.Item>
                <Input className='input-value' onChange={(event)=> setInputValue(event.target.value)}/> 
            </Form.Item>
        </Form>
        <div className="select-box">
        <Select options={cryptoList} defaultValue={defaultFirstSelectValue} className='select-value' onChange={(value)=> setfirstSelect(value)}></Select>
        <Select options={cryptoList} defaultValue={defaultSecondSelectValue}  className='select-value' onChange={(value)=> setsecondSelect(value)}></Select>
        </div>
        <p>{ inputValue} {firstSelect} = {result} {secondSelect}</p>
        {/* <p>1 Bitcoin</p> */}
  </Card>
        
        </div>
  )
}

export default Converter