const React = require('react');
const { createRoot } = require('react-dom/client');
const App = require('./App.jsx');
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);