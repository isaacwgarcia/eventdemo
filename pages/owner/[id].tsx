import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { getOwner } from "../../components/lib/api";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function Owner(data: any) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      {data.events !== undefined ? (
        data.events.map((item, k) => {
          let list = data.events[k].attendees;
          return (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: 10,
                  backgroundColor: "black",
                  my: "10px",
                }}
              />
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src="https://picsum.photos/200/300" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        <h4>{data.events[k].name}</h4>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <p>{data.events[k].location}</p>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>{" "}
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      <h4>List of Attendees</h4>
                    </Typography>

                    {list !== undefined ? (
                      list.map((attendee, i) => {
                        return (
                          <Typography variant="body2" gutterBottom key={i}>
                            {attendee.name}
                          </Typography>
                        );
                      })
                    ) : (
                      <Typography variant="body2" gutterBottom>
                        No attendees.
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        })
      ) : (
        <>No events.</>
      )}
    </Paper>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "isaac@gmail.com" } }],
    // Enable statically generating additional pages

    fallback: true, //if it didnt render, it will render once requested.
  };
}

export const getStaticProps = async (context: any) => {
  const email = context.params.id;
  const response = await getOwner(email);
  if (response.events)
    return {
      props: {
        email: email,
        events: response.events,
      },
    };
  else {
    return {
      props: {},
    };
  }
};

export default Owner;
