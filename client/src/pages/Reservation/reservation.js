import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import withStyles from '@material-ui/core/styles/withStyles'

import "./reservation.css";


import Grid from '@material-ui/core/Grid'

import landingPic from '../../assets/landing.jpg'

const styles = (theme) => ({
    ...theme.spread,
    landingPic : {
        backgroundImage: `url(${landingPic})`,
        backgroundSize: 'cover',
        objectFit : 'cover',
        resize: 'both',
        backgroundPosition: 'center',
        width : window.innerWidth,
        height: '480px'
    }
})


export default function Reservation () {
    


        const [reservations, setReservations] =  useState([]);

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
            <div
                  key={i}
                  className="my_individual_appointment_container"
                //   onClick={(e) => handleAppointmentToggled(e, item)}
                //   ref={individualAppointmentRef}
                >
                
                <div className="my_appointment_date_square">
                    <p>
                      {item.startDate.slice(0,10)

                        }
                    </p>
                    <p>
                      {/* {item.date
                        .split(" ")[0]
                        .slice(0, 3)
                        .toUpperCase()} */}
                    </p>
                  </div>
                  <div className="my_appointment_information_container">
                    <p className="my_appointment_date_time">
                        date box
                    
                      {/* {moment(item.date, "LL")
                        .format("LLLL")
                        .split(" ")
                        .slice(
                          0,
                          moment(item.date, "LL")
                            .format("LLLL")
                            .split(" ").length - 2
                        )
                        .join(" ") + ", "}
                      {!props.currentScreenSize ? (
                        props.initialScreenSize >= 1200 ? (
                          <br />
                        ) : null
                      ) : props.currentScreenSize >= 1200 ? (
                        <br />
                      ) : null}
                      {item.startTime +
                        " " +
                        (Number(item.startTime.split(":")[0]) >= 12 ||
                        Number(item.startTime.split(":")[0]) < 9
                          ? "PM"
                          : "AM")} */}
                    </p>
                    <p className="my_appointment_details">
                      reservation info
                      {/* {item.treatments[0].name
                        ? item.treatments[0].name === "ChemicalPeel"
                          ? "Chemical Peel Facial"
                          : item.treatments[0].name === "Salt Cave"
                          ? "Salt Cave"
                          : item.treatments[0].name + " Facial"
                        : null}
                      {item.addOns[0]
                        ? ", " +
                          (item.addOns[0].name
                            ? item.addOns[0].name === "ExtraExtractions"
                              ? "Extra Extractions"
                              : item.addOns[0].name
                            : null) +
                          " Add On"
                        : null}{" "}
                      {item.addOns.length > 1
                        ? "+ " + (item.addOns.length - 1).toString() + " more"
                        : null} */}
                    </p>
                    <p className="my_appointment_details">

                      more info 
                      {/* {item.duration >= 60
                        ? Math.floor(item.duration / 60)
                        : item.duration}{" "}
                      {item.duration >= 60
                        ? Math.floor(item.duration / 60) === 1
                          ? "hour"
                          : "hours"
                        : null}{" "}
                      {item.duration >= 60
                        ? Number.isInteger(item.duration / 60)
                          ? null
                          : item.duration -
                            Math.floor(item.duration / 60) * 60 +
                            " minutes"
                        : "minutes"} */}
                    </p>
                  </div>

                  <FontAwesomeIcon
                  style={{
                    zIndex:1,
                    transitionDelay:  "initial",
                  }}
                  icon={faEllipsisH}
                  className="my_individual_appointment_expand_icon"
                />
                </div>
           )
        )
      }
    </>
    );
}
