import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { MainPage } from './pages/main-page';
export function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
