import React, { useEffect, useState} from 'react';
import axios from "axios";


import ReservationItem from './ReservationItem';

import "./reservation.css";


export default function Reservation() {

  const [reservations, setReservations] = useState([]);
  const [reservationByIds, setReservationByIds] = useState({});

  useEffect(() => {

    //axios.get(`${endPointObj.url}/job-seeker/get-company-photos/${companyId}`)
    axios.get("/reservation/customer/fetchAll/626e4ef69f02707335d0c4d2")
      .then(response => {
        console.log("Reservations by customer", response.data);
        setReservations(response.data);
        const ids = {}
        response.data.map((data, i) =>  {
          if (!ids[data.reservationId]) {
            ids[data.reservationId] = [];
          }
        ids[data.reservationId].push(data);
        }  )
        console.log("ids", ids)
        setReservationByIds(ids);
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log("Error", err.response);
        }
      });
    }, [])



  return (
    <>
     { Object.keys(reservationByIds).map((key, index) => ( 
          
        <div className="my_individual_appointment_container"
        style={{
          marginRight: 20,
          marginLeft: 20
        }}>
              <div className="my_appointment_date_square">
              <p>
                {reservationByIds[key][0].startDate.slice(0, 10)
                }
              </p>
           
            </div>
              { reservationByIds[key].map((item, i) => (
                  <ReservationItem key={i} item = {item} /> 
                  )) 
              }
          </div>
        ))
        
     }
   
    </>
  );
}
