import React, { useState, useEffect } from "react";
import moment from "moment";
import "../index.css";
import { Table, Container } from 'react-bootstrap';
import { MdOutlineMobileOff } from "react-icons/md";

const PrayerTimesComponent = () => {
  const [times, setTimes] = useState({
    fajr: "",
    dhuhr: "",
    asr: "",
    maghrib: "",
    isha: "",
  });

  const [date, setDate] = useState({
    readable: "",
    gregorian: "",
    hijri: "",
    month: "",
    year: "",
  });
  

  useEffect(() => {
    const today = moment().format("DD-MM-YYYY"); // Format today's date to match the API format

    const year = moment().year();
    const month = moment().month() + 1; // JavaScript months are 0-11

    fetch(
      `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=London&country=Canada&method=2`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find today's data by matching the formatted today's date with the date from the API
        const todayData = data.data.find(
          (d: any) => d.date.gregorian.date === today
        );
        if (todayData) {
          const todayTimes = todayData.timings;
          setTimes({
            fajr: todayTimes.Fajr,
            dhuhr: todayTimes.Dhuhr,
            asr: todayTimes.Asr,
            maghrib: todayTimes.Maghrib,
            isha: todayTimes.Isha,
          });
          setDate({
            readable: "",
            gregorian: "",
            hijri: `${todayData.date.hijri.day}`,
            month: `${todayData.date.hijri.month.en}`,
            year: `${todayData.date.hijri.year}`,
          });
        } else {
          // Handle case where today's date is not found in the data
          console.log("Today's date is not found in the API data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching prayer times:", error);
      });
  }, []);

  function convertTo12HrFormat(timeString : string) {
    // Split the time string by colon
    const [hours, minutes] = timeString.split(':');
    
    // Create a date object with any date, just to use the toLocaleTimeString method
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    // Convert to local 12-hour time format
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }


  return (
    <Container fluid className="bg-opacity-20 backdrop-filter w-full">
      <div className="text-black text-center font-bold text-4xl p-2" style={{ backgroundColor: '#f6dab6' }}>
        {date.hijri} {date.month} {date.year}
      </div>
      <h1 className="text-center text-4xl font-bold mb-4 pt-4" style={{ color: '#f6dab6' }}>
        Prayer Times for Islamic Centre of Southwest Ontario
      </h1>
      
      <div className="overflow-x-auto p-10">
        <Table responsive="sm" className="divide-y divide-[#f6dab6] border border-[#f6dab6]">
        <table className="min-w-full divide-y divide-[#f6dab6] border border-[#f6dab6]">
         <tbody className="bg-transparent baorder">
           {/* Fajr row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Fajr</td>
             <td className="p-4">{convertTo12HrFormat(times.fajr)}</td>
           </tr>
           {/* Dhuhr row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Dhuhr</td>
             <td className="p-4">{convertTo12HrFormat(times.dhuhr)}</td>
           </tr>
           {/* Asr row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Asr</td>
             <td className="p-4">{convertTo12HrFormat(times.asr)}</td>
           </tr>
           {/* Maghrib row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Maghrib</td>
             <td className="p-4">{convertTo12HrFormat(times.maghrib)}</td>
           </tr>
           {/* Isha row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Isha</td>
             <td className="p-4">{convertTo12HrFormat(times.isha)}</td>
           </tr>
           {/* Jumma'ah row */}
           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
             <td className="p-4 border border-[#f6dab6]">Jumma'ah</td>
             <td className="p-4">1:30 PM</td>
           </tr>
         </tbody>
       </table>      
       </Table>
      </div>
      
      <div className="bg-red-500 text-white text-center p-8 flex items-center justify-center">
        <MdOutlineMobileOff className="text-8xl mr-2" />
        <p className="text-4xl font-bold">Please Switch OFF your Mobile Phones</p>
      </div>
    </Container>
  );
};

//   return (
//     <div className="bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-xl bg-white w-full">
//       <div className="text-black text-center font-bold text-4xl p-2 bg-[#f6dab6]">
//         {date.hijri} {date.month} {date.year}
//       </div>
//       <h1 className="text-center text-4xl font-bold mb-4 pt-4 text-[#f6dab6]">
//         Prayer Times for Islamic Centre of Southwest Ontario
//       </h1>
//       <div className="overflow-x-auto p-10">
//       <table className="min-w-full divide-y divide-[#f6dab6] border border-[#f6dab6]">
//         <tbody className="bg-transparent baorder">
//           {/* Fajr row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Fajr</td>
//             <td className="p-4">{convertTo12HrFormat(times.fajr)}</td>
//           </tr>
//           {/* Dhuhr row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Dhuhr</td>
//             <td className="p-4">{convertTo12HrFormat(times.dhuhr)}</td>
//           </tr>
//           {/* Asr row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Asr</td>
//             <td className="p-4">{convertTo12HrFormat(times.asr)}</td>
//           </tr>
//           {/* Maghrib row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Maghrib</td>
//             <td className="p-4">{convertTo12HrFormat(times.maghrib)}</td>
//           </tr>
//           {/* Isha row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Isha</td>
//             <td className="p-4">{convertTo12HrFormat(times.isha)}</td>
//           </tr>
//           {/* Jumma'ah row */}
//           <tr className="text-center font-bold text-4xl text-[#f6dab6] border border-[#f6dab6]">
//             <td className="p-4 border border-[#f6dab6]">Jumma'ah</td>
//             <td className="p-4">1:30 PM</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//       <div className="bg-red-500 text-white text-center p-8 flex items-center justify-center">
//       <MdOutlineMobileOff className="text-8xl mr-2" />
//       <p className="text-4xl font-bold">Please Switch OFF your Mobile Phones</p>
//     </div>
//     </div>
//   );
// };



export default PrayerTimesComponent;
