import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import DownloadApp from '../../components/DownloadApp/DownloadApp'

const Home = () => {
  const [category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay  category={category}/>
      <DownloadApp />
    </div>
  )
}

export default Home