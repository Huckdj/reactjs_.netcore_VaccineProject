import PublicRoute from './Route/PublicRoute';
import './App.css';
import PrivateRoute from './Route/PrivateRoute';


function App() {
  return (
    <>
      <PublicRoute/>
      <PrivateRoute />
    </>
  );
}

export default App;
