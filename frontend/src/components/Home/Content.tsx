import Posts from '../Posts/Posts'
import Header from '../layout/Header'

const Content = () => {
  return (
    <div className='h-screen overflow-y-scroll'>
      <Header />
      <Posts />
      
    </div>
  )
}

export default Content