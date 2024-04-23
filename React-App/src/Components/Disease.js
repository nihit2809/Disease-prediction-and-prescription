import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, Typography } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import {medicalConditions} from "../Store/Diseases"
const useStyles = makeStyles({
  main: {
    color: "white",
    background: "#100041",
    marginTop: "5rem",
    paddingBottom: "3rem",
  },
  tableMain: {
    width: "90%",
    border: "0.1rem white solid",
    borderBottom: "none",
    height: "100vh",
    margin: "5%",
    textAlign: "center",
  },
  tableRow: {
    height: "20%",
    display: "flex",
  },
  tableColumn1: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRight: "0.1rem white solid",
    borderBottom: "0.1rem white solid",
  },
  tableColumn2: {
    width: "70%",
    overflow: "auto",
    padding: "1rem",
    borderBottom: "0.1rem white solid",
  },
  btn: {
    fontSize: "1.6rem",
    fontFamily: "Times New Roman",
    color: "black",
    border: "0.15rem solid grey",
    background: "white",
    width: "18rem",
    height: "3rem",
    borderRadius: "0.6rem",
    // marginRight: "3rem",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
  },
});
const Disease = (disease) => {
  const [response, setResponse] = useState(null);
  const dis = disease.data;
  useEffect(() => {
    // const apiCall = async () => {
    //   const res = await axios.get(
    //     `https://disease-info-api.herokuapp.com/diseases/${dis}.json`
    //   );
    //   setResponse(res.data.disease);
    // };
    function findTreatment(medicalCondition) {
      // Convert the input to lowercase for case-insensitive matching
      const originalMedicalConditions = {};
      for (const key in medicalConditions) {
        originalMedicalConditions[key.toLowerCase()] = medicalConditions[key];
    }
    
      const conditionLower = medicalCondition.toLowerCase();
      
      // Check if the lowercase key exists in the hashmap
      // console.log(conditionLower)
      if (originalMedicalConditions.hasOwnProperty(conditionLower)) {
          return originalMedicalConditions[conditionLower];
      }
      
      // Check if the uppercase key exists in the hashmap
      if (medicalConditions.hasOwnProperty(medicalCondition)) {
          return medicalConditions[medicalCondition];
      }
      
      // If neither lowercase nor uppercase key is found, return null
      return null;
  }
    
    const finddisease =  () => {
      console.log("data given",dis,typeof dis);
        let temp= findTreatment(dis);
        setResponse(temp)
    };
    dis && finddisease();
  }, [dis]);
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "white",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const classes = useStyles();

  const Search = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };
  return (
    <>
      {response && (
        <div className={classes.main}>
          {response!==null?<>

          <div style={{height:"auto",width:"80%",margin:"auto",marginBottom:"2rem",padding:"1rem 2rem 2rem 2rem",border:"1px solid white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <p style={{fontSize:"1.5rem",fontWeight:"500",color:"white"}}>Prescription</p>
            <p style={{display:"flex",   }}>{response}</p>
            </div>
          
          </>:<></>}
          <center>
            <button className={classes.btn} onClick={Search}>
              Search Another Disease
            </button>
          </center>
        </div>
      )}
    </>
  );
};

export default Disease;
