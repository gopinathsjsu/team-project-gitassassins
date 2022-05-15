import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles' 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'

//redux
import axios from 'axios'

const styles = (theme) => ({
    ...theme.spread,
    text1 : {
        fontSize : '20px',
        marginTop : '50px',
        fontWeight : '600'
    },
    textField : {
        marginTop : '10px',
    },
    create : {
        color : '#3FC060',
        textDecoration : 'none', 
        marginLeft :'10px',
        fontSize : '15px',
    },
    new : {
        textDecoration : 'none', 
        fontSize : '15px',
    }, 
    text3 : {
        marginTop : '10px'
    },
    errors : {
        fontSize : '14px',
        color : "red"
    },
    button : {
        padding : '10px 190px',
        cursor : 'pointer',
        color : 'white',
        marginTop : '20px',
        marginBottom : '40px',
        textTransform : 'capitalize',
        fontFamily: 'Bebas Neue',
        fontWeight : '600',
        fontSize : '20px',
        backgroundColor : 'black',
        borderRadius : '10px'
    }
})

class signup extends Component {
    
    state = {
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        address : ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event, history) => {
        event.preventDefault()
        var newUser = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email : this.state.email,
            password : this.state.password,
            address : this.state.address,
        }
        axios.post('/customer/create', newUser)
            .then(res => {
                console.log('signup customer'+JSON.stringify(res.data))
                this.props.history.push('/login')
        })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container direction="row">
                <Grid item sm={4}>
                </Grid>

                <Grid item sm={4}>
                    <Grid item sm={12}  className={classes.text1}>
                        Sign up with your email address
                    </Grid>
                    
                    <form noValidate onSubmit ={this.handleSubmit }>
                        <TextField 
                            id ="firstName" 
                            name="firstName" 
                            placeholder="First Name" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.firstName} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <TextField 
                            id ="lastName" 
                            name="lastName" 
                            placeholder="Last Name" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.lastName} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <TextField 
                            id ="email" 
                            name="email" 
                            placeholder="Email" 
                            type="email"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.email} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <TextField 
                            id ="password" 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.password} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />
                        
                        <TextField 
                            id ="address" 
                            name="address" 
                            placeholder="Address" 
                            type="address"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.address} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <div role="button" onClick={this.handleSubmit} className={classes.button}>
                            <Link to="/login" style={{textDecoration: 'none'}}>
                                <div className={classes.checkout}  style={{color: 'white'}}>Signup</div>
                            </Link>
                        </div>

                        {/* <Typography className={classes.errors}>
                            {this.props.errors.signupError ? this.props.errors.signupError : ''}
                        </Typography> */}

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Already a member? 
                            </span>
                            <Typography className={classes.create} component = {Link} to="/login" >
                                Login here
                            </Typography>
                        </Typography>

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Are you an admin?
                            </span>
                            <Typography className={classes.create} component = {Link} to="/hotelSignup" >
                                Create an account here
                            </Typography>
                        </Typography>
                    </form>
                </Grid>

                <Grid item sm={4}>
                </Grid>
                
            </Grid>
        )
    }
}

export default (withStyles(styles)(signup))