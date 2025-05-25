import React, { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Admin_Dashboard.css'
import { styled } from '@mui/material/styles';
import Tablenew from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  

  export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
//new paste
const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 4,
  })
  const [isToggleOpen, setIsToggleOpen] = useState(false)


  const wrapperRef = useRef(null)

  const handleKeyDown = e => {
    if (e.keyCode === 39) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab >= 1 &&
          tabSelected.currentTab < tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab + 1,
          })
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: 1,
          })
        }
      }
    }

    if (e.keyCode === 37) {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        if (
          tabSelected.currentTab > 1 &&
          tabSelected.currentTab <= tabSelected.noTabs
        ) {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.currentTab - 1,
          })
        } else {
          setTabSelected({
            ...tabSelected,
            currentTab: tabSelected.noTabs,
          })
        }
      }
    }
  }


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })


  // // add room function call start 

  const [Roomtype, setRoomType] = useState('');
  const [Rate, setRate] = useState('');
  const [Adultcnt, setAdultCnt] = useState('');
  const [Childcnt, setChildCnt] = useState('');
  const [Descri, setDescription] = useState('');

  const handleRoomTypeChange = (value) => {
    setRoomType(value);
  };


  const handleRateChange = (value) => {
    setRate(value);
  };


  const handleAdultsChange = (value) => {
    setAdultCnt(value);
  };

  const handleChildChange = (value) => {
    setChildCnt(value);
  };

  const handleDescChange = (value) => {
    setDescription(value);
  };

  const handleEdit = () => {
    debugger;


    const data = {
      Room_Type: Roomtype,
      Rate: Rate,
      Max_Adlt_cnt: Adultcnt,
      Max_Chld_cnt: Childcnt,
      Description: Descri

    };

    const url = 'https://localhost:7080/api/Test/Add_Room'
    axios.post(url, data).then((result) => {
      debugger;
      if (result.data == 'Room added.') {
        debugger;
        alert("Room added successfully");

      }

    }).catch((ex) => {

      alert(ex.message);
      
    })
  }

  // // add room function call End

  //room details started
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [name, setName] = useState('')
  const [phonNo, setPhonNo] = useState('')
  const [Email, setEmail] = useState('')
  const [Address, setAddress] = useState('')
  const [isActive, setIsActive] = useState(0)


  // Get guest details
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();

  }, [])

  const getData = () => {
    debugger;
    axios.get('https://localhost:7080/api/Test/GetUsers')
      .then((result) => {
        debugger;
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //Get room details
  const [getroomType, set_Room_Type] = useState('')
  const [getrate, set_Rate] = useState(0)
  const [getadltcnt, set_Adltcnt] = useState(0)
  const [getchldcnt, set_Chldcnt] = useState(0)
  const [getdesc, set_Desc] = useState('')

  

  const [data1, setRoomData] = useState([]);
  useEffect(() => {

    getRoomData();
  }, [])

  const getRoomData = () => {
    debugger;
    axios.get('https://localhost:7080/api/Test/GetRoomDetails')
      .then((result) => {
        debugger;
        setRoomData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  //room details end

  //Get Booking details

  const [data3, setBookingData] = useState([]);
  useEffect(() => {

    getBookingData();
  }, [])

  const getBookingData = () => {
    debugger;
    axios.get('https://localhost:7080/api/Test/GetRoomBookingDetails')
      .then((result) => {
        debugger;
        setBookingData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //end Booking details

  //Edit Room detail start
  const [editID,setEditID]=useState('')
  const[editRoomType,setEditRoomType]=useState('')
  const[editRoomRate,setEditRoomRate]=useState('')
  const[editAdltCnt,setEditAdltCnt]=useState('')
  const[editChildCnt,setEditChildCnt]=useState('')
  const[editDesc,setEditDesc]=useState('')



const clear=()=>{
    
setEditRoomType('');
setEditRoomRate('');
setEditAdltCnt('');
setEditChildCnt('');
setEditDesc('');
  }


const handleEditActiveChange=(e)=>{
    if (e.target.checked){
      setIsActive(1);
    }
    else{
      setIsActive(0);
    }
  }


  const handleEditSave=(editIDid)=>{
    debugger;
     const url= `https://localhost:7080/api/Test/${editID}`;
     const data={
       "Room_Type": editRoomType,
       "Rate": editRoomRate,
       "Max_Adlt_cnt":editAdltCnt,
       "Max_Chld_cnt": editChildCnt,
       "Description": editDesc
 
     }

     axios.put(url,data)
     .then((result) => {
       
         
         getRoomData();
         clear();
         alert("edited successfully..");
       
     })
     .catch((error) => {
       console.log(error)
     })
 }




const handleDelete=(id)=>{
    debugger;
      if(window.confirm("Are You Sure To Delete This Room?")==true){
          axios.delete(`https://localhost:7080/api/Test/${id}`)
          .then((result) => {
            if(result.status===200)
            {
              alert("deleted Succesfully");
              getRoomData();
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      
  }


  // const handleDeleteBooking=(id)=>{
  //   debugger;
  //     if(window.confirm("Are You Sure To Delete This Booking?")==true){
  //         axios.delete(`https://localhost:7080/api/Test/${id}`)
  //         .then((result) => {
  //           if(result.status===200)
  //           {
  //             alert("deleted Succesfully");
  //             getRoomData();
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //         })
  //     }
      
  // }


{/* index{1} started */}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

{/* index{1} ended */}

  return (
    <Box
      sx={{ flexGrow: 50, bgcolor: 'background.paper', display: 'flex', height: 500 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 10, borderColor: 'divider' }}
        height={100}
      >
        <Tab label="GUEST DETAILS" {...a11yProps(0)} />
        <Tab label="ADD ROOM " {...a11yProps(1)} />
        <Tab label="ROOM DETAILS" {...a11yProps(2)} />
        <Tab label="BOOKING DETAILS" {...a11yProps(3)} />
        {/* <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
       GUEST DETAILS
       
{/* new table started */}


<TableContainer component={Paper}>
      <Tablenew sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SL NO</StyledTableCell>
            <StyledTableCell align="center">NAME</StyledTableCell>
            <StyledTableCell align="center">PHONE</StyledTableCell>
            <StyledTableCell align="center">MAIL</StyledTableCell>
            <StyledTableCell align="center">ADDRESS</StyledTableCell>
            <StyledTableCell align="center">STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          data && data.length > 0 ?
                  data.map((item, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>

                        <StyledTableCell align="center">{item.name}</StyledTableCell>
                        <StyledTableCell align="center">{item.phoneNo}</StyledTableCell>
                        <StyledTableCell align="center">{item.email}</StyledTableCell>
                        <StyledTableCell align="center">{item.address}</StyledTableCell>
                        <StyledTableCell align="center">{item.isActive}</StyledTableCell>

                      </StyledTableRow>
                    )
                  })
                  :
                  'Loading......'
          
          }
        </TableBody>
      </Tablenew>
    </TableContainer>


{/* new table ended */}

      </TabPanel>
      <TabPanel value={value} index={1}>
     
        <form className="FormAddRoom" sx={{ minWidth: 2000 }}>
ADD ROOM

<Box
component="form"
sx={{ '& .MuiTextField-root': { m: 1, width: '70ch' } }}
noValidate
autoComplete="off"
>
<div>
  <TextField
    id="outlined-error"
    label="Room Type"
    placeholder="Enter room type"
    color="secondary"
    onChange={(e) => handleRoomTypeChange(e.target.value)}
  />
</div>
<div>
  <TextField
    id="outlined-textarea"
    label="Rate per day"
    placeholder="₹"
    color="secondary"
    onChange={(e) => handleRateChange(e.target.value)}
  />

</div>
<div>
  <TextField
    id="outlined-textarea"
    label="Max Adults"
    placeholder="Maximum 6"
    color="secondary"
    type="number"
    onChange={(e) => handleAdultsChange(e.target.value)}
  />
</div>
<div>
  <TextField
    id="outlined-textarea"
    label="Max Childs"
    placeholder="Maximum 4"
    color="secondary"
    type="number"
    onChange={(e) => handleChildChange(e.target.value)}

  />

</div>
<div>
  <TextField
    id="outlined-textarea"
    label="Description"
    placeholder="Room Description"
    multiline
    color="secondary"
    onChange={(e) => handleDescChange(e.target.value)}
  />

</div>
</Box>
<Stack direction="row" spacing={2} marginLeft={37} marginTop={5}>
<Button color="secondary" variant="outlined" onClick={() => handleEdit()}>ADD</Button>
</Stack>
      </form>
      </TabPanel>
      <TabPanel value={value} index={2}>
        ROOM DETAILS
        

<TableContainer component={Paper}>
      <Tablenew sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SL NO</StyledTableCell>
            <StyledTableCell align="center">ROOM TYPE</StyledTableCell>
            <StyledTableCell align="center">RATE PER DAY</StyledTableCell>
            <StyledTableCell align="center">MAX ADULT COUNT</StyledTableCell>
            <StyledTableCell align="center">MAX CHILD COUNT</StyledTableCell>
            <StyledTableCell align="center">DESCRIPTION</StyledTableCell>
            <StyledTableCell align="center">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          data1 && data1.length > 0 ?
                  data1.map((item, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>

                        <StyledTableCell align="center">{item.room_Type}</StyledTableCell>
                        <StyledTableCell align="center">{item.rate}</StyledTableCell>
                        <StyledTableCell align="center">{item.max_Adlt_cnt}</StyledTableCell>
                        <StyledTableCell align="center">{item.max_Chld_cnt}</StyledTableCell>
                        <StyledTableCell align="center">{item.description}</StyledTableCell>
                        <StyledTableCell>
                         
                          <button className="btn btn-danger" onClick={()=>handleDelete(item.room_id)}> Delete</button>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })
                  :
                  'Loading......'
          
          }
        </TableBody>
      </Tablenew>
    </TableContainer>


{/* new table index2 end */}
      </TabPanel>
      <TabPanel value={value} index={3}>
       BOOKING DETAILS
       
<TableContainer component={Paper}>
      <Tablenew sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SL NO</StyledTableCell>
            <StyledTableCell align="center">BOOKING ID</StyledTableCell>
            <StyledTableCell align="center">USER ID</StyledTableCell>
            <StyledTableCell align="center">ROOM ID</StyledTableCell>
            <StyledTableCell align="center">ADULT COUNT</StyledTableCell>
            <StyledTableCell align="center">CHILD COUNT</StyledTableCell>
            <StyledTableCell align="center">BOOKING DATE</StyledTableCell>
            <StyledTableCell align="center">CHECK IN</StyledTableCell>
            <StyledTableCell align="center">CHECK OUT</StyledTableCell>
            <StyledTableCell align="center">NO OF DAYS</StyledTableCell> 
            <StyledTableCell align="center">BOOKING STATUS</StyledTableCell>
            <StyledTableCell align="center">AMOUNT</StyledTableCell>
            <StyledTableCell align="center">TRANSACTION ID</StyledTableCell>
            {/* <StyledTableCell align="center">ACTION</StyledTableCell> */}
            {/* <StyledTableCell align="center">REVIEW</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {
          
          data3 && data3.length > 0 ?
                  data3.map((item3, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>

                        <StyledTableCell align="center">{item3.booking_id}</StyledTableCell>
                        <StyledTableCell align="center">{item3.user_ID}</StyledTableCell>
                        <StyledTableCell align="center">{item3.room_ID}</StyledTableCell>
                        <StyledTableCell align="center">{item3.adlt_cnt}</StyledTableCell>
                        <StyledTableCell align="center">{item3.chld_cnt}</StyledTableCell>
                        <StyledTableCell align="center">{item3.booking_dt}</StyledTableCell>
                        <StyledTableCell align="center">{item3.check_in}</StyledTableCell>
                        <StyledTableCell align="center">{item3.check_out}</StyledTableCell>
                        <StyledTableCell align="center">{item3.no_of_days}</StyledTableCell>
                        <StyledTableCell align="center">{item3.booking_status}</StyledTableCell>
                        <StyledTableCell align="center">{item3.amount}</StyledTableCell>
                        <StyledTableCell align="center">{item3.transaction_id}</StyledTableCell>
                        {/* <StyledTableCell>
                         
                          <button className="btn btn-danger" onClick={()=>handleDeleteBooking(item3.booking_id)}> Delete</button>
                        </StyledTableCell> */}
                        {/* <StyledTableCell align="center">{item3.review}</StyledTableCell> */}
                        
                      </StyledTableRow>
                    )
                  })
                  :
                  'Loading......'
          
          }
        </TableBody>
      </Tablenew>
    </TableContainer>
      </TabPanel>
      
    </Box>
  );
}

//  export default Admin_Dashboard

