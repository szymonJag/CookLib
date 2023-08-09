import GlobalStyles from './styles/GlobalStyles';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Search from './pages/Search';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import AddRecipe from './pages/AddRecipe';
import User from './pages/User';
import Admin from './pages/Admin';
import PageNotFound from './pages/PageNotFound';
// import Error from './ui/Error';
// import Search from './pages/Search';
// import { MainLayout } from './ui/AppLayout';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Navigate replace to='recipes' />} />
            <Route path='search' element={<Search />} />
            <Route path='recipes' element={<Recipes />} />
            <Route path='recipes/:recipeId' element={<Recipe />} />
            <Route path='add-recipe' element={<AddRecipe />} />
            <Route path='user' element={<User />} />
            <Route path='admin' element={<Admin />} />
            <Route path='recipes' element={<Recipes />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
