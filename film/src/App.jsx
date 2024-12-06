import React from 'react'
import { useSelector } from 'react-redux'
import { Pageload } from './components/Pageload';

export const App = () => {
    const isloading = useSelector(state => state.loadingReducer)    
  return (
    <div>
      <Pageload isloading = {isloading}/>
    </div>
  )
}