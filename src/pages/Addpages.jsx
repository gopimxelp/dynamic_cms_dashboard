
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Addpages.css';
import Table from 'react-bootstrap/Table';


import React from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRef } from 'react';
import JoditEditor from 'jodit-react';

import {AiOutlineEye} from 'react-icons/ai'


import parse from "html-react-parser";


import Popup from 'reactjs-popup';







const  Dashboard = () => {
    const editor=useRef(null)

    const [show,setShow]=useState(true);

   
    const [content, setContent] = useState("");

    const[validation]=useState(false);


    const [resultMsg, setResultMsg] = useState('')

    const [usersList, setUsersList] = useState([])
    const onSubmit = (items) => {
        setContent(items);
      };

    const [arr, setarr] =  useState([])
    const [data, setData] = useState({
        id: '',
        title: '',
        subtitle:'',
        content: ''
      

       })

       const handleChange = (e) => {


            setData({

                ...data,
                [e.target.name]: e.target.value
            })


       }



       const contentValue = (enteredContent) => {


            if(enteredContent.length !== 0){

                setData({

                    ...data,
                    content: enteredContent
                })
            }


       }


    //    console.log(data, "iam dataaaaaaaaaaaaaaaaaaaaaaaaaaa")


    //    console.log(usersList,"i kknjkjksnfajknsjkdgggggggggggggggggggggggggggggggggggggggggggggggggg userlist")


     const handlesubmit=(e)=>{
      
      e.preventDefault();

      const userDetailsObj = {

        id : data.id,
        title:data.title,
        subtitles:[{

            subtitlename:  data.subtitle,
            content: data.content

        }]

      }
      window.alert("Data added successfully")


      setarr([...arr,userDetailsObj])
      
    /*>>>>>>>>>>>>>>>>>>>>>>>   API CALL TO ADD CONTENT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    async function postAPICALL(){

        const response = await fetch("http://localhost:9000/add-content", {

        method: "post",
        headers: {
            "Content-type":"application/json",
            "Accept":'application/json'
        },
        body: JSON.stringify(userDetailsObj)
        })

        const result = await response.json()

        setResultMsg(result?.message)
        console.log(result, "backend post response")


    }
    
    postAPICALL()
      
        // .then(response => response.json())
        // .then(result => console.log(result, "backemnd post response"))
        // .catch(error => console.log('error', error));

    }





    async function getAPICALL(){

        const response = await fetch(`http://localhost:9000/content`, {

        method: 'get',
        headers:{
            "Content-type":"application/json",
            "Accept":'application/json'

        }
        })

        const result = await response.json()

        setUsersList(result)

        console.log(result, "i am from get api call")


    }




    useEffect(() => {

        if(resultMsg === "User added successfully"){

            getAPICALL()
        }else{

            setResultMsg('')
        }



    }, [resultMsg])

    useEffect(() => {
        getAPICALL()

    }, [])

    console.log(usersList, "iam uderslist")






    const handleedit=(e)=>{
      
        e.preventDefault();
  
        const userDetailsObj = {
  
          id : data.id,
          title:data.title,
          subtitles:[{
  
              subtitlename:  data.subtitle,
              content: data.content
  
          }]
  
        }
        window.alert("Data edited successfully")
  
  
        setarr([...arr,userDetailsObj])
        
      /*>>>>>>>>>>>>>>>>>>>>>>>   API CALL TO ADD CONTENT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
  
      async function updateAPICALL(){
  
          const response = await fetch("http://localhost:9000/updatecontent/:id", {
  
          method: "put",
          headers: {
              "Content-type":"application/json",
              "Accept":'application/json'
          },
          body: JSON.stringify(userDetailsObj)
          })
  
          const result = await response.json()
  
          setResultMsg(result?.message)
          console.log(result, "backend edit response")
  
  
      }
      
      updateAPICALL()
        
          // .then(response => response.json())
          // .then(result => console.log(result, "backemnd post response"))
          // .catch(error => console.log('error', error));
  
      }
  


    let newContentsList = []
    const contents = usersList && usersList?.map((each) => each.subtitle?.map((item) => {

        newContentsList.push(item.content)

    }))

    console.log(newContentsList, "newContentsListlkvmmmmmmmmmmmmmmmmmmmskdnvlksdgggggg")

    const htmlFromCMS =newContentsList
    console.log(htmlFromCMS,"i am cms .........................")



    const preview=(e)=>{
        window.alert(htmlFromCMS,"data")
        const a=parse(htmlFromCMS)
        
        console.log(a," i am parse data")
    }
    


        
   

    return (
        <div>

            <div className="row my-5">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card mt-5" style={{"textAlign":"left"}}>
                            <div className="card-title text-center mt-3">
                                <h2>Documentation Creation</h2>
                            </div>
                            <div className="card-body">
                            
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={data.id} name = "id" onChange={handleChange}  className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input   name="title" onChange={handleChange} className="form-control"></input>
                                        {data.title.length===0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Sub Title</label>
                                            <input value={data.subtitle} name = "subtitle" onChange={handleChange} className="form-control" />
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Content</label>
                                            <input value={data.content} name="content" onChange={handleChange} className="form-control"></input>
                                        </div>
                                     </div> */}
                                     
                                     
                                     <br/><br/><br/>


                                     {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Section</label>
                                            <input value={data.section} name="section" onChange={handleChange} className="form-control"></input>
                                        </div>
                                     </div> */}






                                    <div>
                                        <div className="App">
                                            <label>Content</label>
{/*                     
                                            <CKEditor
                                                editor={ ClassicEditor }
                                                data="" 
                                                onReady={ editor => {
                               data                 onChange={ ( event, editor ) => {
                                                    const data = editor.getData();

                                                    contentValue(data)

                                                    // console.log( { event, editor, data }, "iam dataaa" );
                                                    
                                                } }
                                                onBlur={ ( event, editor ) => {
                                                    console.log( 'Blur.', editor );
                                                } }
                                                onFocus={ ( event, editor ) => {
                                                    console.log( 'Focus.', editor );
                                                } }
                                                value={data} name="content"/>
 */}

                                            <div><JoditEditor class="text-start content-start h-[100vh]"
                                                
                                                onChange={(event) => {

                                                    console.log(event, "iam event")

                                                    contentValue(event)


                                                }}
                                                
                                            /></div>
                                        </div>
                                    </div>

                                    
                                    <div className="col-lg-12 my-2">
                                        <div className="form-group">
                                           <button className="btn bg-green-500 w-30 mx-5" type="submit"   onClick={handlesubmit}>Add</button>
                                           <Link to="/" className="btn btn-danger w-30 mx-5">Back to Home</Link>
                                        </div>
                                    </div> 

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>



            <div>
                
                <Table  class="my-3">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Sub Title</th>
                            <th>Content</th>

                            {/* <th>Section</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList?.map((item)=>(<tr class="border-2x solid black">
                            <th>
                                <div class="text-blue-400">
                                    <p>{item.id}</p>
                                </div>
                            </th>

                            <th>
                                <div>
                                    <p>{item.title}</p>
                                </div>
                            </th>


                            {

                              item &&  item?.subtitle?.map((each) => (
                                <>
                                <th>
                                <div>
                                    <p>{each.subtitlename}</p>
                                </div>
                            </th>


                            <th>
                                <div>Lengthy to display ,So You can preview
                                    {/* <p>{each.content}</p> */}
                                </div>
                            </th>
                                
                                </>


                              )) 
                            }

                            <th class="justify-around">
                                {/* <button class="bg-red-400 w-16 rounded-full text-white" onClicl={handleedit}> Edit</button>
                                <button class="bg-red-600 w-16 rounded-full text-white">Delete</button> */}
                                 <button class=" rounded- text-black" >{item &&
                    item?.subtitle?.map((each) => (
                      
                        <th
                          onClick={() => {
                            onSubmit(each.content);
                            window.history.replaceState(
                              null,
                              "new title",
                              `/${each.subtitlename}/${each._id}`
                            );
                          }}
                        >
                          
                                <div>
                                    <AiOutlineEye/>
                                </div>
                            
                            
                         
                        </th>
                       
                      
                    ))} </button>
                            </th>
                        </tr>))}
                        
                    </tbody>
                </Table>
                

            </div>
            <div className=" text-center justify-center ">
        <div>
          <div class="mt-[6%] ">
            
            <div class="border-2 border-green-400  ">{parse(content)}</div>
            <Link to="/addpages" target="_parent" className="btn btn-danger w-20 mx-5">
              Back
            </Link>
          </div>
        </div>
      </div>
            <div/>

            
            {/* <div>
                <Popup onClick={()=> setShow(!show)} trigger=
                    {<button class="bg-green-500 text-white rounded-full w-24" > Show All Data
                        </button>}
                    position="center center">
                    <div class="mt-[100%]"><Link to="/addpages" target="_parent" className="btn btn-danger w-20 mx-5">Back</Link><div class="border-2 border-red-400 " dangerouslySetInnerHTML={{__html: htmlFromCMS}} >
                        </div></div>
                    
                </Popup>
            </div> */}

            
        </div>
    );
}

export default Dashboard;
