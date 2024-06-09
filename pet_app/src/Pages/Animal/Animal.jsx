import { useState, useEffect } from "react";
import axios from "axios";

function Animal() {
  const [animal, setAnimal] = useState();
  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: {id:""},
  });

  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer: {id:""},
  });

  useEffect(() => {
    // Customers verisini çek
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/customers")
      .then((res) => {
        setCustomers(res.data.content);
      })
      .catch((error) => {
        console.error("Müşteriler verisi alınırken hata oluştu:", error);
      });

    // Animals verisini çek
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/animals")
      .then((res) => {
        setAnimal(res.data);
      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
  }, [update]);


  //TODO : BURADAN İTİBAREN UPDATE İÇİN YAP.
  
  const handleNewAnimalChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("customer.")){
      const field = name.split(".")[1]
      setNewAnimal((prev) => ({
        ...prev,
        customer:{
          ...prev.customer,
          [field]:value,
        }
      }));
    }  
    else {
      setNewAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdateAnimalChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("customer.")){
      const field = name.split(".")[1]
      setUpdateAnimal((prev) => ({
        ...prev,
        customer:{
          ...prev.customer,
          [field]:value,
        }
      }));
    }  
    else {
      setUpdateAnimal((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };



  // const handleUpdateAnimalChange = (e) => {
  //   const { name, value } = e.target;
  //   setUpdateAnimal((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleUpdateAnimalChangeBtn = () => {
    axios
      .put(import.meta.env.VITE_APP_BASEURL + `api/v1/animals/${updateAnimal.id}`, updateAnimal)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  const handleDeleteAnimal = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/animals/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Silme hatası:", error);
      });
  };

  const handleAddNewAnimal = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "api/v1/animals", newAnimal)
      .then(() => {
        setUpdate(!update);
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          colour: "",
          dateOfBirth: "",
          customer: {id:""},
        });
      })
      .catch((error) => {
        console.error("Ekleme hatası:", error);
      });
  };

  const fillUpdateAnimal = (animal) => {
    setUpdateAnimal({
      id: animal.id,
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,
      customer: {id:animal.customer.id},
    });
  };

  if (!animal || !animal.content) {
    return <p>Veri Yükleniyor yada Ulaşılamıyor...</p>;
  }

  return (
    <div className="grid justify-evenly">
      <div className="flex flex-row justify-center items-center py-3 px-3">
        <h3 className=" text-justify font-bold ">Add New Animal</h3>
        <input
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Species"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Breed"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Gender"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Colour"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimalChange}
        />
        <input
          className=" border-4"
          type="date"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimalChange}
        />
        <select
          name="customer.id"
          onChange={handleNewAnimalChange}
          value={newAnimal.customer.id}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddNewAnimal}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add New Animal
        </button>
      </div>

      <div className="flex flex-row justify-center items-center">
        <h3>Update Animal</h3>
        <input
          className=" border-4"
          type="text"
          placeholder="Name"
          name="name"
          value={updateAnimal.name}
          onChange={handleUpdateAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Species"
          name="species"
          value={updateAnimal.species}
          onChange={handleUpdateAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Breed"
          name="breed"
          value={updateAnimal.breed}
          onChange={handleUpdateAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Gender"
          name="gender"
          value={updateAnimal.gender}
          onChange={handleUpdateAnimalChange}
        />
        <input
          className=" border-4"
          type="text"
          placeholder="Colour"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalChange}
        />
        <input
          className=" border-4"
          type="date"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalChange}
        />
        <input type="hidden" name="id" value={updateAnimal.id} />


        <select
          name="customer.id"
          onChange={handleUpdateAnimalChange}
          value={updateAnimal.customer.id}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>


        <button
          onClick={handleUpdateAnimalChangeBtn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Update Animal
          
        </button>
        
      </div>

      <hr />
      <p className=" border-lime-200 flex flex-col text-red-600">
        {newAnimal.name} <br />
        {newAnimal.species} <br />
        {newAnimal.breed} <br />
        {newAnimal.gender} <br />
        {newAnimal.colour} <br />
        {newAnimal.dateOfBirth} <br />
        {newAnimal.customer.id} <br />
      </p>
      <hr />

      {animal.content.map((ani, index) => (
        <div key={index}>
          <li className="border-lime-200 flex flex-col font-bold">
            {ani.name} - {ani.species} - {ani.breed} - {ani.gender} - {ani.colour} - {ani.dateOfBirth} - {ani.customer.name}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
              onClick={handleDeleteAnimal}
              id={ani.id}
            >
              DELETE
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded"
              onClick={() => fillUpdateAnimal(ani)}
              id={ani.id}
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

export default Animal;

// appointmentDate: appointmentDate,
//       doctor: { id: appointmentDate.doctor.id },
//       animal: { id: appointmentDate.animal.id },
//       customer: { id: appointmentDate.customer.id },