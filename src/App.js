import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
