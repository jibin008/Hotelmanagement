import { useState } from 'react'


import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


// import Error from "./pages/Error";
// import Bookings from "./Components/bookings";
import ProtectedRoute from "./components/ProtectedRoutes";
import { UserAuthContextProvider } from "./Context/UserAuthContext";


import Home from './screens/Home/Home'
import About from './screens/About/About'
import Contact from './screens/Contact/Contact'
import Rooms from './screens/Rooms/Rooms'
// import Bookings from './screens/Bookings/Booking'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import SingleRoom from "./screens/Rooms/SingleRoom";
import Booknow from './components/Booking/Booknow'
import MyBookings from './components/Booking/MyBookings'
import Admin from './screens/Admin/Admin_Dashboard'
// import EditRoom from './components/EditRoom'
import './App.css'
import Review from './screens/Review/Review';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <UserAuthContextProvider>
          <Navbar/>
          <Routes>

            <Route path="/" index element={<Home/>} />

            <Route path="/admin" index element={<Admin/>}/>
            

            <Route path="/rooms" element={<Rooms/>} />

            <Route path="/about" element={<About />} />
           
            {/* <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  {" "}
                  <Bookings />{" "}
                </ProtectedRoute>
              }
            /> */}

            { <Route
              path="/booknow/:roomType"
              element={
                <ProtectedRoute>
                  <Booknow />
                </ProtectedRoute>
              }
            /> }
            
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/singleRoom/:roomType" element={<SingleRoom />} />
            <Route path="/mybookings" element={<MyBookings/>} />
            <Route path="/review" element={<Review />} />
            {/* <Route path="/editroom/:room_id" element={<EditRoom/>}/> */}
            
            
            {/* <Route path="/navbar/:loguser" element={<Navbar/>}/> */}
            {/* <Route path="*" element={<Error />} /> */}
          </Routes>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
