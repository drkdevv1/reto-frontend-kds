import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';
import { KitchenDisplay } from './pages/kitchen-display/KitchenDisplay';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <KitchenDisplay />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
