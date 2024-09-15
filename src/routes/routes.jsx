import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from '../components/navbar/navbar';
import { CardList } from '../views/cardlist';
import { ChangePass } from '../views/changePass';
import { CreateJob } from '../views/createJob';
import { CardsDetail } from '../views/cardsDetail';
import PageNotFound from '../views/404page';
import { Footer } from '../components/footer/footer';
import Login from '../views/login';
import Register from '../views/register';
import { EditJob } from '../views/editJob';
import LandingPage from '../views/landingPage';

export function AppRouter(){
    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path="/change-password" element={<ChangePass/>}/>

                <Route path="/job-list" element={<CardList/>}/>
                <Route path="/create-job" element={<CreateJob/>}/>
                <Route path='/job/:id' element={<CardsDetail/>}/>
                <Route path='/edit/:id' element={<EditJob/>}/>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer/>
        </Router>
    )
}