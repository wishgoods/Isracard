
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DetailsCard from '../DeatailsCard/detailscard';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from 'react';

const AutoCompleteBox=()=> {

    const [cities,setCities] = useState([]);
    const [citiesData,setCitiesData] = useState([])
    const [details,setDetails] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        
        fetchCitiesData();
    },[])

    const selectCity=(value)=>{
        let exists = false;
        citiesData.forEach((element)=>{
            let city=null;
            try{city = value.split('-');}catch{city = ['','']}
            if(element.name.trim() === city[0].trim() && element.country.trim() === city[1].trim())
            { 
                setDetails('subcountry :    '+ element.subcountry +'-'+'geonameid :     '+element.geonameid)
                exists = true;
            }
        })
        if(!exists)
        {
            setDetails('');

        }
    }

    const fetchCitiesData = async() => {
        await fetch("https://localhost:44346/Cities") 
          .then(response => {
            return response.json()
          })
          .then(data => {
            setCitiesData(data)
            let citiesarray= []
            
            data.forEach(element => {
                citiesarray.push(element.name.trim() + " - " + element.country.trim())
            });
            setCities(citiesarray)
          })
        setIsLoading(false)
      }

return (
    <>
        <Card>
            < Autocomplete 
                onChange={(event, newValue) => {
                    selectCity(newValue)
                    }}
                style={{paddingLeft:'50px',paddingBottom:'50px',paddingTop:'50px'}}
                disablePortal 
                id="combo-box-demo" 
                options={ cities}
                sx={ { width: 300 } } 
                renderInput={
                    (params)=>
                        < TextField { ...params } label="Cities"/>
                            } 
            />
            {isLoading&&<CircularProgress></CircularProgress>}

        </Card>
        <DetailsCard cityDetails = {details}></DetailsCard>
        </>
        )
}

export default AutoCompleteBox;