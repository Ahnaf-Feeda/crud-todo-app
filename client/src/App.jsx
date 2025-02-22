import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  let [input, setInput] = useState("");
  let [alltodo, setAlltodo] = useState([]);
  let [todoerr, settodoerr] = useState("");
  let [hiddentrue, setHiddentrue] = useState(false)
  let [hidden, setHidden] = useState('hidden')
  let [edit, setEdit] = useState('')
  let [editerr, setEditerr] = useState('hidden')
  let [editid, setEditid] = useState('')

  let handleeditshow = (item) => {
    setHiddentrue(!hiddentrue);
    if(hiddentrue==false){
      setHidden('hidden')
    }if(hiddentrue==true){
      setHidden('')
    };
    setEditid(item._id)
  }

  let handleedit = () => {

    if(edit == ""){
      setEditerr('')
    }else{

      axios.patch(`http://localhost:3000/update/${editid}`, {
        edit: edit
      }).then((data)=>{
        console.log(data);
        toast.success("Todo edited successful!", {
          position: "top-right",
          autoClose: 1600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
    }
  }



  let Handledelete = (item) => {
    let { _id } = item;
    axios.delete(`http://localhost:3000/delete/${_id}`).then((data) => {
      console.log(data);
      toast.success("Good Job!", {
        position: "top-right",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  let handlesubmit = () => {
    if (input == "") {
      settodoerr("No input");
    } else {
      axios
        .post("http://localhost:3000/create", {
          todo: input,
        })
        .then((data) => {
          toast.success("Todo created succesfully!", {
            position: "top-right",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(data.data);
        });
    }

    console.log(input);
  };

  let findall = () => {
    axios.get("http://localhost:3000/find").then((data) => {
      setAlltodo(data.data);
    });
  };
  useEffect(() => {
    findall();
  }, [alltodo]);

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" mt-10 w-[600px] flex justify-center mx-auto">
        <div className=" ml-[610px]">
          <Input
            onChange={(e) => {
              setInput(e.target.value);
              settodoerr("");
            }}
            className=" overflow-auto ml-[]"
            label="Add Todo"
          />
        </div>
        <button
          onClick={handlesubmit}
          className=" align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ml-5"
        >
          {" "}
          ADD
        </button>
          <div className="flex ml-[200px]">
        <div className="relative w-full min-w-[200px] h-10">
            <input
            onChange={(e)=>{
              setEdit(e.target.value);
              setEditerr('hidden')
            }}
              className={`${hidden} peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 overflow-auto`}
              placeholder=" "
            ></input>
            <label className={` ${hidden} flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900`}>
              Edit Todo{" "}
            </label>
          </div>
          <div className=" w-[71px]">

          <button 
          onClick={handleedit}
          className={`${hidden}  align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ml-5`}>
            {" "}
            CONFIRM
          </button>
          
          </div>
          <div className={` text-center w-[40px] ml-[100px]`}>
          <p className={` ${editerr} text-sm text-red-500`}>No Input</p>
          </div>
            
          </div>
      </div>
      <div className=" mx-auto w-[290px] text-sm mt-2 h-[20px]">
        <p className=" text-red-500">{todoerr}</p>
      </div>
      <div className="flex justify-center mt-5">
        <ul className="  pl">
          {alltodo.map((item) => (
            <>
              <div className=" ml-[20px] flex mt-3">
                <li className=" w-[220px] pl-[20px] py-2 ">{item.name} </li>
                <button
                  onClick={() => Handledelete(item)}
                  className=" align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ml-[90px]"
                >
                  Done
                </button>
                <button 
                onClick={()=>{handleeditshow(item)}}
                className=" align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ml-[10px]">
                  Edit
                </button>

                
                <div className=" pl-[20px] flex ">
        </div>
        
                
              </div>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
