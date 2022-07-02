import { screen } from '@testing-library/react';
import React, { useRef } from 'react'
import { useEffect } from 'react';
import './App.css'

const App = () => {
  const inputMinutes = useRef<any>(null);
  const inputValue = useRef<any>(null)

  let startFlag = false;
  let interval: any = null;

  const secondToMinutes = (second: string | number) => {
    const secondInput = Math.abs(Number(second));
    const hourResult = Math.floor(Number(secondInput) / 3600);
    const minutestest = Math.floor((Number(secondInput) - hourResult * 3600) / 60);
    const secondResult = Number(secondInput) - (hourResult * 3600) - (minutestest * 60);
    return `${hourResult}: ${String(minutestest).padStart(2, '0')}: ${String(secondResult).padStart(2, '0')}`
  }

  const handleIncreaseSecondTime = () => {
    const secondArray = String(inputValue.current.textContent).split(':');
    const sumSecondTime = Number(secondArray[0]) * 3600 + Number(secondArray[1]) * 60 + Number(secondArray[2]);
    inputValue.current.textContent = secondToMinutes(sumSecondTime + 1);
  }

  const handleChange = (e: any) => {
    console.log('e', e.target.value);
    if (inputMinutes.current) {
      inputValue.current.textContent = secondToMinutes(e.target.value);
    }
  }

  const handleStart = () => {
    if (inputValue.current && startFlag === false) {
      startFlag = true;
      interval = setInterval(handleIncreaseSecondTime, 1000);
    }
  }

  const handleStop = () => {
    startFlag = false;
    clearInterval(interval);
  }

  const handleReset = () => {
    handleStop();
    inputMinutes.current.value = '';
    inputValue.current.textContent = '0: 00: 00';
    inputMinutes.current.focus();
  }

  useEffect(() => {
    if (inputMinutes) {
      inputMinutes.current.focus()
      inputValue.current.textContent = '0: 00: 00'
      const clockTitle = screen.getByTestId('clock-id').textContent; 
      const minutesInput = screen.getByPlaceholderText('typing minutes').nodeValue;
      console.log('clockTitle', clockTitle)
      console.log('minutesInput', minutesInput)
    }
  }, [])
  //haha

  return (
    <div className='container'>
      <div>Clock</div>
      <label>
        <span>Type minutes</span>
        <input type="number" placeholder='typing minutes' ref={inputMinutes} onChange={(e) => handleChange(e)} />
      </label>
      <div ref={inputValue} data-testid='clock-id' ></div>
      <div>
        <button type='button' onClick={() => handleStart()} >start</button>
        <button type='button' onClick={() => handleStop()} >stop</button>
        <button type='button' onClick={() => handleReset()}>reset</button>
      </div>
    </div>
  )
}

export default App