import React , {useState} from 'react'

import TextField from '@mui/material/TextField'
import { Card, CardContent, Typography } from '@mui/material';
import {FiSearch} from 'react-icons/fi';
import axios from 'axios';

const RepoRecommend = () => {

 const [username , setUsername] = new useState("");
 const [contributedData , setContributedData] = new useState([]);

 const config = {
    headers: {
      'Authorization': `Bearer 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`,
    },
  };

 const fetchContributions = () => {
    
    axios.get(`https://api.github.com/users/${username}/events`,config)
         .then((res)=>{
            // console.log(res.data);
            setContributedData(res.data);
         })
         .catch((e)=>{
            throw e ;
         })
 }

  return (
    <>
    <TextField id="standard-basic" label="GitHub Username" variant="standard" onChange={(e)=>{setUsername(e.target.value)}} sx={{ textAlign:'center' , margin:'auto' , marginTop:'30px' , width:'300px' , display:'flex' , justifyContent:'center'}}/>
    <Typography variant="h6" component="h4" sx={{textAlign:'center' , marginTop:'20px'}}> {username} {" "} Past Contributions {" "} <FiSearch size={20} onClick={fetchContributions} /> </Typography>
    <div style={{ display: 'flex', overflowX: 'auto'}}>
    {contributedData.map((contribution , index)=>{
        if(contribution.type==='PullRequestEvent'){
            return(
                <>
                <Card key={index} style={{ minWidth: 300, margin: 10 , borderRadius:15 , }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {contribution.repo.name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {contribution.payload.pull_request.title}
                </Typography>
              </CardContent>
            </Card>
                </>
            )
        }
        return null ;
    })};
    </div>
    </>
  )
}

export default RepoRecommend;