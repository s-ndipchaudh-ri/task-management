import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppProvider } from './AppContext';
import AuthPage from './pages/Auth';
import TaskList from './pages/TaskList';

function App() {
  return (
    <AppProvider>
    <div className="App">
    <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/tasks" element={<TaskList/>} />
          
        </Routes>
      </Router>
    </div>
    </AppProvider>
  );
}

export default App;
