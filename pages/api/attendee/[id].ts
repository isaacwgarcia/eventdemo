import { NextApiRequest, NextApiResponse } from "next";
import { readAttendee } from "../../../components/lib/dbUtil";

import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const person = await readAttendee(req.query.id.toString());
  return res.json(person);
});
