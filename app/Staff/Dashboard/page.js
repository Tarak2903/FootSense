"use client"
import React, { useState, useEffect, useRef } from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useForm } from 'react-hook-form';
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Page = () => {
  const [file, setFile] = useState(null)
  const [lmean, setLmean] = useState(null)
  const [rmean, setRmean] = useState(0)
  const [avg, setAvg] = useState(0)
  const [chartData, setChartData] = useState([])
  const [flag, setFlag] = useState(false)
  const [submitflag, setsubmitflag] = useState(false)
  const [canvasImage, setCanvasImage] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const canvasRef = useRef(null);

  const handleFile = (e) => {
    setFile(e.target.files[0])  
  }

  const handlepdf = async () => {
    const input = document.getElementById('Jai');
    const hiddenContainer = input.parentElement;

    hiddenContainer.classList.remove('hidden');

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("Patient_Report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      hiddenContainer.classList.add('hidden');
    }
  }

  const handleData = async () => {
    const Email = watch('Email')
    const res = await fetch(`https://footsense.onrender.com/api/logfile/g?Email=${encodeURIComponent(Email)}`, { method: 'GET' })
    const data = await res.json()

    setLmean(data[0].lmean)
    setRmean(data[0].rmean)
    setAvg(data[0].avg)

    const maxValues = data[0].maxValues

    const generatedData = [
      { sensor: 'Heel', left: maxValues[0], right: maxValues[5] },
      { sensor: 'Midfoot', left: maxValues[1], right: maxValues[6] },
      { sensor: 'Forefoot', left: maxValues[2], right: maxValues[7] },
      { sensor: 'Toes', left: maxValues[3], right: maxValues[8] },
      { sensor: 'Hallux', left: maxValues[4], right: maxValues[9] }
    ]

    setChartData(generatedData)
    setFlag(true)
  }

  const handleClick = async () => {
    const Email = watch('Email')
    if (!file) {
      alert("No file uploaded")
      return
    }
    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch(`https://footsense.onrender.com/api/logfile/l?name=${encodeURIComponent(Email)}`, {
      method: "POST",
      body: fd
    })

    const data = await res.json()

    if (data.success) {
      toast('File uploaded and processed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      await handleData()
    } else {
      toast('Something went wrong', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const onSubmit = async () => {
    const Name = watch('Name')
    const Age = watch('Age')
    const Height = watch('Height')
    const Weight = watch('Weight')
    const Email = watch('Email')
    if (!validator.isEmail(Email)) {
      toast('Enter a valid email!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }
    const res = await fetch('https://footsense.onrender.com/api/logfile/lg', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name, Age, Height, Weight, Email })
    })
    const data = await res.json()
    if (data.success) {
      toast('Successfully submitted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setsubmitflag(true)
    } else {
      toast(`${data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  useEffect(() => {
    if (flag) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = '/foot_image.jpg';
      image.onload = () => {
        const desiredWidth = 400;
        const desiredHeight = 400;
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        ctx.drawImage(image, 0, 0, desiredWidth, desiredHeight);
        const points = [
          { x: 123, y: 330, value: 80 },
          { x: 270, y: 620, value: 60 },
          { x: 260, y: 200, value: 70 },
          { x: 250, y: 500, value: 40 },
          { x: 280, y: 280, value: 90 },
          { x: 460, y: 280, value: 85 },
          { x: 470, y: 180, value: 55 },
          { x: 460, y: 600, value: 65 },
          { x: 490, y: 480, value: 35 },
          { x: 610, y: 320, value: 75 },
        ];
        points.forEach(point => {
          const scaledX = point.x * (desiredWidth / 736);
          const scaledY = point.y * (desiredHeight / 736);
          ctx.beginPath();
          ctx.arc(scaledX, scaledY, 10, 0, 2 * Math.PI);
          ctx.fillStyle = point.value > 50 ? 'red' : 'green';
          ctx.fill();
        });

        
        setCanvasImage(canvas.toDataURL("image/png"));
      };
    }
  }, [flag]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0a0a23] py-10 px-4 text-white flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-[1400px] w-full">

          <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e293b] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition duration-300">
            <h2 className="text-3xl font-bold mb-6 text-center">Patient Details</h2>
            <div className="flex flex-col gap-5">
              <input {...register('Name', { required: true })} type="text" placeholder="Enter Name" className="p-3 rounded-lg bg-[#334155] focus:outline-none" />
              <input {...register('Age', { required: true })} type="number" placeholder="Enter Age" className="p-3 rounded-lg bg-[#334155] focus:outline-none" />
              <input {...register('Height', { required: true })} type="number" placeholder="Enter Height (cm)" className="p-3 rounded-lg bg-[#334155] focus:outline-none" />
              <input {...register('Weight', { required: true })} type="number" placeholder="Enter Weight (kg)" className="p-3 rounded-lg bg-[#334155] focus:outline-none" />
              <input {...register('Email', { required: true })} type="email" placeholder="Enter Email" className="p-3 rounded-lg bg-[#334155] focus:outline-none" />
              <button type="submit" className="bg-gradient-to-r from-green-400 to-teal-500 py-3 rounded-lg font-semibold hover:scale-105 transition">Submit</button>
            </div>
          </form>

          {submitflag && (
            <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col gap-6 justify-start">
              {flag && (
                <div className="mt-6 text-center bg-[#0f172a] rounded-lg p-5 text-lg font-semibold">
                  <p className='mb-3 text-xl font-bold text-yellow-400'>Pressure Summary</p>
                  <p>LMean: {lmean}</p>
                  <p>RMean: {rmean}</p>
                  <p>Avg: {avg}</p>
                </div>
              )}
              <h2 className="text-3xl font-bold text-center">Log File Upload</h2>
              <input type="file" onChange={handleFile} className="text-white" />
              <button onClick={handleClick} className="bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold hover:scale-105 transition">Submit File</button>

              {flag && (
                <div onClick={handlepdf} className="cursor-pointer bg-blue-500 text-white p-3 w-48 mx-auto text-center rounded mt-10">
                  Generate PDF Report
                </div>
              )}
            </div>
          )}

          {flag && (
            <div className="bg-[#1e293b] rounded-2xl p-8 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-6 text-center">Visualization</h2>
              <div className="bg-white p-4 rounded-lg">
                <LineChart width={400} height={250} data={chartData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="sensor" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #4b5563', padding: '10px', color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#facc15', fontWeight: 'bold' }} />
                  <Line type="monotone" dataKey="left" stroke="#8884d8" name="Left Foot" />
                  <Line type="monotone" dataKey="right" stroke="#82ca9d" name="Right Foot" />
                </LineChart>
              </div>
              <div className="mt-6"><canvas ref={canvasRef}></canvas></div>
            </div>
          )}
        </div>
      </div>
      <Footer />

<div id="Jai" className="flex flex-col justify-between mx-auto" 
     style={{ width: "794px", height: "1123px", backgroundColor: '#ffffff', color: '#000000', padding: '20px', boxSizing: 'border-box' }}>
  
  {/* Header */}
  <div className="w-full font-bold flex justify-center items-center text-4xl mb-6" 
       style={{ backgroundColor: '#2c3e50', color: '#ffffff', height: '90px', borderRadius: '8px' }}>
    Foot Sense Patient Report
  </div>

  {/* Patient Info */}
  <div className="flex justify-between border border-black p-5 mb-6 rounded" style={{ minHeight: '130px' }}>
    <div className="flex flex-col justify-between">
      <div><b>Name:</b> {watch('Name')}</div>
      <div><b>Age:</b> {watch('Age')}</div>
      <div><b>Email:</b> {watch('Email')}</div>
    </div>
    <div className="flex flex-col justify-between text-right">
      <div><b>Height:</b> {watch('Height')} cm</div>
      <div><b>Weight:</b> {watch('Weight')} kg</div>
      <div><b>Date:</b> Today</div>
    </div>
  </div>

  {/* Charts and Visualization */}
  <div className="flex justify-between mb-6" style={{ flexGrow: 1 }}>
    <div style={{ border: '1px solid #000', padding: '5px', borderRadius: '8px', width: '48%' }}>
      <LineChart width={330} height={250} data={chartData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="sensor" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #4b5563', padding: '10px', color: '#fff', fontSize: '12px' }}
          labelStyle={{ color: '#facc15', fontWeight: 'bold' }} />
        <Line type="monotone" dataKey="left" stroke="#8884d8" name="Left Foot" />
        <Line type="monotone" dataKey="right" stroke="#82ca9d" name="Right Foot" />
      </LineChart>
    </div>

    <div style={{ border: '1px solid #000', padding: '5px', borderRadius: '8px', width: '48%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {canvasImage && <img src={canvasImage} alt="Foot Visualization" style={{ width: '90%', height: 'auto' }} />}
    </div>
  </div>

  {/* Summary */}
  <div className="border border-black rounded p-5 mb-6" style={{ flexShrink: 0, minHeight: '230px' }}>
    <div style={{ marginBottom: '15px', fontWeight: 'bold' }}>Analysis Summary</div>
    <div><b>Average Pressure:</b> Avg</div>
    <div><b>Foot Type:</b> _____________________</div>
    <div><b>Observation:</b> _____________________</div>
    <div><b>Recommendations:</b> _____________________</div>
  </div>

  {/* Footer */}
  <div className="text-center text-xs text-gray-500">
    © 2025 Foot Sense Technologies Pvt Ltd. All rights reserved.
  </div>
</div>

      

    </>
  )
}

export default Page
