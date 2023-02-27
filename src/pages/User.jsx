// // import React,{useState} from 'react'
// // import CKEditor from '@ckeditor/ckeditor5-react';
// // import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';
// // // import { ClassicEditor } from 'ckeditor5-custom-build';

// // const User = () => {
// //   const  [addData,setVal]=useState("");
// //   const  [addedData,showData]=useState(0);

// //   const handleDatachange=(e,editor)=>{
// //     const data=editor.getData();
// //     setVal(data)


// //   }


// //   return (
// //     <div>

// //       <h1>CK Editor</h1>

// //       <div style={{width:'700px',display:'inline-block',textAlign:'left'}}>
// //         <div style={{width:'700px',display:'inline-block',textAlign:'right',marginBottom:'5px'}}>
// //           <button style={{backgroundColor:'black',color:'white'}} onClick={()=>showData(!addedData)}>{addedData?'Hide Data':'Show Data'}</button>
// //         </div>

// //         <CKEditor editor={ClassicEditor} data={addData} onchange={handleDatachange} />

// //         <div>
// //           {addedData ? addData:''}
// //         </div>

// //       </div>
// //     </div>
// //   )
// // }

// // export default User


// // import React, { Component } from 'react';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



// // class User extends Component {

  
// //     render() {
// //         return (
// //             <div className="App">
                
// //                 <CKEditor
// //                     editor={ ClassicEditor }
// //                     data="<p>Hello from CKEditor 5!</p>"
// //                     onReady={ editor => {
// //                         // You can store the "editor" and use when it is needed.
// //                         console.log( 'Editor is ready to use!', editor );
// //                     } }
// //                     onChange={ ( event, editor ) => {
// //                         const data = editor.getData();
// //                         console.log( { event, editor, data } );
// //                         <div>{data}</div>
// //                     } }
// //                     onBlur={ ( event, editor ) => {
// //                         console.log( 'Blur.', editor );
// //                     } }
// //                     onFocus={ ( event, editor ) => {
// //                         console.log( 'Focus.', editor );
// //                     } }
// //                 />


// //                 <div><data /></div>
// //             </div>
// //         );
// //     }
// // }




// // import React, { useState } from 'react'
// // import { useRef } from 'react';
// // import JoditEditor from 'jodit-react';


// // const User = () => {
// //     const editor=useRef(null)
// //     const [content,setContent]=useState('')



// //   return (
// //     <div>
// //         <JoditEditor class="text-start content-start h-[100vh]"
// // 			ref={editor}
// // 			value={content}
			
// // 			tabIndex={1} // tabIndex of textarea
// // 			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
// // 			onChange={newContent => setContent(newContent)}
// // 		/>
// //     </div>
// //   )
// // }

// // export default User;



// import React from 'react'
// import  { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import parse from "html-react-parser";
// import { AiOutlineMenu } from "react-icons/ai";
// import Table from 'react-bootstrap/Table';

// const User = () => {
//   const [data, setData] = useState({});

//   const [resultMsg, setResultMsg] = useState("");

//   const [usersList, setUsersList] = useState([]);
//   const [content, setContent] = useState("");

//   const [dropdown, setDropdown] = useState(false);
  
//   const [show, setShow]=useState(false)

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/content")
//       .then((response) => setData(response));
//   }, []);
//   useEffect(() => {
//     if (resultMsg === "User added successfully") {
//       getAPICALL();
//     } else {
//       setResultMsg("");
//     }
//   }, [resultMsg]);

//   useEffect(() => {
//     getAPICALL();
//   }, []);

//   console.log(usersList, "");
//   async function getAPICALL() {
//     const response = await fetch(`http://localhost:9000/content`, {
//       method: "get",
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//       },
//     });

//     const result = await response.json();

//     setUsersList(result);

//     console.log(result, "i am from get api call");
//   }
//   const onSubmit = (items) => {
//     setContent(items);
//   };

//   const openDrop = () => {
//     setDropdown(!dropdown);
//   };

//   let newContentsList = [];
//   const contents =
//     usersList &&
//     usersList?.map((each) =>
//       each.subtitle?.map((item, index) => {
//         newContentsList.push(item.content);
//       })
//     );

//   console.log(
//     newContentsList,
//     "newContentsListlkvmmmmmmmmmmmmmmmmmmmskdnvlksdgggggg"
//   );

//   const htmlFromCMS = newContentsList;
//   console.log(htmlFromCMS, "dangerous html i am cms .........................");
//   console.log(content, "content=====>");


//   return (
//     <div>User
//       {/* <div className="flex flex-row z-40 h-[100vh]  ">
//       <div className="w-[250px] bg-slate-50 h-[100vh] position-fixed overflow-scroll ">
      
//        <ul>
//         {usersList?.map((item) => (
//           <div>
//             <div 
//               class="text-teal-900 text-8px   "
//               onClick={() => openDrop()}
//             >
//               <p>{item.title}</p>
//             </div>

//             {!dropdown ? (
//               <ul class="text-start text-blue-900 text-5px px-3 ">
//                 <li>
//                   {item &&
//                     item?.subtitle?.map((each) => (
//                       <div>
//                         <div
//                           onClick={() => {
//                             onSubmit(each.content);
//                             window.history.replaceState(
//                               null,
//                               "new title",
//                               `/${each.subtitlename}/${each._id}`
//                             );
//                           }}
//                         >
//                           {each.subtitlename}
                         
//                         </div>
                       
//                       </div>
//                     ))}
//                 </li>
//               </ul>
//             ) : null}
//           </div>
//         ))}</ul> 
      
//       </div>
//       <div className="ml-[280px] text-center justify-center ">
//         <div>
//           <div class="mt-[6%] ">
            
//             <div class="border-2 border-green-400  ">{parse(content)}</div>
//             <Link to="/addpages" target="_parent" className="btn btn-danger w-20 mx-5">
//               Back
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//  */}









//     <div>
                
//                 <Table  class="my-3">
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Title</th>
//                             <th>Sub Title</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {usersList?.map((item) => (
//           <>
            
              
//                             <th>
//                                 <div class="text-blue-400">
//                                     <p>{item.id}</p>
//                                 </div>
//                             </th>
//                             <th>
//                                 <div>
//                                     <p>{item.title}</p>
//                                 </div>
//                             </th>
            

//             {!dropdown ? (
//               <>
                
//                   {item &&
//                     item?.subtitle?.map((each) => (
                      
//                         <th
//                           onClick={() => {
//                             onSubmit(each.content);
//                             window.history.replaceState(
//                               null,
//                               "new title",
//                               `/${each.subtitlename}/${each._id}`
//                             );
//                           }}
//                         >
//                           <th>
//                                 <div>
//                                     <p>{each.subtitlename}</p>
//                                 </div>
//                             </th>
                            
                         
//                         </th>
                       
                      
//                     ))}
//                 </>
              
//             ) : null}
//           </>
//         ))}
//                     </tbody>

                    
//                 </Table>
//                 <div className="ml-[280px] text-center justify-center ">
//         <div>
//           <div class="mt-[6%] ">
            
//             <div class="border-2 border-green-400  ">{parse(content)}</div>
//             <Link to="/addpages" target="_parent" className="btn btn-danger w-20 mx-5">
//               Back
//             </Link>
//           </div>
//         </div>
//       </div>

//             </div>
//     </div>
//   )
// }

// export default User;

