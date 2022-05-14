import React, { Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        marginTop: '180px',
        fontSize : '25px',
        fontWeight : '700',
    },
})

class hotel extends Component {   
    render() {
        const { classes } = this.props
        return (
            <Grid direction="row" container  justifyContent='center' className={classes.main}>
                <Grid item sm={3} >
                </Grid>
                <Grid item sm={8} >
                    Your room has been successfully booked !!
                </Grid>
                <Grid item sm={2} >
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