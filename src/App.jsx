import Protect from "./component/Protect";
import ProtectedRoute from "./component/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Application, Blog, Career, Dashboard, Investor, Login, Subscribers, Team } from "./pages";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/" 
          element={
            <Protect>
              <ProtectedRoute />
            </Protect>
          }>
          <Route path="/overview" element={<Dashboard />} />
          <Route path="/investors" element={<Investor />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/subscribers" element={<Subscribers />} />
          <Route path="/career" element={<Career />} />
          <Route path="/application" element={<Application />} />
          <Route path="/team" element={<Team />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
