import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';
import { WeightProvider } from './contexts/WeightProvider';
import { ConfigProvider } from './contexts/ConfigProvider';
import { ActivityProvider } from './contexts/ActivityProvider';
import { DietProvider } from './contexts/DietProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { API_URL } from './api';

function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <WeightProvider>
          <ActivityProvider>
            <DietProvider>
             <BrowserRouter>
               <Nav/>
              </BrowserRouter>
            </DietProvider>
          </ActivityProvider>
        </WeightProvider>
      </ConfigProvider>
    </AuthProvider>
  )
}

export default App;