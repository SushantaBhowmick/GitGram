import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ModeToggle } from '../ModeToggle'
import Posts from '../Posts/Posts'
import Header from '../layout/Header'

const Content = () => {

  const {posts} = useSelector((state: RootState) => state.post);


  return (
    <div className='h-screen overflow-y-scroll relative w-full justify-center items-center'>
      <Header />
      <Posts posts={posts} />
      <div className='fixed bottom-14 right-2'>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Content