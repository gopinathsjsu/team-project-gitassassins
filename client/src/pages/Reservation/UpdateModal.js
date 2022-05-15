import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap'
import { KeyboardDatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import {
  
    Divider,
    Button,
    Grid,
    TextField,
   
  } from "@material-ui/core";
export default function UpdateModal ({props}){

  const [openModal, handleOpenModel]= useState();
  const [selectedStartDate, handleStartDateChange] = useState(props.startDate);
  const [selectedEndDate, handleEndDateChange] = useState(props.endDate);
  const [defaultStart, setDefaultStart] = useState(props.startDate);
  const [defaultEnd, setDefaultEnd] = useState(props.endDate);

  const [newGuest, handleNumberOfGuests] = useState();

  const closeUpdateModal = () => { 
    window.location.reload(false);
    handleOpenModel(false); }


  console.log("Inside modal component", props);
  

   useEffect(()=>{
    var startdate = new Date(defaultStart);
    startdate.setDate(startdate.getDate() + 1)
    setDefaultStart(startdate.toDateString());
    var enddate = new Date(defaultEnd);
    enddate.setDate(enddate.getDate() + 1)
    setDefaultEnd(enddate.toDateString());
    console.log("default start & end",startdate,enddate);
    handleOpenModel(props.modalOpen);

   },[]);
  const updateReservation = async() =>{
    //console.log("Functon data",selectedStartDate, selectedEndDate, activeReservationId);
    let req ={
        "startDate" : selectedStartDate,
        "endDate" : selectedEndDate,
        "numberOfGuests": newGuest
    }

    console.log("request", props.reservationId);
    await axios.put(`/reservation/customer/update/${props.reservationId}`, req)
    .then(response => {
      console.log("Reservation Update Response", response.data);
      alert(response.data.message);
      window.location.reload(false);

    })
    .catch(err => {
      if (err.response && err.response.data) {
        console.log("Error", err.response);
      }
    });

}

    return(


        <Modal show={props.modalOpen} onHide={closeUpdateModal}
            onClose={closeUpdateModal}>
            <Modal.Header >
              <Modal.Title>Update Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form >
                <Grid container alignItems="center" justify="center" direction="column">
                  <Grid item style = {{marginBottom:20}}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      
                       <KeyboardDatePicker
                        
                        label="Check-in Date"
                        clearable
                        initialFocusedDate={null}
                        value={selectedStartDate}
                        defaultValue={defaultStart}
                        placeholder={defaultStart}
                        onChange={date => handleStartDateChange(date)}
                        // minDate={new Date()}
                        format="yyyy/MM/dd"
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
    
                  <Grid item style = {{marginBottom:20}}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                       <KeyboardDatePicker
                        label="Check-out Date"
                        clearable
                        initialFocusedDate={null}
                        value={selectedEndDate}
                        defaultValue={defaultEnd}
                        placeholder={defaultEnd}
                        onChange={date => handleEndDateChange(date)}
                        // minDate={new Date()}
                        format="yyyy/MM/dd"
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item style = {{marginBottom:20}}>
                    <TextField
    
                      id="guest"
                      name="guest"
                      label="Number of Guests"
                      type="number"
                      value = {newGuest}
                      onChange = {e => handleNumberOfGuests(e.target.value)}
                      style ={{width: 220}}
                      defaultValue={props.guests}
                    />
                  </Grid>
                  <br/>
                 
                   <Divider/>
                
                </Grid>
              </form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="contained" color="primary" type="submit" onClick= {()=>{updateReservation()}}>
                    Submit
                  </Button>
                  <Button  color="primary" type="submit" onClick= {closeUpdateModal}>
                    Cancel
                  </Button>
                  
            </Modal.Footer>
          </Modal>

    );
} 