import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './App.css'
import FrontPage from './pages/FrontPage'

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<FrontPage />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {

  return <RouterProvider router={router} />;
}

export default App
