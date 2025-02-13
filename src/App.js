import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Stream from './components/Streamii';
import ViewStreams from './components/ViewStream';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Live Streaming App</h1>
      <h4>Using Stream SDk</h4>
      <h3>Ola Owo</h3>
      <div className="button-container">
        <Link to="/stream">
          <button className="action-button">Start Streaming</button>
        </Link>
        <Link to="/view-videos">
          <button className="action-button">View Uploaded Videos</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/view-videos" element={<ViewStreams />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;