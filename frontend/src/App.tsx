import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipes';
import LoginPage from './pages/Login.tsx';
import RegisterPage from './pages/Register.tsx';
import NavBar from './components/NavBar';
import SubmitRecipePage from './pages/SubmitRecipe';



export default function App() {
    return (
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
    );
}
