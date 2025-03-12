import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './App.css'
import FrontPage from './pages/FrontPage/FrontPage.jsx'
import CharSheet from './pages/CharSheet/CharSheet.jsx';
import CreateChar from './pages/CreateChar/CreateChar.jsx';
import DiceRoller from './pages/DiceRoller/DiceRoller.jsx';

const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path="/" element={<FrontPage />} />
    <Route path="/CreateChar" element={<CreateChar />} />
    <Route path="/CharSheet" element={<CharSheet />} />
    <Route path="/DiceRoller" element={<DiceRoller />} />
  </Route>
);

const router = createBrowserRouter(routeDefinitions);

function App() {

  return <RouterProvider router={router} />;
}

export default App
