import { NextApiRequest, NextApiResponse } from "next";
import { readEvent } from "../../../components/lib/dbUtil";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const event = await readEvent(req.query.id.toString());
  return res.json(event);
});
