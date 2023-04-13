import Layout from "./Components/Layout";
import "./App.css";
import { MainRoutes } from "./Components/Routes/routes";
import Navbar from "./Components/Ui/Navbar";

function App() {
  return (
    <div className="App">
      <div className="dashboard-page">
        <Layout>
          <Navbar />
          <div className="dash-container">
            <MainRoutes />
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default App;
