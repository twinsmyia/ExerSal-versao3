import { Routes, Route } from "react-router-dom";
import Turma from './pages/Turma/Turma';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <Layout props={{}}>
      <Routes>
        <Route exact path="/"/>
        <Route path="/turma" element={< Turma/>} />
      </Routes>
    </Layout>
  );
}

export default App;

