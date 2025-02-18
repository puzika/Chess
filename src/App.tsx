import { Routes, Route } from "react-router-dom";
import HomeRoute from "./routes/home-route/home-route.component";
import HomeContent from "./components/home-content/home-content.component";
import ComputerRoute from "./routes/computer-route/computer-route.component";
import AnalysisRoute from "./routes/analysis-route/analysis-route.component";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />}>
        <Route index element={<HomeContent />} />
        <Route path="computer" element={<ComputerRoute />} />
        <Route path="analysis" element={<AnalysisRoute />} />
      </Route>
    </Routes>
  )
}