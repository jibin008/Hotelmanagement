import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import {useParams } from 'react-router-dom'

function EditRoom()  {
debugger
    const {room_id}=useParams();
    const [formData,setFormData]=useState({
        
        room_Type:'',
        rate:'',
        max_Adlt_cnt:0,
        max_Chld_cnt:0,
        description:''
    })
    const [values,setValues]=useState([]);
const handleValueSelect=(values)=>{
    debugger

    setFormData({
        room_Type:values.room_Type,
        rate:values.rate,
        max_Adlt_cnt:values.max_Adlt_cnt,
        max_Chld_cnt:values.max_Chld_cnt,
        description:values.description
    });
};

const handleUpdateRoom=(editID)=>{
     debugger;
    
    const url= `https://localhost:7080/api/Test/${editID}`;
    const data={
      "Room_Type": values.room_Type,
      "Rate":values.rate,
      "Max_Adlt_cnt":values.max_Adlt_cnt,
      "Max_Chld_cnt": values.max_Chld_cnt,
      "Description":values.description

    }

    axios.put(url,data)
    .then((result) => {
      
        
        // getRoomData();
       // clear();
        if(result="Data has been updated"){
            alert("edited successfully..");
        }
       
      
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const getRoomData=()=>{
    axios.get(`https://localhost:7080/api/Test/GetRoomByID?Room_id=${room_id}`)
.then(res=> {
    
  
   
     setValues ({...values,room_Type:res.data[0].room_Type,rate:res.data[0].rate,max_Adlt_cnt:res.data[0].max_Adlt_cnt, max_Chld_cnt:res.data[0].max_Chld_cnt,description:res.data[0].description});
    
})
.catch(err => console.log(err))
  }

useEffect(()=>{
    
getRoomData();

},[])

  return (
      <div>
          <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
              <div className='w-50 border bg-secondary text-white p-5'>
                  <form >
                      <div>
                          <label htmlFor="name">Room type </label>
                          <input type="text" name='Roomtype' className='form-control' value={values.room_Type}  onChange={e=>setValues({room_Type:e.target.value})} />
                      </div>
                      <div>
                          <label htmlFor="rate">Rate </label>
                          <input type="text" name='Rate' className='form-control' value={values.rate} onChange={e=>setValues({rate:e.target.value})}/>
                      </div><br/>
                      <div>
                          <label htmlFor="Adlt_count">Adult Count </label>
                          <input type="text" name='AdultCount' className='form-control' value={values.max_Adlt_cnt} onChange={e=>setValues({...values,max_Adlt_cnt:e.target.value})}/>
                      </div><br/>
                      <div>
                          <label htmlFor="child_count">Child count</label>
                          <input type="text" name='Childcount' className='form-control' value={values.max_Chld_cnt} onChange={e=>setValues({...values,max_Chld_cnt:e.target.value})}/>
                      </div><br/>
                      <div>
                          <label htmlFor="description">Description </label>
                          <input type="text" name='Description' className='form-control'   value={values.description}  onChange={e=>setValues({...values,description:e.target.value})}/>
                      </div><br/>
                      <button className='btn btn-info' onClick={handleUpdateRoom(room_id)}>Update</button>
                  </form>
              </div>
          </div>



      </div>
  )
}

        


        

export default EditRoom