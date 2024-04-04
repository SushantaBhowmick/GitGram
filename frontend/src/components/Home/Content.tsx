import { ModeToggle } from '../ModeToggle'
import Posts from '../Posts/Posts'
import Header from '../layout/Header'

const Content = () => {
  return (
    <div className='h-screen overflow-y-scroll relative'>
      <Header />
      <Posts />
      <div className='fixed bottom-5 right-10'>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Content