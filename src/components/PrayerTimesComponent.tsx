import React, { useState, useEffect } from "react";
import moment from "moment";
import "../index.css";
import { Table, Container } from "react-bootstrap";
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
      `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=London&country=Canada&method=2`
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

  function convertTo12HrFormat(timeString: string) {
    // Split the time string by colon
    const [hours, minutes] = timeString.split(":");

    // Create a date object with any date, just to use the toLocaleTimeString method
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    // Convert to local 12-hour time format
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <Container fluid className="">
      <div
        className="text-black text-center font-bold sm:text-4xl md:text-5xl lg:text-7xll p-2"
        style={{ backgroundColor: "#f6dab6" }}
      >
        {date.hijri} {date.month} {date.year}
      </div>
      <h1
        className="text-center sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 pt-4"
        style={{ color: "#f6dab6" }}
      >
        Prayer Times for Islamic Centre of Southwest Ontario
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#f6dab6] border border-[#f6dab6] bg-transparent">
          <tbody className="bg-transparent">
            {/* Rows */}
            {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumma'ah"].map(
              (prayer, index) => (
                <tr
                  key={index}
                  className="text-center font-bold sm:text-4xl md:text-5xl lg:text-7xl text-[#f6dab6] border border-[#f6dab6]"
                >
                  <td className="sm:p-3 md:p-4 border border-[#f6dab6]">
                    {prayer}
                  </td>
                  <td className="p-2 sm:p-3 md:p-4">
                    {prayer !== "Jumma'ah"
                      ? convertTo12HrFormat(
                          times[prayer.toLowerCase() as keyof typeof times]
                        )
                      : "1:30 PM"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-red-500 text-white text-center p-8 flex items-center justify-center">
        <MdOutlineMobileOff className="text-8xl mr-2" />
        <p className="p-4 sm:text-4xl md:text-5xl lg:text-5xl font-bold">
          Please Switch OFF your Mobile Phones
        </p>
      </div>
    </Container>
  );
};


export default PrayerTimesComponent;
