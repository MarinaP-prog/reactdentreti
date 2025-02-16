import React, { useState, useEffect, lazy } from "react";
import "./App.css";
import validateFloat from './functions/validateFloat';
import RbGroup from './components/RbGroup';
import ChbGroup from './components/ChbGroup';
import NumImp from './components/NumImp';
import Select from './components/Select';
import Range from './components/Range';
import Clock from './components/Clock';
import ProgressBar from './components/ProgressBar';
import TextBox from './components/TextBox';
import Button from './components/Button';
import TextArea from './components/TextArea';
import File from './components/File'
import saveText from './functions/saveText'



function App() {
  const [scitanec1, setScitanec1] = useState('');//protoze se bude vypisovat v text box
  const [scitanec2, setScitanec2] = useState('');

  const initialContDown = 20;
  const [contDown, setContDown] = useState(initialContDown);
  const [flavour, setFlavour] = useState('vanilková')
  const [ingredients, setIngredients] = useState([])
  const [amount, setAmount] = useState(1)
  const types = ['smetanová', 'jogurtová', 'nízkotučná']
  const [type, setType] = useState('jogurtová')
  const [disc, setDisc] = useState(30)
  //dve cisla pro soucin
  const [vysledek, setVysledek] = useState('Zadejte validni scitance a zmacknete tlacitko')
  const [text, setText] = useState('')
  const progress = contDown > 0 ? ((initialContDown - contDown) / initialContDown) * 100 : 100;


  // prompt ktery se zepta na zadani float hodnoty
  // useEffect(() => {
  //   let temp = prompt("Zadejte hodnotu prvniho scitance");

  //   while (!validateFloat(temp)) {
  //     temp = prompt("Zadejte hodnotu prvniho scitance");
  //   }
  //   setScitanec1(temp)
  // }, [])

  useEffect(() => {
    if (contDown > 0) {
      const timer = setInterval(() => {
        setContDown((prev) => prev - 1); // Použití callback funkce pro správnou aktualizaci
      }, 1000);//pocet milisekund
      return () => clearInterval(timer);//vycisti interval
    }
  }, [contDown])

  const handleData = (data, source) => {
    let value = parseInt(data, 10); // Převod na číslo
    switch (source) {
      case 'rbg-flavour': {
        setFlavour(data)
        break;
      }
      case 'chb-checkboxes': {
        setIngredients(data)
        break;
      }
      case 'num-amount': {
        value = Math.min(Math.max(value, 1), 4); // Omezíme hodnotu na rozsah 1-4
        setAmount(value)
        break;
      }
      case 'sel-type': {
        setType(data)
        break;
      }
      case 'rng-disc': {
        setDisc(data)
        break;
      }
      case "txb-scitnec1": {
        setScitanec1(data)
        break;
      }
      case "txb-scitnec2": {
        setScitanec2(data)
        break;
      }
      case 'txa-text': {
        setText(data);
        break;
      }
      default:
        break;
    }
  }

  const handleEvent=(source)=>{
    switch (source) {
      case 'btn-soucet':{
        secti();
        break;
    }
    case 'btn-download': {
      saveText(text)
      break;
    }
      default:
        break;
    }
  }
  const secti = () => {
    
        if (validateFloat(scitanec1) && validateFloat(scitanec2)) {
          
          setVysledek(`Soucet je ${parseFloat(scitanec1) + parseFloat(scitanec2)}`)
        } else {
          setVysledek('Zadejte validni scitance a zmacknete tlacitko')
        }
       
        
    }



  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row p-4">
          <div className="col-6">
            <p className="p-4">{flavour} {ingredients} {amount} kopečky, {type}</p>
            <RbGroup
              id='rbg-flavour'
              label='Příchuť zmrzliny'
              selectedValue={flavour}
              handleData={handleData}
              dataIn={[
                { label: 'Vanilková', value: 'vanilková' },
                { label: 'Čokoládová', value: 'čokoládová' },
                { label: 'Míchaná', value: 'míchaná' },
              ]}
            />
            <ChbGroup
              id='chb-checkboxes'
              label='Něco navrch?'
              selectedValue={ingredients}
              handleData={handleData}
              dataIn={[
                { label: 'Kousky oříšků', value: ' s kousky oříšků' },
                { label: 'Čoko hoblinky', value: ' s čoko hoblinkami' },
                { label: 'Karamelové křupinky', value: ' s karamelovými křupinkami' },
              ]}
            />
            <NumImp
              min='1'
              max='4'
              label=''
              id='num-amount'
              dataIn={amount}
              handleData={handleData}
            />
            <Select
              label='Výběr druhu zmrzliny'
              id='sel-type'
              selectedValue={type}
              dataIn={types}
              handleData={handleData}
            />
            <Range
              min='0'
              max='100'
              label='Místo na disku'
              id='rng-disc'
              dataIn={disc}
              handleData={handleData}
            />
            <p className="p-4">
              <Clock />
              , zbývá {disc}% místa na disku</p>
          </div>
          <div className="col-6">
            <ProgressBar id='pgb-progress' dataIn={progress} />
            <p className="p-4">Instalace probíhá, čekejte {contDown} sekund</p>
            <div className="row p-4">
              <div className="col-6">
                <TextBox
                  label='Sčítanec 1'
                  id='txb-scitnec1'
                  dataIn={scitanec1}
                  handleData={handleData}
                />
               
              </div>
              <div className="col-6">
                <TextBox
                  label='Sčítanec 2'
                  id="txb-scitnec2"
                  dataIn={scitanec2}
                  handleData={handleData}
                />
                
              </div>
            </div>
            <div className="row p-4">
              <div className="col-6">
              <Button
                  id='btn-soucet'
                  label='Vypocitej soucet'
                  handleEvent={handleEvent}
                />
              </div>
              <div className="col-6">
              <p>{vysledek}</p>
              </div>
            </div>
              <TextArea 
              id="txa-text"
              label="Operace s textem"
              dataIn={text}
              handleData={handleData}
              height={200}
              />
               <div className="row p-4">
              <div className="col-6">
                <File
                  id="file-load"
                  label="Načti text ze souboru"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <Button
                  id="btn-download"
                  label="Stáhni soubor s textem"
                  handleEvent={handleEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
