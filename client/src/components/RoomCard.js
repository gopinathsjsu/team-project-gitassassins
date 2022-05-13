import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {  SET_SELECTED_ROOM } from '../redux/types'
import store from '../redux/store'

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
    price : {
        fontSize : '15px',
        fontWeight : '600',
        color : '#737373',
        paddingLeft : '10px'
    },
})

class RoomCard extends Component {

    handleOnClick = () => {
        console.log("room: "+this.props.room.type)
        store.dispatch({
            type : SET_SELECTED_ROOM,
            payload : this.props.room.type
        })
    }

    render(){
        const { classes } = this.props
        const { type, price, photoUrl} = this.props.room

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
                                
            </Grid>
             
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    hotel : state.hotel,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(RoomCard))