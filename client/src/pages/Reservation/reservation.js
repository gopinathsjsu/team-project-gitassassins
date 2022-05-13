import React, { useEffect, useState} from 'react';
import axios from "axios";


import ReservationItem from './ReservationItem';

import "./reservation.css";


export default function Reservation() {

  const [reservations, setReservations] = useState([]);

  useEffect(() => {

    //axios.get(`${endPointObj.url}/job-seeker/get-company-photos/${companyId}`)
    axios.get("http://localhost:3001/reservation/customer/fetchAll/626e4ef69f02707335d0c4d2")
      .then(response => {
        console.log("Reservations by customer", response.data);
        setReservations(response.data);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log("Error", err.response);
        }
      });
  }, [])



  return (
    <>

      {reservations.map((item, i) => (
        <ReservationItem key={i} item = {item} />
       
      )
      )
      }
    </>
  );
}
