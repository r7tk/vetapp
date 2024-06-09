import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Animal from "./Pages/Animal/Animal";
import Customer from "./Pages/Customer/Customer";
import Appointment from "./Pages/Appointment/Appointment";
import Doctor from "./Pages/Doctor/Doctor";
import Report from "./Pages/Report/Report";
import Vaccination from "./Pages/Vaccination/Vaccination";
import WorkDay from "./Pages/WorkDay/WorkDay";
import Navbar from "./Component/Navbar";

function App() {
  return(
  <>
    <Navbar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/animal" element={<Animal />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/vaccination" element={<Vaccination />} />
      <Route path="/workday" element={<WorkDay />} />
    </Routes>
  </>
  );
}

export default App;
