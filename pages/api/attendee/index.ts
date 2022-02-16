import { createAttendee } from "../../../components/lib/dbUtil";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export default nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
  const id_attendee = await createAttendee(req.body);
  return res.json({ id_person: id_attendee, status: "success" });
});
