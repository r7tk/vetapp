import { useState, useEffect } from "react";
import axios from "axios";

// ÖĞRENMEK ADINA APP.JSX İÇİNE TOPLADIK CUSTOMER İÇİN COMPONENTE TAŞINACAK


// BAŞLANGIÇTA FALSE VERMEMİZİN SEBEBİNİ TAM BİLMİYORUM. ANCAK BÜTÜN DATAYI SİTE YÜKLENİRKEN GETİRMEK MANTIKLI DEĞİL ...


function Customer() {
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/customers")
      .then((res) => {
        setCustomer(res.data);
        setUpdate(true);

        // console.log(res.data); // Veriyi doğru şekilde logluyoruz
      })
      // .then(() => setUpdate(true))

      .catch(() => {
        setAlert(true)
        setTimeout(() =>{
          setAlert(false);
        }, 3000);
      });
      setUpdate(true);
  }, [update]);

  const handleNewCustomChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE İŞLEMİ

  const handleUpdateCustomChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE İŞLEMİ
  const handleUpdateCustomChangeBtn = () => {
    const { id } = updateCustomer.id;
    console.log(updateCustomer);
    axios
      .put(
        import.meta.env.VITE_APP_BASEURL +
          `api/v1/customers/${updateCustomer.id}`,
        updateCustomer
      )
      .then((res) => console.log(res))
      .then(setUpdate(false));
    setUpdateCustomer({ ...updateCustomer });
  };

  // DELETE İŞLEMİ
  const handleDeleteCustomer = (e) => {
    const { id } = e.target;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/customers/${id}`)
      .then(() => setUpdate(false));
  };

  // POST İŞLEMİ
  const handleAddNewCustomer = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "api/v1/customers", newCustomer)
      .then((res) => console.log(res))
      .then(setUpdate(false))
      .then(() =>
        setNewCustomer({
          // FALSE KONUMUNA GEÇİNCE İNPUTLARIN İÇİNİ SIFIRLAMIŞ OLUYORUZ. KULLANICI EXPERIENCE İÇİN
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  // update input doldurur Metod
  const fillUpdateCustomer = (customer) => {
    setUpdateCustomer({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
    });
  };

  if (!customer || !customer.content) {
    return <p>Veri Yükleniyor yada Ulaşılamıyor...</p>; // Veri yüklenirken gösterilecek mesaj
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h3>Add New Customer</h3>
        <input 
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomChange}
        />
      
        <input
          className=" border-4"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="E-Mail"
          name="email"
          value={newCustomer.email}
          onChange={handleNewCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Address"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="City"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomChange}
        />
        <button
          onClick={handleAddNewCustomer}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add New Customer
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h3>Update Customer</h3>
        <input
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="E-Mail"
          name="email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Address"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="City"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomChange}
        />

        <input type="hidden" name="id" value={updateCustomer.id} />

        <button
          onClick={handleUpdateCustomChangeBtn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Update Customer
        </button>
      </div>

      <hr />
      <p className=" border-lime-200 flex flex-col text-red-600">
        {newCustomer.name} <br />
        {newCustomer.phone} <br />
        {newCustomer.email} <br />
        {newCustomer.address} <br />
        {newCustomer.city} <br />
      </p>
      <hr />

      {customer?.content.map((cust, index) => (
        <div key={index}>
          <li className="border-lime-200 flex flex-col font-bold">
            {cust.name} - {cust.phone} - {cust.email} - {cust.address} -{" "}
            {cust.city} -{" "}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
              onClick={handleDeleteCustomer}
              id={cust.id}
            >
              DELETE
            </button>{" "}
            -{" "}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded"
              onClick={() => fillUpdateCustomer(cust)}
              id={cust.id}
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

export default Customer;


// id: animal.id,
// name: animal.name,
// species: animal.species,
// breed: animal.breed,
// gender: animal.gender,
// colour: animal.colour,
// dateOfBirth: animal.dateOfBirth,
// costumerId: animal.costumer.id,