// Imports
import React from "react";
// Styles
import classes from "./styles";
// MUI Imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  return (
    <Container sx={classes.container}>
      <Card sx={classes.card}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4">Roast Home Page</Typography>
            <Typography variant="h6">Need to authenticate routes</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
