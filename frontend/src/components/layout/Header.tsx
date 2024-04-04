import { useRef } from 'react'
import { Link } from 'react-router-dom';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Header = () => {
  const users = [
    { id: 1, name: "Sushanta Bhowmick", username: "sushanta", image: "https://randomuser.me/api/portraits/men/1.jpg", age: 21 },
    { id: 2, name: "Jessica Smith", username: "jessicaaaaa", image: "https://randomuser.me/api/portraits/women/2.jpg", age: 25 },
    { id: 3, name: "Michael Johnson", username: "michaellll", image: "https://randomuser.me/api/portraits/men/3.jpg", age: 30 },
    { id: 4, name: "Emily Davis", username: "emily", image: "https://randomuser.me/api/portraits/women/4.jpg", age: 22 },
    { id: 5, name: "Christopher Brown", username: "christopher", image: "https://randomuser.me/api/portraits/men/5.jpg", age: 28 },
    { id: 6, name: "Olivia Wilson", username: "olivia234", image: "https://randomuser.me/api/portraits/women/6.jpg", age: 26 },
    { id: 7, name: "Matthew Martinez", username: "matthew345", image: "https://randomuser.me/api/portraits/men/7.jpg", age: 24 },
    { id: 8, name: "Emma Taylor", username: "emma", image: "https://randomuser.me/api/portraits/women/8.jpg", age: 29 },
    { id: 9, name: "Daniel Anderson", username: "daniel", image: "https://randomuser.me/api/portraits/men/9.jpg", age: 23 },
    { id: 10, name: "Ava Thomas", username: "ava", image: "https://randomuser.me/api/portraits/women/10.jpg", age: 27 },
    { id: 11, name: "James Jackson", username: "james", image: "https://randomuser.me/api/portraits/men/11.jpg", age: 31 },
    { id: 12, name: "Sophia White", username: "sophia", image: "https://randomuser.me/api/portraits/women/12.jpg", age: 20 },
    { id: 13, name: "Alexander Harris", username: "alexander", image: "https://randomuser.me/api/portraits/men/13.jpg", age: 33 },
    { id: 14, name: "Isabella Martin", username: "isabella", image: "https://randomuser.me/api/portraits/women/14.jpg", age: 24 },
    { id: 15, name: "William Thompson", username: "william", image: "https://randomuser.me/api/portraits/men/15.jpg", age: 22 },
    { id: 16, name: "Mia Garcia", username: "mia", image: "https://randomuser.me/api/portraits/women/16.jpg", age: 28 },
    { id: 17, name: "David Rodriguez", username: "david", image: "https://randomuser.me/api/portraits/men/17.jpg", age: 26 },
    { id: 18, name: "Charlotte Martinez", username: "charlotte", image: "https://randomuser.me/api/portraits/women/18.jpg", age: 29 },
    { id: 19, name: "Ethan Lopez", username: "ethan", image: "https://randomuser.me/api/portraits/men/19.jpg", age: 25 },
    { id: 20, name: "Amelia Lee", username: "amelia", image: "https://randomuser.me/api/portraits/women/20.jpg", age: 27 },
    // Additional entries...
    { id: 21, name: "Liam Johnson", username: "liam", image: "https://randomuser.me/api/portraits/men/21.jpg", age: 33 },
    { id: 22, name: "Emma Brown", username: "emma_brown", image: "https://randomuser.me/api/portraits/women/22.jpg", age: 25 },
    { id: 23, name: "Noah Smith", username: "noah", image: "https://randomuser.me/api/portraits/men/23.jpg", age: 28 },
    { id: 24, name: "Olivia Wilson", username: "olivia_wilson", image: "https://randomuser.me/api/portraits/women/24.jpg", age: 22 },
    { id: 25, name: "William Garcia", username: "william_garcia", image: "https://randomuser.me/api/portraits/men/25.jpg", age: 31 },
    { id: 26, name: "Sophia Martin", username: "sophia_martin", image: "https://randomuser.me/api/portraits/women/26.jpg", age: 27 },
    { id: 27, name: "Mason Anderson", username: "mason", image: "https://randomuser.me/api/portraits/men/27.jpg", age: 24 },
    { id: 28, name: "Amelia Taylor", username: "amelia_taylor", image: "https://randomuser.me/api/portraits/women/28.jpg", age: 29 },
    { id: 29, name: "Henry Thomas", username: "henry", image: "https://randomuser.me/api/portraits/men/29.jpg", age: 23 },
    { id: 30, name: "Charlotte Johnson", username: "charlotte_johnson", image: "https://randomuser.me/api/portraits/women/30.jpg", age: 26 },
    { id: 31, name: "Alexander Smith", username: "alexander_smith", image: "https://randomuser.me/api/portraits/men/31.jpg", age: 29 },
    { id: 32, name: "Ava Brown", username: "ava_brown", image: "https://randomuser.me/api/portraits/women/32.jpg", age: 25 },
    { id: 33, name: "William Johnson", username: "william_johnson", image: "https://randomuser.me/api/portraits/men/33.jpg", age: 27 },
    { id: 34, name: "Mia Miller", username: "mia_miller", image: "https://randomuser.me/api/portraits/women/34.jpg", age: 22 },
    { id: 35, name: "James Garcia", username: "james_garcia", image: "https://randomuser.me/api/portraits/men/35.jpg", age: 28 },
    { id: 36, name: "Sophia Wilson", username: "sophia_wilson", image: "https://randomuser.me/api/portraits/women/36.jpg", age: 24 },
    { id: 37, name: "Oliver Johnson", username: "oliver", image: "https://randomuser.me/api/portraits/men/37.jpg", age: 30 },
    { id: 38, name: "Charlotte Smith", username: "charlotte_smith", image: "https://randomuser.me/api/portraits/women/38.jpg", age: 26 },
    { id: 39, name: "Liam Taylor", username: "liam_taylor", image: "https://randomuser.me/api/portraits/men/39.jpg", age: 29 },
    { id: 40, name: "Emma Martinez", username: "emma_martinez", image: "https://randomuser.me/api/portraits/women/40.jpg", age: 23 },
    { id: 41, name: "Noah Brown", username: "noah_brown", image: "https://randomuser.me/api/portraits/men/41.jpg", age: 27 },
    { id: 42, name: "Olivia Anderson", username: "olivia_anderson", image: "https://randomuser.me/api/portraits/women/42.jpg", age: 25 },
    { id: 43, name: "William Thomas", username: "william_thomas", image: "https://randomuser.me/api/portraits/men/43.jpg", age: 22 },
    { id: 44, name: "Sophia Martin", username: "sophia_martin", image: "https://randomuser.me/api/portraits/women/44.jpg", age: 26 },
    { id: 45, name: "Mason Taylor", username: "mason_taylor", image: "https://randomuser.me/api/portraits/men/45.jpg", age: 28 },
    { id: 46, name: "Ava Brown", username: "ava_brown", image: "https://randomuser.me/api/portraits/women/46.jpg", age: 30 },
    { id: 47, name: "William Johnson", username: "william_johnson", image: "https://randomuser.me/api/portraits/men/47.jpg", age: 24 },
    { id: 48, name: "Mia Garcia", username: "mia_garcia", image: "https://randomuser.me/api/portraits/women/48.jpg", age: 29 },
    { id: 49, name: "James Brown", username: "james_brown", image: "https://randomuser.me/api/portraits/men/49.jpg", age: 23 },
    { id: 50, name: "Emma Wilson", username: "emma_wilson", image: "https://randomuser.me/api/portraits/women/50.jpg", age: 27 }
];

const ref = useRef<null | HTMLDivElement>(null); 

  const handleScroll = (offset:number) => {
    if (ref.current) {
      ref.current.scrollLeft += offset;
    }
  }

  return (
   <div className='w-full flex justify-center relative  '>
      <div onClick={() => handleScroll(-500)} style={{ cursor: "pointer" }} className=' absolute left-3 sm:left-6 md:left-[90px] z-50 top-12 bg-white rounded-full'>
          <GrFormPrevious color='black' size={24}/>
        </div>
     <div className='flex w-[80%] overflow-x-hidden relative' ref={ref}  >
      {
        users && users.map((i,index)=>(
          <Link to={`/${i.id}`} className='flex flex-col items-center py-5 pr-4' key={index}>
            <div className=' rounded-full w-[50px] h-[50px] md:w-[80px] md:h-[80px]'>
            <img src={i.image} alt="" className=' rounded-full'/>
            </div>
            <span className='text-center text-[15px]'>{
              i.username.length>9?i.username.slice(0,9)+"...":i.username
            }</span>
          </Link>
        ))
      }
    </div>
   
        <div onClick={() => handleScroll(500)} style={{ cursor: "pointer" }} className=' absolute right-3 sm:right-6 md:right-[90px] z-50 top-12 bg-white rounded-full'>
        <MdNavigateNext color='black' size={24} />
        </div>
   </div>
  )
}

export default Header