import { useState, useEffect } from "react";
import axios from "axios";

function Doctor() {
  const [doctor, setDoctor] = useState();
  const [update, setUpdate] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [updateDoctor, setUpdateDoctor] = useState({
    id:"",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/doctors")
      .then((res) => {
        setDoctor(res.data);
        setUpdate(true);
      })
      .catch((error) => {
        console.error("Datayı Fetch Etmekte Problem var", error);
      });
  }, [update]);

  const handleNewDoctorChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorChangeBtn = () => {
    const { id } = updateDoctor.id;
    console.log(updateDoctor);
    axios
      .put(
        import.meta.env.VITE_APP_BASEURL + `api/v1/doctors/${id}`,
        updateDoctor
      )
      .then((res) => console.log(res))
      .then(setUpdate(false));
    setUpdateDoctor({ ...updateDoctor });
  };

  const handleDeleteDoctor = (e) => {
    const { id } = e.target;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/doctors/${id}`)
      .then(() => setUpdate(false));
  };

  const handleAddNewDoctor = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "api/v1/doctors", newDoctor)
      .then((res) => console.log(res))
      .then(setUpdate(false))
      .then(() =>
        setNewDoctor({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const fillUpdateDoctor = (doctor) => {
    setUpdateDoctor({
      id: doctor.id,
      name: doctor.name,
      phone: doctor.phone,
      email: doctor.email,
      address: doctor.address,
      city: doctor.city,
    });
  };

  if (!doctor || !doctor.content) {
    return <p>Veriye Yükleniyor Eğer Sayfa Yüklenmezse Sayfayı Yenileyin...</p>;
  }

  return (
    <div>
      <h3 className=" text-center">Add New Doctor</h3>
      <div className="flex flex-col px-2 py-3 gap-2 justify-items-stretch">
        <input
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={newDoctor.name}
          onChange={handleNewDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={newDoctor.phone}
          onChange={handleNewDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="E-Mail"
          name="email"
          value={newDoctor.email}
          onChange={handleNewDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Address"
          name="address"
          value={newDoctor.address}
          onChange={handleNewDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="City"
          name="city"
          value={newDoctor.city}
          onChange={handleNewDoctorChange}
        />
        <button
          onClick={handleAddNewDoctor}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add Doctor
        </button>
      </div>

      {/* Update Kısmı alt tarafta */}
      <h3 className=" text-center">Add New Doctor</h3>
      <div className="flex flex-col px-2 py-3 gap-2 justify-items-stretch">
        <input
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={updateDoctor.name}
          onChange={handleUpdateDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={updateDoctor.phone}
          onChange={handleUpdateDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="E-Mail"
          name="email"
          value={updateDoctor.email}
          onChange={handleUpdateDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Address"
          name="address"
          value={updateDoctor.address}
          onChange={handleUpdateDoctorChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="City"
          name="city"
          value={updateDoctor.city}
          onChange={handleUpdateDoctorChange}
        />
        <input type="hidden" name="id" value={updateDoctor.id} />
        <button
          onClick={handleUpdateDoctorChangeBtn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Update Doctor
        </button>

        
      </div>
      <div
        id="table"
        className="grid grid-flow-col-dense justify-items-center gap-1 px-2 py-3 border-4"
      >
        <div>
          <p>Doctor Name</p> {newDoctor.name}
        </div>
        <div>
          <p>Doctor's Phone Number</p> {newDoctor.phone}
        </div>
        <div>
          <p>Doctor's E-Mail</p> {newDoctor.email}
        </div>
        <div>
          <p>Doctor's Adress</p>
          {newDoctor.address}
        </div>
        <div>
          <p>Doctor's City</p> {newDoctor.city}
        </div>
      </div>
      <hr />
      <div className=" px-10 py-5">
        {doctor?.content.map((doc, index) => (
          <div key={index}>
            <li className="border-lime-200 flex flex-col font-bold">
              {doc.name} - {doc.phone} - {doc.email} - {doc.address} -
              {doc.city} -
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
                onClick={handleDeleteDoctor}
                id={doc.id}
              >
                DELETE
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded"
                onClick={() => fillUpdateDoctor(doc)}
                id={doc.id}
              >
                SELECT FOR UPDATE
              </button>
              <br />
              <hr />
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctor;
