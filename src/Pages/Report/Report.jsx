import { useState, useEffect } from "react";
import axios from "axios";

function Report() {
  const [report, setReport] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState([]);
  const [update, setUpdate] = useState();

  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });

  const [updateReport, setUpdateReport] = useState({
    id: "",
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });

  useEffect(() => {
    axios // REPORT
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/reports")
      .then((res) => {
        setReport(res.data.content);
        console.log(setReport)

      })
      .catch((error) => {
        console.log(setReport);
        console.error(
          "Report Verisi Alınırken Bir Hata ile Karşılaşıldı.",
          error
        );
      });
    axios // APPOINTMENT
      .get(import.meta.env.VITE_APP_BASEURL + "api/v1/appointments")
      .then((res) => {
        setAppointmentDate(res.data.content);
      });
  }, [update]);

  const handleNewReportChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateReportChange = (e) => {
    const { name, value } = e.target;

    setUpdateReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE

  const handleUpdateReportChangeBtn = () => {
    axios
      .put(
        import.meta.env.VITE_APP_BASEURL + `api/v1/reports/${updateReport.id}`,
        updateReport
      )
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  //DELETE

  const handleDeleteReport = (e) => {
    const id = e.target.id;
    axios
      .delete(import.meta.env.VITE_APP_BASEURL + `api/v1/reports/${id}`)
      .then(() => setUpdate(!update))
      .catch((error) => {
        console.error("Silme hatası:", error);
      });
  };

  // ADD

  const handleAddNewReport = () => {
    axios
    .post(import.meta.env.VITE_APP_BASEURL + "api/v1/appointments",newReport)
    .then(() => {
      setUpdate(!update);
      setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointmentId: "",
      });
    })
    .catch((error) => {
      console.log("Ekleme Hatası:", error);
    });
  };

  const fillUpdateReport = (report) => {
    setUpdateReport({
      id: report.id,
      title: report.title,
      diagnosis: report.diagnosis,
      price :report.price,
      appointmentId : report.appointment.id,
    })
  }

  

  if (!appointmentDate) {
    return <p>Veri Yükleniyor Yada Ulaşılamıyor.:.</p>;
  }

  return <div className="grid justify-evenly"> 
  <input type="hidden" name="id" value={updateReport.id} />
  <h3 className=" text-justify font-bold ">NEW Add Report</h3>
        <input
          className=" border-4"
          type="text"
          placeholder="Title"
          name="title"
          value={newReport.title}
          onChange={handleNewReportChange}
        />
         <input
          className=" border-4"
          type="text"
          placeholder="Diagnosis"
          name="diagnosis"
          value={newReport.diagnosis}
          onChange={handleNewReportChange}
        />
         <input
          className=" border-4"
          type="text"
          placeholder="Price $ or €"
          name="price"
          value={newReport.price}
          onChange={handleNewReportChange}
        />
        <select
          name="appointmentId"
          onChange={handleNewReportChange}
          value={newReport.appointmentId}
        >
          {appointmentDate.map((app) => (
            
            <option key={app.id} value={app.id}>
              {app.appointmentDate}            
            </option>
          ))}
        </select>
        <button
          onClick={handleAddNewReport}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Add New Report
        </button>
            <div className="text-red-700 font-extrabold">
              <p>ID yollamama rağmen internal 500 hatası aldığımdan tamamlayamadım.</p>
            </div>
        <hr />
      <p className=" border-lime-200 flex flex-col text-red-600">
        {newReport.title} <br />
        {newReport.diagnosis}  <br />
        {newReport.price} <br />
        {newReport.appointmentId} <br />
        
        
      </p>
      <hr />
  </div>;
}

export default Report;
