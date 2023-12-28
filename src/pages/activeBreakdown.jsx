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

const ActiveBreakdowns = (props) => {
  const history = useHistory();
  const { token, loginStatus ,searchText,setSearchText} = props;
  const [data, setData] = useState([
    {
      MACHINE_NAME:"Machine A",
      MACHINE_ID:"AZO0013",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      LAST_DATE:"1st December 23",
      WARRANTY:"15 Years - Valid",
      PURCHASE_DATE:"1st Nov 2012",
      BREAKDOWN_DATE:"1st Nov 2023",
      MECHANIC:"Ram Prasad"
    },
    {
      MACHINE_NAME:"Machine D",
      MACHINE_ID:"AZO0010",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      LAST_DATE:"1st December 23",
      WARRANTY:"15 Years - Valid",
      PURCHASE_DATE:"1st Nov 2012",
      BREAKDOWN_DATE:"1st Nov 2023",
      MECHANIC:"Ram Prasad"
    },
    {
      MACHINE_NAME:"Machine B",
      MACHINE_ID:"AZO0017",
      BRAND:"Brother",
      MACHINE_TYPE:"Sewing Machine",
      LOCATION:"Faridabad,Haryana",
      LAST_DATE:"1st December 23",
      WARRANTY:"15 Years - Invalid",
      PURCHASE_DATE:"1st Nov 2002",
      BREAKDOWN_DATE:"1st Nov 2023",
      MECHANIC:"Ram Prasad"
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

const RenderW = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.WARRANTY}</div>
        </span>
  );
});

const RenderPD = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.PURCHASE_DATE}</div>
        </span>
  );
});

const RenderBD = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.BREAKDOWN_DATE}</div>
        </span>
  );
});

const RenderM = memo( (params) => {
  return (
        <span className="my-renderer">
            <div style={{justifyContent:"center",textAlign:"right"}}>{ params.data.MECHANIC}</div>
        </span>
  );
});


const columnDefs = useMemo( ()=> [
  {field:"MACHINE_NAME",headerName:"Machine",width:width*.08,filter:true,sortable:true},
  {field:"MACHINE_ID",headerName:"ID",width:width*.08,filter:true,sortable:true},
  {field:"MACHINE_TYPE",headerName:"Type",width:width*.1,filter:true},
  {field:"BRAND",headerName:"Brand",width:width*.06,filter:true},
  {field:"LOCATION",headerName:"Location",width:width*.1,filter:true},
  {field:"LAST_DATE",headerName:"Last Date",width:width*.1,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderLD} ,
  {field:"WARRANTY",headerName:"Warranty",width:width*.12,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderW} ,
  {field:"PURCHASE_DATE",headerName:"Purchase Date",width:width*.12,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderPD} ,
  {field:"BREAKDOWN_DATE",headerName:"Breakdown Date",width:width*.12,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderBD} ,
  {field:"MECHANIC",headerName:"Mechanic",width:width*.1,filter:true,headerClass: "ag-right-aligned-header", cellRendererFramework: RenderM} ,
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

export default ActiveBreakdowns;
