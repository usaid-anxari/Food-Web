import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
    </div>
  )
}

export default Home