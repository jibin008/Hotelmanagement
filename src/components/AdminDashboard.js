import React, { useState, useRef, useEffect } from "react"

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
import '../Admin/AdminDashboard.css';


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

 

    const handleRoom_Edit=(id)=>{
      debugger;
      handleShow();
      getModalRoomData(id);
      // axios.get(`https://localhost:7080/api/Test/GetRoomByID?Room_id=${id}`)
      // .then((result) => {
      //   setEditRoomType(result.data.Room_Type);
      //   setEditRoomRate(result.data.rate);
      //   setEditAdltCnt(result.data.Adultcnt);
      //   setEditChildCnt(result.data.Childcnt);
      //  setEditDesc(result.data.description);
      //  setEditID(id);
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
      
  }
  const handleDelete=(id)=>{
    debugger;
      if(window.confirm("Are You Sure To Delete This Employee")==true){
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


  //Modal edit start
  const [data2, setModalRoomData] = useState('');
  // useEffect(() => {
  //   debugger
  //   setEditRoomType(data2.room_Type);
  //   setEditRoomRate(data2.rate);
  //   setEditAdltCnt(data2.max_Adlt_cnt);
  //   setEditChildCnt(data2.max_Chld_cnt);
  //   setEditDesc(data2.description);
  //   //getModalRoomData(id);
  // }, [])

  const getModalRoomData = (id) => {
    debugger;
    axios.get(`https://localhost:7080/api/Test/GetRoomByID?Room_id=${id}`)
      .then((result) => {
        debugger;
     // setModalRoomData(result.data)
        setEditRoomType(result.data.Room_Type);
        setEditRoomRate(result.data.rate);
        setEditAdltCnt(result.data.Adultcnt);
        setEditChildCnt(result.data.Childcnt);
       setEditDesc(result.data.description);
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

   const handleFirstNameChange = e => {
    debugger;
    setEditRoomType({ editRoomType: e.target.value });
};

  const [ModalRoomtype, setModalRoomType] = useState('');
  const [ModalRate, setModalRate] = useState('');
  const [ModalAdultcnt, setModalAdultCnt] = useState('');
  const [ModalChildcnt, setModalChildCnt] = useState('');
  const [ModalDescri, setModalDescription] = useState('');

  const handleModalRoomTypeChange = (value) => {
    debugger;
    setModalRoomType(value);
  };


  
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
          <Tab label="ROOM MANAGEMENT" {...a11yProps(1)} />
          <Tab label="ROOM DETAILS" {...a11yProps(2)} />
          <Tab label="BOOKING DETAILS" {...a11yProps(3)} />
          {/* <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
         GUEST DETAILS
         <div className="guest_dtl">

         
         <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL NO</th>

                  <th>NAME</th>
                  <th>PHONE NO</th>
                  <th>MAIL</th>
                  <th>ADDRESS</th>
                  <th>STATUS</th>

                </tr>
              </thead>
              <tbody>
                {
                  data && data.length > 0 ?
                    data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>{item.name}</td>
                          <td>{item.phoneNo}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>{item.isActive}</td>

                        </tr>
                      )
                    })
                    :
                    'Loading......'
                }


              </tbody>
        </Table>
        </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          
          <form className="FormAddRoom">


<Box
  component="form"
  sx={{ '& .MuiTextField-root': { m: 2, width: '85ch' } }}
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
<Stack direction="row" spacing={2} marginLeft={43} marginTop={5}>
  <Button color="secondary" variant="outlined" onClick={() => handleEdit()}>ADD</Button>
</Stack>
        </form>
        </TabPanel>
        <TabPanel value={value} index={2}>
          ROOM DETAILS
          <Table striped bordered hover>
              <thead>
                <tr>
                  <th>SL NO</th>

                  <th>ROOM TYPE</th>
                  <th>RATE PER DAY</th>
                  <th>MAXIMUM ADULT COUNT</th>
                  <th>MAXIMUM CHILD COUNT</th>
                  <th>DESCRIPTION</th>

                </tr>
              </thead>
              <tbody>
                {
                  data1 && data1.length > 0 ?
                    data1.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>{item.room_Type}</td>
                          <td>{item.rate}</td>
                          <td>{item.max_Adlt_cnt}</td>
                          <td>{item.max_Chld_cnt}</td>
                          <td>{item.description}</td>
                          <td colSpan={2}>
                            <button className="btn btn-primary" onClick={()=>handleRoom_Edit(item.room_id)}> Edit</button>&nbsp;&nbsp;
                            <button className="btn btn-danger" onClick={()=>handleDelete(item.room_id)}> Delete</button>


                          </td>
                        </tr>
                      )
                    })
                    :
                    'Loading......'
                }


              </tbody>
            </Table>
        </TabPanel>
        <TabPanel value={value} index={3}>
         BOOKING DETAILS
        </TabPanel>
        {/* <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel> */}
      </Box>
    );
  }
