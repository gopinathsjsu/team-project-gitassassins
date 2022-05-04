import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import MuiLink from '@material-ui/core/Link'
import { Link } from 'react-router-dom'

// import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    title : {
        marginLeft: '5px',
        fontSize : '32px',
        marginTop : '5px',
        flexGrow: 1,
        fontFamily: 'Bebas Neue',
        fontWeight : '600',
        "&:hover": {
            textDecoration : 'none',
        },  
    },
    button: {
        fontSize : '17px',
        textTransform : 'capitalize',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    },
    appbar : {
        height : '90px',
        paddingTop : '10px'
    }, 
})

class NavigationBar extends Component {
   
    render(){
        const { classes } = this.props
        // const {authenticated} = this.props.user

        return (
            <div >
                <AppBar position="relative" color="transparent" className={classes.appbar} >
                    <Toolbar style={{ height: 50}}>

                        <MuiLink component = {Link} to ={ `/`} className={classes.title}>
                            <span style={{color : '#162328'}}>Marriot Hotels</span> 
                        </MuiLink>

                        {/* signup */}                                            
                        <Button className={classes.button} component = {Link} to="/login" >
                            Signup
                        </Button>    

                        {/* login */}
                        <Button className={classes.button} component = {Link} to="/login" >
                            Login
                        </Button>                           

                        {/* logout */}                        
                        {/* {authenticated && ( 
                            <Tooltip title="Logout" >
                            </Tooltip>
                        )} */}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     user : state.user,
//     admin : state.admin,
// })

export default (withStyles(styles)(NavigationBar))