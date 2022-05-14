import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'

import HotelCard from '../components/HotelCard'

import {connect} from 'react-redux'
import {  GET_ALL_HOTELS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'

import landingPic from '../assets/landing.jpg'

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
    },
    explore : {
        paddingTop : '20px',
        fontSize : '30px',
        fontWeight : '800',
        color : 'black',
        justifyContent: 'center'
    },
    main : {
        paddingBottom : '50px'
    }
})

class home extends Component {
    componentDidMount(){
        console.log('load all hotels')
        axios.get('hotel/getAll')
            .then(res => {
                console.log('load all restaurants'+JSON.stringify(res.data))
                store.dispatch({
                    type : GET_ALL_HOTELS,
                    payload : res.data
                })
        })
    }

    displayHotels(){
        if(this.props.hotel.allHotels.length > 0){
            console.log("display restaurants"+JSON.stringify(this.props.user.location))
            const allHotels = this.props.hotel.allHotels

            let hotels = this.props.user.location === '' ? allHotels : allHotels.filter(hotel => {
                return hotel.hotelAddress.city.toLowerCase().includes(this.props.user.location.toLowerCase())
            })

            return hotels.map(hotel => <HotelCard key={hotel._id} hotel = {hotel} />)
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={12}>
                    <div className={classes.landingPic}>
                    </div>
                </Grid>
                <Grid container item xs={12} className={classes.explore}>
                    Explore Marriot Hotels around the country
                </Grid>
                <Grid container direction="row" item xs={12} style={{paddingLeft : '20px'}}>
                    {this.displayHotels()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    hotel : state.hotel
})

export default connect(mapStateToProps, {} )(withStyles(styles)(home))
