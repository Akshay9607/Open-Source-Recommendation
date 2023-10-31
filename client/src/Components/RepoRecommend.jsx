import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FiSearch } from "react-icons/fi";
import { BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
};

const RepoRecommend = () => {
  const [username, setUsername] = new useState("");
  const [contributedData, setContributedData] = new useState([]);

  let uniqueRequests = [];
  let uniqueRepos = [];
  let uniqueInterested = [];
  console.log(uniqueRequests);
  console.log(uniqueRepos);

  const config = {
    headers: {
      Authorization: `Bearer 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`,
    },
  };

  const recommendRepos = () => {

  }

  const fetchContributions = () => {
    axios
      .get(`https://api.github.com/users/${username}/events`, config)
      .then((res) => {
        // console.log(res.data);
        setContributedData(res.data);
      })
      .catch((e) => {
        throw e;
      });
  };

  return (
    <>
      <TextField
        id="standard-basic"
        label="GitHub Username"
        variant="standard"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        sx={{
          textAlign: "center",
          margin: "auto",
          marginTop: "30px",
          width: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Typography
        variant="h6"
        component="h4"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        {" "}
        {username} Past Contributions{" "}
        <FiSearch size={20} onClick={fetchContributions} />{" "}
      </Typography>
      <br />
      <Typography
        variant="h5"
        component="h4"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >Based on Pull Requests</Typography>
      <br />
      <div style={{ display: "flex", overflowX: "auto" }}>
        {contributedData.map((contribution, index) => {
          if (
            contribution.type === "PullRequestEvent" &&
            !uniqueRequests.includes(contribution.payload.pull_request.title)
          ) {
            uniqueRequests.push(contribution.payload.pull_request.title);
            return (
              <>
                <Card
                  key={index}
                  style={{ minWidth: 300, margin: 10, borderRadius: 15 }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {contribution.repo.name}
                      {!uniqueRepos.includes(contribution.repo.name)
                        ? uniqueRepos.push(contribution.repo.name)
                        : null}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {contribution.payload.pull_request.title}{" "}
                      <div style={containerStyle}>
                        <Button variant="contained" color="primary">
                          <BsArrowRightCircle />
                        </Button>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </>
            );
          }
          return null;
        })}
        ;
      </div>

      <br />
      <Typography
        variant="h5"
        component="h4"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >Based on Comments</Typography>
      <br />

      <div style={{ display: "flex", overflowX: "auto" }}>
        {contributedData.map((contribution, index) => {
          if (
            contribution.type === "IssueCommentEvent" &&
            !uniqueInterested.includes(contribution.payload.issue.title) &&
            !uniqueRequests.includes(contribution.payload.issue.title) 
          ) {
            uniqueInterested.push(contribution.payload.issue.title);
            return (
              <>
                <Card
                  key={index}
                  style={{ width: 300, margin: 10, borderRadius: 15 }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {contribution.repo.name}
                      {!uniqueRepos.includes(contribution.repo.name)
                        ? uniqueRepos.push(contribution.repo.name)
                        : null}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {contribution.payload.issue.title}{" "}
                      <div style={containerStyle}>
                        <Button variant="contained" color="primary">
                          <BsArrowRightCircle />
                        </Button>
                      </div>
                    </Typography>
                  </CardContent>
                </Card>
              </>
            );
          }
          return null;
        })}
        ;
      </div>

      <br />
      <br />
      <div style={containerStyle}>
        <Button variant="contained" color="primary" onClick={recommendRepos} >
          Recommend
        </Button>
      </div>
      <br /><br />
      
    </>
  );
};

export default RepoRecommend;
