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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { IngredientsProvider } from './contexts/IngredientsCartContext';
import { UserProvider } from './contexts/UserContext';

// import Error from './ui/Error';
// import Search from './pages/Search';
// import { MainLayout } from './ui/AppLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <BrowserRouter>
        <UserProvider>
          <IngredientsProvider>
            <Routes>
              <Route path='/' element={<AppLayout />}>
                <Route index element={<Navigate replace to='recipes' />} />
                <Route path='search' element={<Search />} />
                <Route path='recipes' element={<Recipes />} />
                <Route path='recipes/:recipeId' element={<Recipe />} />
                <Route path='add-recipe' element={<AddRecipe />} />
                <Route path='edit-recipe/:recipeId' element={<AddRecipe />} />
                <Route path='user' element={<User />} />
                <Route path='admin' element={<Admin />} />
                {/* <Route path='/admin/edit/product/:productId' element={<Admin />} /> */}
                <Route path='recipes' element={<Recipes />} />
                <Route path='/error' element={<PageNotFound />} />
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Routes>
          </IngredientsProvider>
        </UserProvider>
      </BrowserRouter>

      <Toaster
        position='bottom-left'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
