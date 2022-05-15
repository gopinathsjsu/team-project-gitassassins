import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@material-ui/core'

import {connect} from 'react-redux'
import { ROOM_SEARCH } from '../redux/types'
import store from '../redux/store'
import axios from 'axios'

const styles = (theme) => ({
    ...theme.spread,
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
    },
    paper : {
        margin : '50px 200px',
    },
    datePick : {
        border : '2px solid white',
        fontSize : '20px',
        borderRadius : '10px',
        color : '#545454',
        fontFamily: 'Bebas Neue',
        fontWeight : '600',
    },
    datePicks : {
        padding : '10px',
        margin : '20px',
        paddingLeft: '180px',
    },
    datePicke : {
        padding : '10px',
        margin : '20px',
        paddingLeft: '100px',
    },
    heading : {
        backgroundColor: '#8c8c8c',
        color:'white',
        fontSize : '30px',
        fontWeight: '700',
        padding : '10px 30px',
        marginBottom : '20px'
    },
    check : {
        fontSize : '15px',
        fontWeight: '700',
    }
})

class ReservationDialogue extends Component {
    state = {
        startDate : new Date(),
        endDate : new Date()
    }

    handleStartDate = (date) => {
        this.setState({
            startDate : date
        })
    }

    handleEndDate = (date) => {
        this.setState({
            endDate : date
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
            let hotelId = this.props.hotelId
            let month = '' + (this.state.startDate.getMonth() + 1)
            let day = '' + this.state.startDate.getDate()
            let year = this.state.startDate.getFullYear()
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            let startDate = year+"-"+month+"-"+day
         
            month = '' + (this.state.endDate.getMonth() + 1)
            day = '' + this.state.endDate.getDate()
            year = this.state.endDate.getFullYear()
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            let endDate = year+"-"+month+"-"+day

            console.log(startDate+"\n")
            console.log(endDate+"\n")
            axios.get(`/room/search?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
                .then(res => {
                    console.log('room search'+JSON.stringify(res.data))
                    store.dispatch({
                        type : ROOM_SEARCH,
                        payload: res.data,
                    })
                })
            
    }

    render() {
        const { classes } = this.props
        let error = Math.round( (this.state.endDate - this.state.startDate)/(1000*60*60*24))
        return (
            <Paper elevation={3} className={classes.paper} > 
                <Grid direction="column" container  className={classes.heading} alignItems="center">
                    <Grid>
                        Enter booking details
                    </Grid>
                </Grid>
            <Grid direction="column" container justifyContent="center" alignItems="center">
                <Grid container item direction="row" className={classes} alignItems="center">
                    <Grid container item xs={5} direction="column" className={classes.datePicks}>
                        <Grid item className={classes.check}>
                            Check In
                        </Grid>
                        <Grid item>
                            <DatePicker className={classes.datePick} selected={this.state.startDate} onChange={(date) => this.handleStartDate(date)} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={5} direction="column" className={classes.datePicke}>
                        <Grid item className={classes.check}>
                            Check Out
                        </Grid>
                        <Grid item>
                            <DatePicker className={classes.datePick} selected={this.state.endDate} onChange={(date) => this.handleEndDate(date)} />
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={10}>
                    <div style={{color : "red"}}>{error > 7 ? "Cannot book room for more than 7 days" : error < 0 ? "End date cannot be before start date" : ""}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <Button disabled={error > 7 && error < 0 } onClick={this.handleSubmit} variant="contained" className={classes.button} >
                        Find rooms
                    </Button>
                </Grid>
            </Grid>
                
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    hotel : state.hotel
})

export default connect(mapStateToProps, {})(withStyles(styles)(ReservationDialogue))