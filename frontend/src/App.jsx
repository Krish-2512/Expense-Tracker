import {BrowserRouter,Route,Routes} from 'react-router-dom';
import HeroSection from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import RegistrationForm from './components/Users/Register';

import LoginForm from './components/Users/Login';
import getUserFromStorage from './utils/getUserFromStorage';
import { useSelector } from 'react-redux';
import { UserMinusIcon } from '@heroicons/react/24/outline';
import AddCategory from './components/Category/AddCategory';
import CategoriesList from './components/Category/CategoriesList';
import UpdateCategory from './components/Category/UpdateCategory';
import TransactionForm from './components/Transactions/TransactionForm';
import Dashboard from './components/Users/Dashboard';
import UserProfile from './components/Users/UserProfile';






function App() {
  const token = getUserFromStorage()                                  
  console.log(token)
 // const user = useSelector(state=>console.log(state?.auth.user))
 const user = useSelector(state=>state?.auth?.user)
 console.log(user)
  return (
    <>
     
     <BrowserRouter>

     {user?<PrivateNavbar/>:<PublicNavbar/>}
     
     <Routes>
      <Route path='/' element={<HeroSection/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<RegistrationForm/>}/>
      <Route path='/add-category' element={<AddCategory/>}/>
      <Route path='/categories' element={<CategoriesList/>}/>
      <Route path='/update-category/:id' element={<UpdateCategory/>}/>
      <Route path='/add-transaction' element={<TransactionForm/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
     </Routes>
     
     </BrowserRouter>
    </>
  )
}

export default App
