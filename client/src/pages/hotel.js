import React, { Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import {  GET_HOTEL } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'

import Grid from '@material-ui/core/Grid'
import ReservationDialogue from '../components/ReservationDialogue'

const styles = (theme) => ({
    ...theme.spread,
    nameLoc : {
        position: 'absolute',
        top: '240px',
        left: '30px',
        fontWeight: '800',
        fontSize : '40px',
        color : 'white',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    }, 
    photoUrl : {
        width: window.innerWidth,
        height:'250px',
        objectFit: 'cover',
        position: 'relative',
        backgroundPosition: 'center'
    },
    address : {
        // padding : '0px 30px 20px 30px',
        position: 'absolute',
        top: '290px',
        left: '30px',
        fontWeight: '800',
        fontSize : '23px',
        color : 'white',
        textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
    },
})

class hotel extends Component {

    componentDidMount(){
        setTimeout(() =>
        {
            let hotelId = this.props.match.params.hotelId

            //get data for specific hotel
            axios.get(`/hotel/get/${hotelId}`)
                .then(res => {
                    console.log('load specific hotel'+JSON.stringify(res.data))
                    store.dispatch({
                        type : GET_HOTEL,
                        payload : res.data
                    })
            })
        }
        ,500)
    }
   
    render() {
        const { _id, hotelName, hotelAddress, photoUrl} = this.props.hotel.selectedHotel
        const { classes } = this.props
        return (
            <Grid direction="row" container>
                <Grid item sm={12} style={{height: '250px'}}>
                    <div>
                        <img src={photoUrl} alt={hotelName} className={classes.photoUrl} />
                        <div className={classes.nameLoc}>{hotelName} </div>

                        <div className={classes.address}>
                            {hotelAddress && hotelAddress.street}, {hotelAddress && hotelAddress.city}, {hotelAddress && hotelAddress.state} {hotelAddress && hotelAddress.zipcode} 
                        </div>
                    </div>
                </Grid> 
                
                <Grid direction="row" container item>
                    <Grid item sm={12} style={{justifyContent: 'center'}}>                        
                        <ReservationDialogue hotelId={_id}/>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    hotel : state.hotel
})

export default connect(mapStateToProps, {} )(withStyles(styles)(hotel))