import React, { useEffect, useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axios from "axios";
function App() {
  const [supes, setSupes] = useState([]);
  
  const [text, setText] = useState("");

  const search = (event) => {
    setText(event.target.value);
  };


  useEffect(() => {
    const call = (e) => {
    axios
      .get(e)
      .then(function (response) {
          setSupes([]);
          const res = response.data.results;
            for (let i = 0; i < res.length; i++) {
              let local = {
                name: res[i].name,
                image: res[i].image.url,
                gender: res[i].appearance.gender,
                publisher: res[i].biography.publisher,
                power: res[i].powerstats.power,
                speed: res[i].powerstats.speed,
                strength: res[i].powerstats.strength,
              };
              setSupes((old) => [...old, local]);
          }
      })
      .catch(function (error) {
        console.log(error);
      });
    };
      if(text){
        let url = "https://www.superheroapi.com/api.php/2333325386831584/search/";
        let final = url.concat(text);
        call(final);
      }
      else{
        call("https://www.superheroapi.com/api.php/2333325386831584/search/a")
      }
  }, [text]);

  return (
    <div className="container">
      <div className="con">
        <div className="stack head" Style="--stacks: 3;">
          <span Style="--index: 0;">SUPERHEROES</span>
          <span Style="--index: 1;">SUPERHEROES</span>
          <span Style="--index: 2;">SUPERHEROES</span>
        </div>
      </div>
      <div className="searchdiv">
        <TextField
          id="outlined-basic"
          label="Search SUPES"
          variant="outlined"
          className="search"
          onChange={search}
        />
      </div>

      <div className="carddiv">
        {supes.map((hero) => {
          return (
            <Card className="card">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={400}
                  image={hero.image}
                  alt="green iguana"
                />
                <CardContent className="cardcon">
                  <Typography gutterBottom variant="h4" component="div">
                    {hero.name}
                  </Typography>
                  <Typography variant="h6">
                    GENDER : {hero.gender} | POWER : {hero.power}
                    <br></br>
                    SPEED : {hero.speed} | STRENGTH : {hero.strength}
                    <br></br>
                    PUBLISHER : {hero.publisher}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
