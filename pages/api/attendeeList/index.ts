import { NextApiRequest, NextApiResponse } from "next";
import { searchAttendeeByIds } from "../../../components/lib/dbUtil";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  let singleString = [];
  if (typeof req.query.id === "string") {
    singleString = [`${req.query.id}`];
  } else {
    singleString = req.query.id;
  }
  const attendees = await searchAttendeeByIds(singleString);

  return res.json(attendees);
});
