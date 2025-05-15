import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipes';
import LoginPage from './pages/Login.tsx';
import RegisterPage from './pages/Register.tsx';
import NavBar from './components/NavBar';
import SubmitRecipePage from './pages/SubmitRecipe';



export default function App() {
    return (
        <div className={"app-container"} style={
            {height:"100vh",
                width:"100%",
                position:"fixed", top:"0", left:"0",
                backgroundImage:`url('https://plus.unsplash.com/premium_photo-1674815329718-e1967af880f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHdlYnNpdGUlMjBiYWNrZ3JvdW5kJTIwa2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D')`,backgroundSize:"cover",}}  >
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/submit-recipe" element={<SubmitRecipePage />} />
            </Routes>
        </Router>
        </div>
    );
}
