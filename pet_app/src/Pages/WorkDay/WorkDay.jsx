import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function WorkDay() {
  const [workDay, setWorkDay] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [update, setUpdate] = useState(false);

  const [newWorkDay, setNewWorkDay] = useState({
    workDate: "",
    doctorId: "",
  });

  const [updateWorkDay, setUpdateWorkDay] = useState({
    id: null,
    workDate: "",
    doctorId: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/available-dates")
      .then((res) => {
        setWorkDay(res.data.content);
      })
      .catch((error) => {
        console.log("Work Day verisi Alınırken Hata Oluştu:", error);
      });

    // Doctor Verisini Çek
    axios
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/doctors")
      .then((res) => {
        setDoctors(res.data.content);
      });
  }, [update]);

  // ADD

  const handleNewWorkDayChange = (e) => {
    const { name, value } = e.target;

    setNewWorkDay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE

  const handleUpdateWorkDayChange = (e) => {
    const { name, value } = e.target;

    setUpdateWorkDay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleUpdateWorkDayChangeBtn = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASEURL +
          `api/v1/available-dates/${updateWorkDay.id}`,
        updateWorkDay
      )
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  // DELETE
  const handleDeleteWorkDay = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/available-dates/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Silme hatası:", error);
      });
  };

  const handleAddNewWorkDay = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASEURL + "api/v1/available-dates",
        newWorkDay
      )
      .then(() => {
        setUpdate(!update);
        setNewWorkDay({
          workDate: "",
          doctorId: "",
        });
      })
      .catch((error) => {
        console.error("Ekleme hatası:", error);
      });
  };

  const fillUpdateWorkDay = (workDay) => {
    setUpdateWorkDay({
      workDate: workDay.workDate,
      doctorId: workDay.doctor.id,
    });
  };

  return (
    <div className="grid justify-evenly">
      <div className="flex flex-row justify-center items-center py-3 px-3">
        <h3 className=" text-justify font-bold ">Add New Work Day</h3>
        <input
          className=" border-4"
          type="date"
          name="workDate"
          value={newWorkDay.workDate}
          onChange={handleNewWorkDayChange}
        />
        <select
          name="doctorId"
          onChange={handleNewWorkDayChange}
          value={newWorkDay.doctorId}
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddNewWorkDay}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add New workDay
        </button>
      </div>
      <div className="flex flex-row justify-center items-center py-3 px-3">
        <h3 className=" text-justify font-bold ">Update Work Day</h3>
        <input
          className=" border-4"
          type="date"
          name="workDate"
          value={updateWorkDay.workDate}
          onChange={handleUpdateWorkDayChange}
        />
        <select
          name="doctorId"
          onChange={handleUpdateWorkDayChange}
          value={updateWorkDay.doctorId}
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleUpdateWorkDayChangeBtn}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Update Work Day
        </button>
      </div>
      <div>
        <p className="flex flex-row justify-center items-center py-3 px-3 border-lime-200 flex flex-col text-red-600">
          {newWorkDay.workDate} <br />
          {newWorkDay.doctorId} <br />
        </p>
      </div>
      {workDay.map((wd, index) => (
        <div key={index}>
          <li className="border-lime-200 flex flex-col font-bold">
            {wd.workDay} - {wd.doctor.id} -{wd.doctor.name}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded "
              onClick={handleDeleteWorkDay}
              id={wd.id}
            >
              DELETE
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded"
              onClick={() => fillUpdateWorkDay(wd)}
              id={wd.id}
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

export default WorkDay;
