import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
import AuthCard from './components/AuthCard'
import QueenBee from './components/QueenBee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthCard />} />
        <Route path="/queen" element={<QueenBee/>}/>
        {/* <Route path="/login" element={<LoginForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
