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
export default function UpdateModal (){


    return(


        <Modal show={modalOpen} onHide={closeUpdateModal}
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
                        defaultValue={Date.parse(startDate)}
                        placeholder={startDate}
                        onChange={date => handleStartDateChange(date)}
                        // minDate={new Date()}
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
                        defaultValue={Date.parse(endDate)}
                        placeholder="10/10/2018"
                        onChange={date => handleEndDateChange(date)}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
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
                      defaultValue={guests}
                    />
                  </Grid>
                  <br/>
                 
                   <Divider/>
                  <Button variant="contained" color="primary" type="submit" onClick= {()=>{updateReservation(rooms[0].reservationId)}}>
                    Submit
                  </Button>
                </Grid>
              </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>

    );
} 