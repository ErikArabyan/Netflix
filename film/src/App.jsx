import React from 'react'
import { useSelector } from 'react-redux'
import { PageLoad } from './components/PageLoad';

export const App = () => {
    const isloading = useSelector(state => state.loadingReducer)    
  return (
    <div>
      <PageLoad isloading = {isloading}/>
    </div>
  )
}