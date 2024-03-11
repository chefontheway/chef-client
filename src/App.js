import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import SignupPage from './pages/SignUpPages';
import LoginPage from "./pages/LoginPage"
import ServiceList from "./pages/ServiceList"
import ServiceDetails from './pages/ServiceDetails';
import ReservationPage from './pages/ReservationPage';
import ConfirmationPage from "./pages/ConfirmationPage";
import ProfilePage from './pages/ProfilePage';
import AddNewService from './components/AddNewService';
import EditServicesPage from './pages/EditServicesPage';
import ReservationListPage from './pages/ReservationListPage';
import MyServicePage from './pages/MyServicePage'
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate'
import EditReviewPage from './pages/EditReviewPage';
import EditReservationPage from './pages/EditReservationPage';
import Footer from './components/Footer'
import MessagePage from './pages/MessagePage';
import MyWorkPage from './pages/MyWorkPage';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={ <HomePage/>} />
        <Route path="/services" element={ <ServiceList/> } />
        <Route path="/profile" element={ <IsPrivate> <ProfilePage /> </IsPrivate> } />
        <Route path='/services/:serviceId' element={ <ServiceDetails/> } />
        <Route path='/services/:serviceId/reserve' element={ <IsPrivate> <ReservationPage/> </IsPrivate>} />
        <Route path="/signup" element={<IsAnon> <SignupPage/> </IsAnon>} />
        <Route path="/login" element={ <IsAnon> <LoginPage/> </IsAnon> } />
        <Route path="/confirmation" element={<IsPrivate> <ConfirmationPage /> </IsPrivate>}/>
        <Route path='/create' element={<IsPrivate> <AddNewService /> </IsPrivate>} />
        <Route path='/services/edit/:serviceId' element={ <IsPrivate> <EditServicesPage /> </IsPrivate> } />
        <Route path="/reservations" element={<IsPrivate> <ReservationListPage /> </IsPrivate>} />
        <Route path="/myService" element={ <IsPrivate> <MyServicePage /> </IsPrivate>} />
        <Route path='/reviews/edit/:reviewId' element={<IsPrivate> <EditReviewPage/> </IsPrivate> }/>
        <Route path='/reservations/edit/:reservationId' element={<IsPrivate> <EditReservationPage /> </IsPrivate>} />
        <Route path='/message' element={<MessagePage />}/>
        <Route path='/mywork' element={<MyWorkPage />} />
        <Route path='/profile/edit/:userId' element={<EditProfilePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
