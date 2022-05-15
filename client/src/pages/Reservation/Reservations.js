import React, { useEffect, useState} from 'react';
import axios from "axios";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    makeStyles,
    Divider,
    List,
    ListItem,
    Button,
    Grid,
    TextField,
  } from "@material-ui/core";
  import {
    Apartment as HotelIcon,
    ExpandMore as ExpandIcon,
  } from "@material-ui/icons";
  import { Modal } from 'react-bootstrap'
  import { KeyboardDatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


import "./reservation.css";
import Rooms from './Rooms'
import { Alert, ListItemButton } from '@mui/material';
import { Dropdown } from 'bootstrap';


const useStyles = makeStyles((theme) => ({
    hotelList: {
      width: "100%",
    },
    hotelListing: {
      display: "flex",
    },
    hotelGraphic: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "5rem",
      width: "5rem",
      marginRight: theme.spacing(2),
    },
    hotelImage: {
      height: "100%",
      width: "100%",
    },
    hotelIcon: {
      color: theme.palette.text.secondary,
      height: "3rem",
      width: "3rem",
    },
    hotelDetails: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      margin: 5
    
    },
    hotelName: {
      fontWeight: "bold",
      textTransform: "uppercase",
      padding: 25
    },
    hotelAddress: {
      display: "flex",
      flexDirection: "row",
      padding: 25

    },
  }));

export default function Reservations() {

  const [reservations, setReservations] = useState([]);
  const [reservationByIds, setReservationByIds] = useState({});
  const classes = useStyles();

  const [activeReservationId, setActiveReservationId] = useState(false);
  const handleChange = (reservationId) => (event, expanded) => {
    setActiveReservationId(expanded ? reservationId : false);
  };



  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const [selectedStartDate, handleStartDateChange] = useState();
  const [selectedEndDate, handleEndDateChange] = useState();
  const [newGuest, handleNumberOfGuests] = useState();
  const customerId = "626e4ef69f02707335d0c4d2";



    // const [checked, setChecked] = React.useState([false, false, false, false, false]);

//     const handleCheck = (pos) => {
//     console.log("in handle check")
//     const updatedCheckedState = checked.map((item, index) =>
//     index === pos ? !item : item
//   );


//   setChecked(updatedCheckedState);

//   }
  

  const openUpdateModal = () => { setModalOpen(true); 
  }
  const closeUpdateModal = () => { setModalOpen(false); }

  const openCancelModal = () => { setCancelModalOpen(true); 
  }
  const closeCancelModal = () => { setCancelModalOpen(false); }


  useEffect(() => {
    console.log("in reservations component")
    //axios.get(`${endPointObj.url}/job-seeker/get-company-photos/${companyId}`)
    axios.get("reservation/customer/fetchAll/626e4ef69f02707335d0c4d2")
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


  
    const cancelReservation = (reservationId) =>
    {
        axios.put(`/reservation/customer/cancel/${reservationId}`)
      .then(response => {
        console.log("Reservation Cancel Response", response.data);
        <Alert>Reservation Successfully Cancelled! Refund initiated.</Alert>
      })
      .catch(err => {
        if (err.response && err.response.data) {
          console.log("Error", err.response);
        }
      });

    }

    const updateReservation = async(reservationId) =>{
            console.log("Functon data",selectedStartDate, selectedEndDate, activeReservationId);
            let req ={
                "startDate" : selectedStartDate,
                "endDate" : selectedEndDate,
                "numberOfGuests": newGuest
            }
            console.log("request", reservationId);
            await axios.put(`/reservation/customer/update/${activeReservationId}`, req)
            .then(response => {
              console.log("Reservation Update Response", response.data);
              alert(response.data.message);
            })
            .catch(err => {
              if (err.response && err.response.data) {
                console.log("Error", err.response);
              }
            });

    }
    const cancelModal = (reservationId) => {

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
          <Button variant="contained" color="primary"  onClick={()=> {
              cancelReservation(reservationId)
          }}>Confirm</Button>
          <Button onClick={closeCancelModal} autoFocus>
            Close
          </Button>
          </Modal.Footer>
        </Modal>
  
  
      )
  
    }

    const updateModal = (rooms, guests, startDate, endDate) => {
   
        console.log("startDate",typeof(startDate), startDate); 
        console.log("Modal data", guests, startDate, endDate, rooms[0].reservationId);
        return (
            
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
    
    
    
        )
      }
    

    return (

      
        <div className={classes.hotelList}>
        {
        Object.keys(reservationByIds).map((key, index) => 
         {
            const reservationId  = key;
            
            const {totalBill, status, numberOfGuests, startDate, endDate} = reservationByIds[key][0]
            const active = activeReservationId === reservationId;

            return (
                <>
              <Accordion
                key={reservationId}
                expanded={active}
                onChange={handleChange(reservationId)}
              >
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <div className={classes.hotelListing}>
                    <div className={classes.hotelGraphic} >
                   
                        <HotelIcon className={classes.hotelIcon}/>
                    </div>
                    <div className={classes.hotelDetails}>
                      <Typography className={classes.hotelName} >
                       CheckIn: {startDate.slice(0, 10)}
                      </Typography>
                      <Typography className={classes.hotelName}>
                       CheckOut: {endDate.slice(0, 10)}
                      </Typography>
                      <Typography
                        className={classes.hotelAddress}
                      >
                        Number of Guests:  {numberOfGuests}
                      </Typography>
                      <Typography
                        className={classes.hotelAddress}
                      >
                        Total Bill:  ${totalBill}
                      </Typography>
                      <Typography
                        className={classes.hotelAddress}
                      >
                        Status :  {status}
                      </Typography>
                 
                       
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                <List className={classes.offerList}>
                <Divider />
               
                {
                
                reservationByIds[key].map((item, i) => (
                  <Rooms roomId={i} 
                         reservationId = {key}
                         currRoom = {item} /> 
                  )) 
              }   

                <ListItem
                        alignItems="flex-wrap"
                        className={classes.offerListing}>
                <ListItemButton
                     onClick = {openUpdateModal}
                >
                        Update Reservation
                       
                </ListItemButton>
                <ListItemButton
                onClick={openCancelModal}>
                        Cancel Reservation
                </ListItemButton>

                </ListItem>
            </List>
              {/* <Rooms
                        active={active}
                        reservationId={reservationId}
                        rooms={reservationByIds[key]}
                        /> */}

                </AccordionDetails>
              </Accordion>
              {cancelModal(key)}
          {updateModal(reservationByIds[key], numberOfGuests, startDate, endDate)}
              </>
              
            );
            
          })}

         
      </div>);

    }