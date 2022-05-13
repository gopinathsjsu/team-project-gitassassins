import React, { useEffect, useState} from 'react';
import { Button, Checkbox } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'react-bootstrap'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import {
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import "./reservation.css";
import { KeyboardDatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

export default function ReservationItem ({item}) {



  
    console.log(Object.values(item))


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const [modalOpen, setModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
  
    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());
  
  
    const [checked, setChecked] = React.useState(Object.values(item.amenities));
    // const handleCheck = (position) => { 
    //   const updatedCheckedState = checked.map((check, index) =>
    //     check === position ? !check : check
    //   );
    //   setChecked(updatedCheckedState); 
    
    // };
  
    const handleCheck = (pos) => {
      console.log("in handle check")
      const updatedCheckedState = checked.map((item, index) =>
      index === pos ? !item : item
    );

    setChecked(updatedCheckedState);
      // var updatedCheck = checked;
      // updatedCheck[pos] = !updatedCheck[pos]
      // console.log(updatedCheck);
      // setChecked(updatedCheck);
      // console.log(checked)
    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const openUpdateModal = () => { setModalOpen(true); 
      handleClose();
    }
    const closeUpdateModal = () => { setModalOpen(false); }
  
    const openCancelModal = () => { setCancelModalOpen(true); 
      handleClose();
    }
    const closeCancelModal = () => { setCancelModalOpen(false); }
  
    const cancelModal = () => {

      return (
  
        <Modal show={cancelModalOpen} onHide={closeCancelModal}>
        <Modal.Header >
            <Modal.Title>Cancel Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           Are you sure you want to cancel the Reservation? <br/>
           Please note you will not be refunded reward points if used.
            
        
          </Modal.Body>
          <Modal.Footer>
          <Button variant="contained" color="primary"  onClick={handleClose}>Confirm</Button>
          <Button onClick={closeCancelModal} autoFocus>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
  
  
      )
  
  
    }
    const updateModal = () => {
  
  

      return (
  
        <Modal show={modalOpen} onHide={closeUpdateModal}
          onClose={closeUpdateModal}>
          <Modal.Header >
            <Modal.Title>Cancel Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form >
              <Grid container alignItems="center" justify="center" direction="column">
                <Grid item style = {{marginBottom:20}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                      
                      label="Check-in Date"
                      clearable
                      value={selectedStartDate}
                      placeholder="10/10/2018"
                      onChange={date => handleStartDateChange(date)}
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
  
                <Grid item style = {{marginBottom:20}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                      label="Check-out Date"
                      clearable
                      value={selectedEndDate}
                      placeholder="10/10/2018"
                      onChange={date => handleEndDateChange(date)}
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
  
                <Grid item style = {{marginBottom:20}}>
                  <TextField
  
                    id="room"
                    name="room"
                    label="Number of Rooms"
                    type="number"
                  
  
                  />
                </Grid>
                <Grid item style = {{marginBottom:20}}>
                  <TextField
  
                    id="guest"
                    name="guest"
                    label="Number of Guests"
                    type="number"
                  
  
                  />
                </Grid>
                <Grid item style = {{marginBottom:20}}>
                
                  <TextField
                    id="name-input"
                    name="type"
                    label="Room Type"
                    type="text"
                  />
                </Grid>
  
  
                
                <Grid item style = {{marginBottom:20}}>
                  <FormControl>
                    <FormControlLabel control={<Checkbox id={0} checked = {checked[0]} onChange = {()=>handleCheck(0)}/>} label="Breakfast" />
                    <FormControlLabel control={<Checkbox id= {1} checked = {checked[1]} onChange = {()=>handleCheck(1)}/>} label="Fitness Room" />
                    <FormControlLabel control={<Checkbox id = {2} checked = {checked[2]} onChange = {()=>handleCheck(2)}/>} label="Pool" />
                    <FormControlLabel control={<Checkbox id = {3} checked = {checked[3]} onChange = {()=>handleCheck(3)}/>} label="Parking" />
                    <FormControlLabel control={<Checkbox id = {4} checked = {checked[4]} onChange = {()=>handleCheck(4)}/>} label="Meals" />
  
  
                  </FormControl>
                </Grid>
                
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
  
  
  
      )
    }
  
  
    return (

      
      <div
      className="my_individual_appointment_container"
      style={{
        marginRight: 20,
        marginLeft: 20
      }}

    //   onClick={(e) => handleAppointmentToggled(e, item)}
    //   ref={individualAppointmentRef}
    >

      <div className="my_appointment_date_square">
        <p>
          {item.startDate.slice(0, 10)

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

       
        </p>
        <p className="my_appointment_details">
          reservation info
        
        </p>
        <p className="my_appointment_details">

          more info
        </p>
      </div>
      <div>
        <FontAwesomeIcon
          style={{
            zIndex: 1,
            transitionDelay: "initial",
          }}
          icon={faEllipsisH}
          className="my_individual_appointment_expand_icon"
          onClick={handleClick}

        />


        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={openUpdateModal}>Update</MenuItem>
          <MenuItem onClick={openCancelModal}>Cancel</MenuItem>
          <MenuItem onClick={handleClose}>View</MenuItem>
        </Menu>
      </div>
        {updateModal()}
        {cancelModal()}

    </div>
  
      )

}