import React, { useState } from 'react';
import Modal from 'react-modal';
import './Header.css';
import Logo from '../../assets/logo.svg';
import { Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

const Header = function (props) {
    const [open, setOpen] = useState(false);
    const isLoggedIn = true;
    const btnText = isLoggedIn ? "Login" : "Logout";
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [state,setState] = React.useState(0);
    const { classes } = props;
    const [userName,  setUsername] = React.useState('');
    const [userPass,  setUserpass] = React.useState('');
    const [firstName,  setFirstname  ] = React.useState('');
    const [lastName,   setLastname   ] = React.useState('');
    const [userEmail,  setUseremail  ] = React.useState('');
    const [userPassw,  setUserpassw  ] = React.useState('');
    const [userContact,setUsercontact] = React.useState('');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handleUserpassChange = event => {
        setUserpass(event.target.value);
    };

    const handleUserfnameChange = event => {
        setFirstname(event.target.value);
    };

    const handleUserlnameChange = event => {
        setLastname(event.target.value);
    };

    const handleUseremailChange = event => {
        setUseremail(event.target.value);
    };

    const handleUserpasswChange = event => {
        setUserpassw(event.target.value);
    };

    const handleUsercontactChange = event => {
        setUsercontact(event.target.value);
    };

    function resetRegistration() {
        setFirstname('');
        setLastname('');
        setUseremail('');
        setUserpassw('');
        setUsercontact('');
    }

    function handleChange (event, value) {
        setState(value);
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
        setOpen(false);
    }

    function onLoginFormSubmitted (e) {
        e.preventDefault();
        let data = JSON.stringify({
            "email_address": userName,
            "password": userPass
          });

          fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache"
            },
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
            });
    }
    
    function onRegisterFormSubmitted (e) {
        e.preventDefault();
        let data = JSON.stringify({
            "email_address": userEmail,
            "first_name": firstName,
            "last_name": lastName,
            "mobile_number": userContact,
            "password": userPassw
          });

          fetch("/api/v1/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache"
            },
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
              if(data.status === 'ACTIVE'){
                resetRegistration();
                setOpen(true);
              }
            });
    }

    return (
        <div>
            <div className="header">
                <img className="logo" src={Logo} alt="Logo"/>
                <Grid container justify="flex-end">
                    {/* <Button className="button" variant="contained" color='primary'>Book Show</Button> */}
                    <Button className="button" variant="contained" color='default' onClick={openModal}>{btnText}</Button>
                </Grid>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Login Modal"
            >
                <div className={classes.root}>
                    <AppBar elevation={0} position="static" color='inherit'>
                      <Tabs value={state} onChange={handleChange}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                      </Tabs>
                    </AppBar>
                    {state === 0 && <TabContainer>
                      <form className="subscriber-form center" onSubmit={onLoginFormSubmitted.bind(this)}>
                          <TextField required id="standard-name-basic" label="Username" variant="standard" value= {userName} onChange= {handleUsernameChange}/><br /><br />
                          <TextField required id="standard-pass-basic" label="Password" type='password' variant="standard" value= {userPass} onChange= {handleUserpassChange}/><br />
                          <Button type="submit" className="button" variant='contained' color='primary'>Login</Button>
                      </form>
                      </TabContainer>
                    }
                    {state === 1 && <TabContainer>
                        <form className="subscriber-form center" onSubmit={onRegisterFormSubmitted.bind(this)}>
                        <TextField required id="standard-fname-basic" label="First Name" variant="standard" value= {firstName} onChange= {handleUserfnameChange}/><br />
                        <TextField required id="standard-lname-basic" label="Last Name" variant="standard" value= {lastName}  onChange= {handleUserlnameChange}/><br />
                        <TextField required id="standard-email-basic" label="Email" variant="standard" value= {userEmail} onChange= {handleUseremailChange}/><br />
                        <TextField required id="standard-passw-basic" label="Password" type='password' variant="standard" value= {userPassw} onChange= {handleUserpasswChange}/><br />
                        <TextField required id="standard-contact-basic" label="Contact No." type='number' variant="standard" value= {userContact} onChange= {handleUsercontactChange}/><br /><br />
                        {open && (
                            <div>
                              <p>Registration Successful. Please Login!</p>
                            </div>
                        )}
                        <Button type="submit" className="button" variant='contained' color='primary'>Register</Button>
                    </form>
                        </TabContainer>
                    }
                </div>
            </Modal>
        </div>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(Header);