import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';

const DetailsCard=(props)=>{

    const [cityDetails,setCityDetails]=useState(['','']);

    useEffect(()=>{
        try{
            setCityDetails(props.cityDetails.split('-'))
        }catch{
            setCityDetails(['','']) 
        }
    },[props.cityDetails])

    return(
        <>
            <Card style={{marginTop:'50px',paddingBottom:'50px'}}>{cityDetails[0]||''}</Card>
            <Card style={{marginTop:'50px',paddingBottom:'50px'}}>{cityDetails[1]||''}</Card>
        </>
    )
}

export default DetailsCard;