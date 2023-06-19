import { render } from 'solid-js/web';
import { Router, Routes } from '@solidjs/router';
import './index.css';
import App from './App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Did you forget to add it to your index.html?');
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root
);
