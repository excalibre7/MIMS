import React, { useState, useEffect, useMemo,memo } from "react";
import { Typography, makeStyles, Grid, Button } from "@material-ui/core";
import { Link, useHistory,Redirect } from "react-router-dom";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { motion } from "framer-motion";
import "../styles/grid.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
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
    flexDirection:"row"
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
}));

const defaultColDef = {
  // set every column width
  width: 500,
};

const rowStyle = { background: 'black',backgroundColor:"#ffffff00" };

// set background colour on even rows again, this looks bad, should be using CSS classes
const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
        return { background: 'red' };
    }
};

const Machines = (props) => {
  const history = useHistory();
  const { token, loginStatus ,searchText,setSearchText} = props;
  const [data, setData] = useState([
    {
      MACHINE_NAME:"Machine A",
      MACHINE_ID:"AZO0013",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      FREQUENCY:"30 Days",
      LAST_DATE:"1st December 23",
      NEXT_DATE:"1st January 24",
      STATUS:"ON TIME"
    },
    {
      MACHINE_NAME:"Machine D",
      MACHINE_ID:"AZO0010",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      FREQUENCY:"30 Days",
      LAST_DATE:"1st December 23",
      NEXT_DATE:"1st January 24",
      STATUS:"IN MAINTAINENCE"
    },
    {
      MACHINE_NAME:"Machine B",
      MACHINE_ID:"AZO0017",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      FREQUENCY:"30 Days",
      LAST_DATE:"1st December 23",
      NEXT_DATE:"1st January 24",
      STATUS:"DELAYED"
    },
    {
      MACHINE_NAME:"Machine C",
      MACHINE_ID:"AZO0018",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      FREQUENCY:"30 Days",
      LAST_DATE:"1st December 23",
      NEXT_DATE:"1st January 24",
      STATUS:"BREAKDOWN"
    },

  ]);
  const { height, width } = useWindowDimensions();
  const [filteredData, setFilteredData] = useState([]);
  const classes = useStyles();

const onRowClicked = (event: RowClickedEvent) => {  console.log(event)
                                                    // history.push({
                                                    //             pathname:'/placeBid',
                                                    //             state:{data:event.data}
                                                    //           })
                                                  
                                                            };


interface RowClickedEvent {
  node: RowNode;
  // The user provided data for the row 
  data: any;
  // The visible row index for the row 
  rowIndex: number | null;
  // Either 'top', 'bottom' or null / undefined (if not set) 
  rowPinned: string | null;
  // The context as provided on `gridOptions.context` 
  context: any;
  // If event was due to browser event (eg click), this is the browser event 
  event?: Event | null;
  api: GridApi;
  columnApi: ColumnApi;
  // Event identifier 
  type: string;
}

const RenderLD = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.LAST_DATE}</div>
        </span>
  );
});

const RenderND = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.NEXT_DATE}</div>
        </span>
  );
});

const RenderFreq = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.FREQUENCY}</div>
        </span>
  );
});
const RenderStatus = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right",borderRadius:10,
              color:params.data.STATUS=="ON TIME"?"#98f59f":
              params.data.STATUS=="DELAYED"?"#ff8800":
              params.data.STATUS=="IN MAINTAINENCE"?"#f5e86e":
              params.data.STATUS=="BREAKDOWN"?"#e4000f":"#f5e86e"
              }}>{ params.data.STATUS}</div>
        </span>
  );
});

const columnDefs = useMemo( ()=> [
  {field:"MACHINE_NAME",headerName:"Machine",width:width*.12,filter:true,sortable:true},
  {field:"MACHINE_ID",headerName:"ID",width:width*.1,filter:true,sortable:true},
  {field:"MACHINE_TYPE",headerName:"Type",width:width*.12,filter:true},
  {field:"BRAND",headerName:"Brand",width:width*.10,filter:true},
  {field:"LOCATION",headerName:"Location",width:width*.12,filter:true},
  {field:"LAST_DATE",headerName:"Last Date",width:width*.10,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderLD} ,
  {field:"NEXT_DATE",headerName:"Next Date",width:width*.10,filter:true,headerClass: "ag-right-aligned-header",cellRendererFramework: RenderND},
  {field:"FREQUENCY",headerName:"Frequency",width:width*.10,filter:true,headerClass: "ag-right-aligned-header",cellRendererFramework: RenderFreq},
  {field:"STATUS",headerName:"Status",width:width*.10,filter:true,headerClass: "ag-right-aligned-header",cellRendererFramework: RenderStatus},
], []);

  if(loginStatus!=1){
      return <Redirect to="/" />;
  }
  else{
  return (
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
      <div className="ag-theme-alpine" style={{height: "80vh", width: "100%"}}>
            <AgGridReact
              defaultColDef={defaultColDef}
              animateRows={true}
              onRowClicked={onRowClicked}
              rowStyle={rowStyle} getRowStyle={getRowStyle}
              columnDefs={columnDefs}
              rowData={data}/>
        </div>
      </div>
      <div className={classes.bottomRightSubmit}>
        <div className={classes.trianb}></div>
      </div>
  </motion.div>
  );
  }
};

export default Machines;
