import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateInterview from "./pages/CreateInterview";
import ChatInterview from "./pages/ChatInterview";
import ScoreResult from "./pages/ScoreResult";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateInterview />} />
        <Route path="/chat/:id" element={<ChatInterview />} />
        <Route path="/score/:id" element={<ScoreResult />} />

        <Route path="*" element={<div>404 Not Found - 页面走丢了</div>} />
      </Routes>
    </BrowserRouter>
  );
}
