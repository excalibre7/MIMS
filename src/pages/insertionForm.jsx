import React, { useState, useEffect,useRef } from "react";
import "../styles/insertionForm.css";
import { 
  makeStyles ,
  withStyles,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput as MuiOutlinedInput,} from "@material-ui/core";
import { Link ,useHistory} from "react-router-dom";
import { motion } from "framer-motion";
import { QrReader } from 'react-qr-reader';
import useWindowDimensions from "../components/useWindowDimensions";

const useStyles = makeStyles((theme) => ({
  primary: {
    width:"99vw",
    display: "flex",
    flexDirection: "column",
    paddingLeft:"2vh",
    minHeight:"100vh",
    flex:1,
    flexGrow:1,
    overflow:"hidden",
    justifyContent:"flex-start",
    fontFamily:"Source",
    backgroundColor: "#0673CB"
  },
  mainform:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginRight:"5vw"
  },
  formCol:{
    display:"flex",
    flexDirection:"column"
  },
  taskbarPC:{
    fontSize:"7vh",
    height:"8vh",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    color:"#f5e86e",
    fontFamily:"Mando",
    justifyContent:"space-between",
  },
  taskbarButtons:{
    display:"flex",
    flexDirection:"row",
    fontSize:25,
    width:"70vw",
    justifyContent:"space-between",
    fontFamily:"Work",
    backgroundColor:"#FFFFFFDD",
    padding:10,
    borderRadius:"100px 0px 0px 100px"
  },
  headerButn:{
    display:"flex",
    justifyContent:"center",
    color:"#0673CB",
    width:"25%",
    transition: "all .1s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      transform: "scale(1.04)",
    }
  },
  scanButton:{
    marginTop:20,
    height:500,
    width:500,
    border: "4px dashed #f5e86e",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:8,
    fontSize:35,
    color:"#f5e86e",
    fontFamily:"Work",
    transition: "all .1s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "none",
      transform: "scale(1.01)",
    },
  },
  button:{
      backgroundImage: "linear-gradient(to right, #ffb347 0%, #ffcc33  51%, #ffb347  100%)",
      margin: 10,
      padding: "15px 45px",
      textAlign: "center",
      transition: "0.5s",
      backgroundSize: "200% auto",
      color: "#0673CB",            
      borderRadius: 10,
      fontSize:18,
      fontFamily:"Work",
      transition: "all .1s ease-in-out",
      "&:hover": {
        cursor: "pointer",
        textDecoration: "none",
        transform: "scale(1.04)",
      }
    },
    select: {
      color: "#f5e86e",
    },
    bottomRightSubmit:{
      position:"absolute",
      bottom:0,
      right:0
    },
    headerText:{
      fontSize:"3.3vh",
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      color:"#f5e86e",
      fontFamily:"Nunito",
      justifyContent:"flex-end",
      width:"100%"
    },
}));

const OutlinedInput = withStyles((theme) => ({
  notchedOutline: {
    borderColor: "#f5e86e !important",
  },
}))(MuiOutlinedInput);


export default function InsertionForm (props) {
  const {setSelectedUser,loginStatus,token,setToken,setEnquiryData} = props

  const classes = useStyles();
  const history = useHistory();
  const { height, width } = useWindowDimensions();
  const [mobileOrPC, setMobileOrPC] = useState("PC");
  const [errmsg, setErrMsg] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [succesfullScan, setSucessfulScan] = useState(false);
  console.log(mobileOrPC)

  const [data, setData] = useState('No result');

  useEffect(() => {
    if(height>width*.9){
      setMobileOrPC("mobile")
    }else if(width>height*.9){
      setMobileOrPC("PC")
    }else{
      console.log("why tf are you using a square?")
    }
  }, [height,width]);

  const getMachineDetails = (code) => {
    fetch("https://rcaapi.bluekaktus.com/auction/getMarketplaceListings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "machine_id": code,
        "client_code": "wearwellstage"
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
      });
  }

  return (
    mobileOrPC=="PC"?
    <motion.div 
      className={classes.primary}>
        <div className={classes.taskbarPC}>
          <div onClick={()=>{
              history.push({
                pathname:'/',
              })
            }}>
            Bk MIMS
          </div>
          <div className={classes.taskbarButtons}>
            <div className={classes.headerButn} onClick={()=>{
              history.push({
                pathname:'/machine',
              })
            }}>Machines</div>
            <div className={classes.headerButn} >Schedule</div>
            <div className={classes.headerButn} onClick={()=>{
              history.push({
                pathname:'/activebreakdown',
              })
            }}>Active Breakdowns</div>
            <div className={classes.headerButn} onClick={()=>{
             history.push({
              pathname:'/activemaintainence',
            })
          }}>Active Maintainence</div>
          </div>
        </div>
        <div className={classes.mainform}>
          <div className={classes.formCol}>
            <div className={classes.scanButton} onClick={()=>{
              setCameraOn(true)
              setSucessfulScan(false)
            }}>
              {cameraOn?
              <QrReader
              scanDelay={0}
              className="qr-reader"
              onResult={(result, error) => {
                if (!!result) {
                  let code = JSON.parse(result.text)
                  console.log(code)
                  if(code.id){
                    getMachineDetails(code)
                  }
                  setSucessfulScan(true)
                  setCameraOn(false)
                }
              }}
           />:<div>SCAN</div>}
            </div>
            <div style={{display:"flex",justifyContent:"center",marginTop:15}}>
              {cameraOn?<div className={classes.button} onClick={()=>setCameraOn(false)}>Close</div>:null}
            </div>
          </div>
          <div className={classes.formCol}>
            <div className={classes.headerText}>Machine Details</div>

          </div>
        </div>
        <div className={classes.bottomRightSubmit}>
          <div className={classes.trianb}></div>
        </div>
    </motion.div>:
     <motion.div 
     className={classes.primary}>
       <div className={classes.taskbar}>

       </div>
       <div className={classes.mainform}>
         <div className={classes.formCol}>
           <p>{data}</p>
         </div>
       </div>
   </motion.div>
  )
}


