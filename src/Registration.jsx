import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import CaptchaCode from 'react-captcha-code';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Backdrop } from '@mui/material';
import Swal from "sweetalert2";



function Registration() {

  const [addressLen, setAddressLen] = useState(0);
  const [userCaptcha, setUserCaptcha] = useState('')
  const [captcha, setCaptcha] = useState(generateCaptcha())

  const [validFname, setValidFname] = useState(false)
  const [validLname, setValidLname] = useState(false) 
  const [validDOB, setvalidDOB] = useState(false)
  const [validPHnumber, setValidPHnumber] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validAddress, setValidAddress] = useState(false)

  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [loading, setLoading] = useState(false)
  

  const [userInfo, setUserInfo] = useState({

    fname: '',
    lname: '',
    gender: '',
    dob: null,
    PHnumber: '',
    address: '',
    email: ''
  })
  console.log(userInfo);
  console.log(captcha);


  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: 0,
            border: 'none', // Remove border
            outline: 'none', // Remove outline
            boxShadow: 'none', // Remove focus shadow
            height: '0',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Remove hover border
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Remove focus border
            },
          },
          notchedOutline: {
            border: 'none', // Remove the default outlined style
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: '0',
            padding: '0',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(4px)', // Apply blur effect
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add translucent background
          },
        },
      },
    },
  });


  // Step 2: Generate a random CAPTCHA string (4 characters)
  function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaCode = '';
    for (let i = 0; i < 4; i++) {
      captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captchaCode;
  }


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };  


  const handleClickError = () => {
    setOpenError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };  


  const fnameHandler = (e) => {
    let firstName = e.target.value
    
    const Regex = /^(?!\s)[a-zA-Z\s]*$/
    setValidFname(true)

    if (Regex.test(firstName)) {

      setUserInfo({...userInfo, ['fname']: e.target.value})
      
    }
    else {      
      // e.target.value = firstName.trim()
      e.target.value = firstName.replace(/[^a-zA-Z]/g, '')
    }

    setValidLname(false)
  }

  const lnameHandler = (e) => {

    let lastName = e.target.value

    const Regex = /^(?!\s)[a-zA-Z\s]*$/
    setValidLname(true)

    if (Regex.test(lastName)) {

      setUserInfo({...userInfo, ['lname']: e.target.value})

    }
    else {
      e.target.value = lastName.replace(/[^a-zA-Z]/g, '')
    }

    setValidFname(false)
  }

  const dobHandler = (newDate) => {

      if (newDate) {
        setUserInfo({...userInfo, ['dob']: newDate.format('DD/MM/YYYY')})
        setvalidDOB(false)
      }
      else {
        setvalidDOB(true)
      }

      setValidLname(false)
      setValidFname(false)
  }

  const PHnumberHandler = (e) => {

    let number = e.target.value    
    
    const Regex = /^[0-9]*$/g

    if (! Regex.test(number)) {

      e.target.value = number.replace(/[^0-9]/g, '')
    }
    else {
      setUserInfo({...userInfo, ['PHnumber']: e.target.value})
    }

    if (number.length !== 10) {
      setValidPHnumber(true)
    }
    else {
      setValidPHnumber(false)
    }

    setValidLname(false)
    setValidFname(false)
  }

  const emailHandler = (e) => {

    let email_address = e.target.value

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g

    if (emailRegex.test(email_address)) {
      setUserInfo({...userInfo, ['email']: email_address})
      setValidEmail(false)
      
    }
    else {
      setValidEmail(true)
    }

    setValidLname(false)
    setValidFname(false)
  }

  const addressHandler = (e) => {

    let address = e.target.value

    const Regex = /^(?!\s)[^\s]*(\s[^\s]*)*$/

    if (Regex.test(address)) {
      setAddressLen(address.length)
      setUserInfo({...userInfo, ['address']: address})
      setValidAddress(false)
    }
    else {
      e.target.value = address.trim()
      setValidAddress(true)
    }
    
    setValidLname(false)
    setValidFname(false)
  }

  const captchaHandler = (e) => {

    let captcha = e.target.value

    const Regex = /^\S*$/

    if (Regex.test(captcha)) {
      setUserCaptcha(captcha)
    }
    else {
      e.target.value = captcha.trim()
    }

    setValidLname(false)
    setValidFname(false)
  }

  const handleReload = () => {

    setCaptcha(generateCaptcha())
    setUserCaptcha('')
  }

  const handleSubmit = (e) => { 

    if (userInfo.fname && userInfo.gender && userInfo.dob !== 'Invalid Date' && userInfo.dob && userInfo.PHnumber && !validPHnumber && userInfo.address && userInfo.email && !validEmail && userCaptcha) {
      
      e.preventDefault()
      
      if (userCaptcha === captcha) {

        sessionStorage.setItem('RegForm', JSON.stringify(userInfo))
        setLoading(true)

        setTimeout(() => {
          setLoading(false)
          Swal.fire({
            title: `Thank You ${userInfo.fname}`,
            text: "Your Registration Successfull 😊",
            icon: "success",
            confirmButtonText: "Okay",
            timer: 5000, // Time in milliseconds
            timerProgressBar: true, // Show a progress bar
        }).then(result => {

          if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            window.location.reload()
          }
        })
        }, 2000);

      }
      else {
        handleClickError()
        setTimeout(() => {
          window.location.reload()
        }, 1300)
      }
    }
    else {
      e.preventDefault()
      handleClick()
    }

  }

  return (
    <div>

        <section className="flex justify-center items-center min-h-screen w-screen bg-gray-100 relative z-0 max-md:py-8 max-md:px-2">
          {/* <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0"></div> */}
          {
            loading &&
            <div className=''>
              <Backdrop
                open={true}
                sx={{
                  backdropFilter: 'blur(2px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  zIndex: 1,
                }}
              />
  
              <div className="absolute z-10 inset-0 flex justify-center items-center">
                <svg class="spinner" width="50px" height="50px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                  <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
              </div>
            </div>
          }

            <div className="w-[90%] max-w-[1000px] bg-white rounded-xl md:py-10 md:px-14 p-5">

                <div className="">
                  <h5 className='text-sm bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent capitalize'>secure your spot</h5>
                  <h1 className="md:text-4xl text-2xl max-sm:mt-5 font-bold text-black my-2 capitalize">register your interest</h1>
                </div>

                <div className="shadow-md p-4 md:p-5 md:mt-9 mt-5 w-full border rounded-md">
                    <form action="" className='flex flex-col gap-5' id='demo-form'>
                      <div className="flex max-md:flex-col gap-5 w-full">
                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="fname" className='text-sm font-light'>First Name <span className="text-red-600">*</span></label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <input onChange={fnameHandler} type="text" name="fname" id="fname" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1' required maxLength={20}/>
                          </div>
                          {
                            validFname &&
                            <span className="text-xs text-yellow-600 ">First name only allow letters !!</span> 
                          }                  
                        </div>
  
                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="lname" className='text-sm font-light'>Last Name</label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <input onChange={lnameHandler} type="text" name="lname" id="lname" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1' maxLength={20}/>
                          </div>
                          {
                            validLname &&
                            <span className="text-xs text-yellow-600 ">Last name only allow letters !!</span> 
                          }                   
                        </div>
                      </div>

                      <div className="flex max-md:flex-col gap-5 w-full">
                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="sex" className='text-sm font-light'>Gender <span className="text-red-600">*</span></label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <select onChange={(e) => setUserInfo({...userInfo, ['gender']: e.target.value})} name="gender" id="gender" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1 appearance-none' required>
                              <option value="" className='bg-white' disabled selected>select</option>
                              <option value="male" className='bg-white' style={{}} >Male</option>
                              <option value="female" className='bg-white py-5'>Female</option>
                              <option value="other" className='bg-white py-5'>Other</option> 
                            </select>
                          </div>                     
                        </div>

                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="dob" className='text-sm font-light'>Date of Birth <span className="text-red-600">*</span></label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300 p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <ThemeProvider theme={theme}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker onChange={dobHandler} sx={{padding: '20px 20px 20px 0px'}} className='bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1'/>
                              </LocalizationProvider>
                            </ThemeProvider>
                          </div>
                          {
                            validDOB &&
                            <span className="text-xs text-red-500 ">Select valid DOB</span> 
                          }                   
                        </div>
                      </div>

                      <div className="flex max-md:flex-col gap-5 w-full">
                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="number" className='text-sm font-light'>Phone Number <span className="text-red-600">*</span></label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <input onChange={PHnumberHandler} type="text" name="" id="number" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1 appearance-none' required maxLength={10} min={1} inputMode='numeric'/>
                          </div>
                          {
                            validPHnumber &&
                            <span className="text-xs text-red-500 ">Phone number must contain 10 digit numbers !!</span> 
                          }                      
                        </div>
  
                        <div className="flex flex-col gap-2 md:w-1/2 w-full">
                          <label htmlFor="fname" className='text-sm font-light'>Email <span className="text-red-600">*</span></label>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <input onChange={emailHandler} type="email" name="" id="fname" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1' placeholder='xyz@gmail.com' required maxLength={30} />
                          </div>
                          {
                            validEmail &&
                            <span className="text-xs text-red-500 ">Enter valid email <span className="text-gray-600">(eg: xyz@gmail.com)</span></span> 
                          }             
                        </div>
                      </div>

                      <div className="flex gap-5 w-full">
                        <div className="flex flex-col gap-2 w-full">
                          <div className='flex justify-between items-center'>
                            <label htmlFor="address" className='text-sm font-light'>Address <span className="text-red-600">*</span></label>
                            <span className='text-sm text-gray-500'>{addressLen}/100</span>
                          </div>
                          <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                            <textarea onChange={addressHandler} name="" id="address" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1 max-md:placeholder:text-sm' placeholder='132 My Street/Kingston, New York' required maxLength={100}></textarea>
                          </div>
                          {
                            validAddress &&
                            <span className="text-xs text-red-500 ">Enter valid address !!</span> 
                          }             
                        </div>
                      </div>

                      <div className="flex max-md:flex-col gap-5 w-full">
                        <div className='w-full flex max-md:flex-col-reverse items-center gap-3 md:w-3/4'>
                          <div className='w-max flex gap-1 items-center max-md:mt-3'>
                            <div className="w-24 bg-gray-300 text-center py-2 px-5 rounded-md">
                              <span className="text-xl font-bold tracking-widest">{captcha}</span>
                            </div>
    
                            <button onClick={handleReload} type='button' className='bg-white text-blue-900 px-1 text-center rounded-md'><span class="material-symbols-outlined font-bold text-2xl">refresh</span></button>
                          </div>

                          <div className="w-3/4">
                            <div className='w-full focus-within:bg-gradient-to-r from-purple-300 via-pink-500 to-red-300  p-0 rounded-lg bg-transparent focus-within:p-[1.8px]'>
                              <input onChange={captchaHandler} type="text" name="" id="" className='px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1' placeholder='Enter code' required maxLength={4}/>
                            </div>                     
                          </div>
                        </div>

                        <div className="w-full md:w-1/4">
                          <button onClick={handleSubmit} type='submit' 
                          className='g-recaptcha font-bold text-white px-4 py-2 bg-sky-50 outline-none border-none rounded-lg w-full hover:ring-purple-400 hover:ring-1 bg-gradient-to-r from-purple-300 via-pink-500 to-red-300 flex gap-2 items-center justify-center uppercase'
                          >Submit<span class="material-symbols-outlined">send</span></button>
                        </div>
                      </div>

                      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert
                          onClose={handleClose}
                          severity="warning"
                          variant="filled"
                          sx={{ width: '100%' }}
                        >
                          Complete All Fieds
                        </Alert>
                      </Snackbar>

                      <Snackbar open={openError} autoHideDuration={2000} onClose={handleCloseError} anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
                        <Alert
                          onClose={handleCloseError}
                          severity="error"
                          variant="filled"
                          sx={{ width: '100%' }}
                        >
                          Invalid Captcha Code!!
                        </Alert>
                      </Snackbar>
                    </form>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Registration