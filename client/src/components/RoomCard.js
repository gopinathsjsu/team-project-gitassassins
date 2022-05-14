import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import {connect} from 'react-redux'
import {  SET_SELECTED_ROOM } from '../redux/types'
import store from '../redux/store'
import { Button } from '@material-ui/core'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    card : {
        height : '210px',
    },
    tile : {
        marginLeft : '40px',
        border : '1px solid #dbdbdb',
        "&:hover": {
            backgroundColor : '#e6e6e6',
        },
    },
    image : {
        width : '20px',
        height : '140px',
        backgroundSize: 'cover',
        objectFit : 'cover',
        resize: 'both',
        backgroundPosition: 'center',
    },
    name : {
        fontSize : '18px',
        fontWeight : '700',
        color : 'black',
        textTransform: 'capitalize',
        paddingLeft : '10px'
    },
    imgDialog : {
        maxWidth : '100%',
        height: '300px',
        backgroundSize: 'cover',
        objectFit : 'cover',
        resize: 'both',
        backgroundPosition: 'center',
    },
    input : {
        marginTop : '20px',
        marginLeft : '50px',
        width : '350px'
    },
    checkbox : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        marginLeft : '10px'

    },
    amenities : {
        fontSize : '18px',
        fontWeight : '700',
        marginLeft : '10px'
    },
    form : {
        margin : '0px 60px 30px 60px'
    },
    rate : {
        margin: '10px auto auto 40px'
    },
    button : {
        padding : '10px 40px',
        cursor : 'pointer',
        color : 'white',
        marginTop : '20px',
        marginBottom : '40px',
        textTransform : 'capitalize',
        fontFamily: 'Bebas Neue',
        fontWeight : '600',
        fontSize : '20px',
        backgroundColor : 'black'
    }
})

class RoomCard extends Component {
    state = {
        open : false,
        numRooms : 1,
        numGuests : 1, 
        breakfast: false,
        fitnessRoom: false,
        pool: false,
        parking: false,
        meals: false,
    }

    handleOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleOnClick = () => {
        console.log("room: "+this.props.room.type)
        store.dispatch({
            type : SET_SELECTED_ROOM,
            payload : this.props.room.type
        })

        this.handleOpen()
    }

    render(){
        const { classes } = this.props
        const { type, price, photoUrl} = this.props.room
        let amenitiesRate = 100
        let roomRate = 100
        return (
            
            <Grid container item xs={3} className={classes.card} >
                <div onClick={this.handleOnClick}>
                    <Grid container item className={classes.tile} style={{backgroundColor: type === this.props.hotel.selectedRoom ? '#e6e6e6' : '', border: type === this.props.hotel.selectedRoom ? '1px solid #383838' : ''}}>
                        <Grid container item xs={12}  className={classes.image}  style={{backgroundImage: `url(${photoUrl})`}}>
                        </Grid>
                        <Grid container item xs={12} className={classes.name}>
                            {type} Room
                        </Grid>
                        <Grid container item xs={12} className={classes.price}>
                            ${price} per night
                        </Grid>
                    </Grid>   
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">  

                    <img className={classes.imgDialog} src={photoUrl} alt="photoUrl" />

                    <div className={classes.name}>{type} Room</div>

                    <Grid container direction="row"  >
                        <Grid item xs={6}  >
                            <TextField name="numRooms" id="numRooms" label="Select the number of rooms" type="number" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.numRooms} variant="outlined" className={classes.input}/>
                            
                        </Grid>
                        <Grid item xs={6} >
                            <TextField name="numGuests" id="numGuests" label="Select the number of guests" type="number" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.numGuests} variant="outlined"  className={classes.input} />
                        </Grid>

                        <Grid item xs={12} className={classes.amenities}>
                            Select amenities for you room
                        </Grid>

                        <Grid item xs={12} >
                            <FormGroup className={classes.form}>
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.breakfast} name="breakfast" onChange={this.handleChange} />} label="Daily Continental Breakfast" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.fitnessRoom} name="fitnessRoom" onChange={this.handleChange}/>} label="Access to fitness room" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.pool} name="pool" onChange={this.handleChange}/>} label="Access to Swimming Pool/Jacuzzi" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.parking} name="parking" onChange={this.handleChange}/>} label="Daily Parking" />
                                <FormControlLabel className={classes.checkbox} control={
                                <Checkbox checked={this.state.meals} name="meals" onChange={this.handleChange}/>} label="Meals included (Breakfast, Lunch, Dinner)" />
                            </FormGroup>
                        </Grid>
                    </Grid>      

                    <Grid item xs={12} className={classes.amenities} >
                        Summary of charges
                    </Grid>
                    <Grid container item xs={12} className={classes}>
                        <Grid item xs={12} className={classes.rate} style={{fontSize : '19px', fontWeight : '700'}}>
                            RATE DETAILS
                        </Grid>
                        <Grid item xs={12} className={classes.rate} style={{fontSize : '13px', fontWeight : '600', color : '#878787'}}>
                            {this.state.numRooms} room(s) for {this.state.numGuests} guest(s)
                        </Grid>
                        <hr style={{color: '#d6d6d6'}}/>
                        <Grid container direction="row" item>
                        <Grid item xs={6} className={classes.rate} style={{fontSize : '15px'}}>
                                Room rate
                            </Grid>
                            <Grid item xs={4} className={classes.rate} style={{fontSize : '15px'}}>
                                ${roomRate}
                            </Grid>
                            <Grid item xs={6} className={classes.rate} style={{fontSize : '15px', borderBottom : '1px solid #d6d6d6'}}>
                                Amenities
                            </Grid>
                            <Grid item xs={4} className={classes.rate} style={{fontSize : '15px', borderBottom : '1px solid #d6d6d6'}}>
                                ${amenitiesRate }
                            </Grid>
                            <Grid item xs={6} className={classes.rate} style={{fontSize : '16px', fontWeight : '600'}}>
                                Total cash rate
                            </Grid>
                            <Grid item xs={4} className={classes.rate} style={{fontSize : '16px', fontWeight : '600'}}>
                                ${Math.round((roomRate + amenitiesRate))}
                            </Grid>
                            <Grid item xs={6} className={classes.rate} style={{fontSize : '16px', fontWeight : '600', borderBottom : '1px solid #d6d6d6'}}>
                                Estimated government taxes and fees
                            </Grid>
                            <Grid item xs={4} className={classes.rate} style={{fontSize : '16px', fontWeight : '600', borderBottom : '1px solid #d6d6d6'}}>
                                ${Math.round((roomRate + amenitiesRate) * 0.2)}
                            </Grid>
                            <Grid item xs={6} className={classes.rate} style={{fontSize : '19px', fontWeight : '700'}}>
                                Total Stay
                            </Grid>
                            <Grid item xs={4} className={classes.rate} style={{fontSize : '19px', fontWeight : '700', marginBottom : '30px'}}>
                                ${Math.round((roomRate + amenitiesRate) * 1.2)}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container xs={12} justifyContent="center" >
                        <Grid item>
                            <Button onClick={this.handleBookRoom} variant="contained" className={classes.button} >
                                Book room
                            </Button>
                        </Grid>
                    </Grid>

                </Dialog>         
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    hotel : state.hotel,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(RoomCard))