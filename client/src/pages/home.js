import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'

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
    }
})

class home extends Component {
    
    render() {
        const { classes } = this.props

        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={12}>
                    <div className={classes.landingPic}>

                    </div>
                </Grid>

                <Grid container item sm={3} style={{paddingLeft : '20px'}}>
                    {/* {this.displayRestaurants()} */}
                </Grid>
            </Grid>
        )
    }
}

export default (withStyles(styles)(home))
