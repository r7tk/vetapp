import { useState, useEffect } from "react";
import axios from "axios";

function Appointment() {
  const [appointmentDate, setAppointmentDate] = useState();
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState();
  const [alert, setAlert] = useState(false);

  const [newAppointmentDate, setNewAppointmentDate] = useState({
    appointmentDate: "",
    doctor: { id: "" },
    animal: { id: "", customer: { id: "" }},
    
  });

  const [updateAppointmentDate, setUpdateAppointmentDate] = useState({
    id:"",
    appointmentDate: "",
    doctor: { id: "" },
    animal: { id: "",customer: { id: "" }},
  });

  // AppointmentDate

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/appointments")
      .then((res) => {
        setAppointmentDate(res.data.content);
      })
      .catch((error) => {
        console.error(
          "Appointment verisi Alınırken Hata ile Karşılaşıldı.",
          error
        );
      });
    axios // Customers
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/customers")
      .then((res) => {
        setCustomers(res.data.content);
      });
    axios // Doctors
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/doctors")
      .then((res) => {
        
        setDoctors(res.data.content);
        
      });
    axios // Animals
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/animals")
      .then((res) => {
        setAnimals(res.data.content);
      });
  }, [update]);

  const handleNewAppointmentDateChange = (e) => {
    const { name, value } = e.target;
    const prefixes = ["doctor.", "animal."];
    const prefix = prefixes.find(p => name.startsWith(p));
    if (prefix) {
      const field = name.split(".")[1];
      const totalObj = name.split(".")[0];
      if(field.startsWith("customer")){
        setNewAppointmentDate((prev) => ({
          ...prev,
          [totalObj]:{
            ...prev[totalObj],
            [field]:{
              [name.split(".")[2]]:value
            },

          }
      }))
      }
      else{
        setNewAppointmentDate((prev) => ({
          ...prev,
          [totalObj]: {
            ...prev[totalObj],
            [field]: value,
          },
        }));
      }
    } else {
      setNewAppointmentDate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateAppointmentDateChange = (e) => {
    const { name, value } = e.target;
    const prefixes = ["doctor.", "animal."];
    const prefix = prefixes.find(p => name.startsWith(p));
    if (prefix) {
      const field = name.split(".")[1];
      const totalObj = name.split(".")[0];
      if(field.startsWith("customer")){
        setUpdateAppointmentDate((prev) => ({
          ...prev,
          [totalObj]:{
            ...prev[totalObj],
            [field]:{
              [name.split(".")[2]]:value
            },

          }
      }))
      }
      else{
        setUpdateAppointmentDate((prev) => ({
          ...prev,
          [totalObj]: {
            ...prev[totalObj],
            [field]: value,
          },
        }));
      }
    } else {
      setUpdateAppointmentDate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDeleteAppointmentDate = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/appointments/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Silme Hatası:", error);
      });
  };

  const handleAddNewAppointmentDate = () => {
    console.log(newAppointmentDate)
    axios
      .post(
        import.meta.env.VITE_APP_BASEURL + "api/v1/appointments",
        newAppointmentDate
      )
      .then(() => {
        setUpdate(!update);
        setNewAppointmentDate({
          appointmentDate: "",
          doctor: { id: "" },
          animal: { id: "",customer: { id: "" } },
          
        });
      })
      .catch((error) => {
        console.error("Ekleme Hatası: Büyük İhtimal ile Randevu zamanı uyuşmuyor Work Day kontrol Ediniz.", error);
      });
  };

  const handleUpdateAppointmentDateChangeBtn = () => {
    axios
      .put(import.meta.env.VITE_APP_BASEURL + `api/v1/appointments/${updateAppointmentDate.id}`, updateAppointmentDate)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };


  const fillUpdateAppointmentDate = (appointmentDate) => {
    setUpdateAppointmentDate({
      id: appointmentDate.id,
      appointmentDate: appointmentDate.appointmentDate,
      doctor: { id: appointmentDate.doctor.id },
      animal: { id: appointmentDate.animal.id,customer: { id: appointmentDate.animal.customer.id }},
      
    });
  };
  
  if (!appointmentDate) {
    return <p>Veri Yükleniyor Yada Ulaşılamıyor.:.</p>;
  }
 
  
  return (
    <div className="grid justify-evenly">
      <div className="flex flex-row justify-center items-center py-3 px-3">
        <h3 className=" text-justify font-bold ">Add New Appointment</h3>
        <input
          className=" border-4"
          type="datetime-local"
          name="appointmentDate"
          value={newAppointmentDate.appointmentDate}
          onChange={handleNewAppointmentDateChange}
        />
        
        {/* Doctor Select Menu */}
        
       

        <select
          name="doctor.id"
          onChange={handleNewAppointmentDateChange}
          value={newAppointmentDate.doctor.id}
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        {/* Animal Select Menu */}

        <select
          name="animal.id"
          onChange={handleNewAppointmentDateChange}
          value={newAppointmentDate.animal.id}
        >
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

          {/* Customer Select Menu */}

        <select
          name="animal.customer.id"
          onChange={handleNewAppointmentDateChange}
          value={newAppointmentDate.animal.customer.id}
          
        >
          
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>



        <button
          onClick={handleAddNewAppointmentDate}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add New Appointment Date
        </button>
      </div>

      <div className="flex flex-row justify-center items-center py-3 px-3">
        <h3 className=" text-justify font-bold ">Update Appointment</h3>
        <input
          className=" border-4"
          type="datetime-local"
          name="appointmentDate"
          value={updateAppointmentDate.appointmentDate}
          onChange={handleUpdateAppointmentDateChange}
        />
        
        {/* Doctor Select Menu */}

        <select  
          name="doctor.id" 
          onChange={handleUpdateAppointmentDateChange}
          value={updateAppointmentDate.doctor.id}
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>

        {/* Animal Select Menu */}

        <select 
          name="animal.id"
          onChange={handleUpdateAppointmentDateChange}
          value={updateAppointmentDate.animal.id}
        >
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>

          {/* Customer Select Menu */}

        <select  
          name="animal.customer.id"
          onChange={handleUpdateAppointmentDateChange}
          value={updateAppointmentDate.animal.customer.id}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <input type="hidden" name="id" value={updateAppointmentDate.id} />


        <button
          onClick={handleUpdateAppointmentDateChangeBtn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Update Appointment Date
        </button>
      </div>


<div className=" text-center font-bold text-red-700"><p>Update Appointment Kısmında sadece Tarih güncellenebiliyor.
  Work Day kısmından Müsait Günü öğrenin yada Ekleyin.</p></div>

      <hr />
      <p className=" border-lime-200 flex flex-col text-red-600">
        {newAppointmentDate.appointmentDate} <br />
        {newAppointmentDate.animal.id} - {newAppointmentDate.animal.name} <br />
        {newAppointmentDate.animal.customer.id} - {newAppointmentDate.animal.customer.name} <br />
        {newAppointmentDate.doctor.id} - {newAppointmentDate.doctor.name} <br />
        
      </p>
      <hr />

      {appointmentDate.map((apd, index) => (
        <div key={index}>
          <li className="border-lime-200 flex flex-col font-bold">
            {apd.appointmentDate} - {apd.animal.name} - {apd.animal.customer.name} - {apd.doctor.name}
            
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
              onClick={handleDeleteAppointmentDate}
              id={apd.id}
            >
              DELETE
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded"
              onClick={() => fillUpdateAppointmentDate(apd)}
              id={apd.id}
            >
              SELECT FOR UPDATE
            </button>
            <br />
            <hr />
          </li>
        </div>
        
      ))}
    </div>
    
  );
}

export default Appointment;
