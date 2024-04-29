import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="list" element={<Table />} />
      </Routes>
    </Router>
  );
}
