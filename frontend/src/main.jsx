import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import PostContextProvider from './contexts/PostContextProvider.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
      <PostContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </PostContextProvider>
    </UserContextProvider>,
);
