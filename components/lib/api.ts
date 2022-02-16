import { APIConnection } from "../../stepzen/stepzenTypes";

async function fetchAPI(query: any, { variables }: APIConnection = {}) {
  const headers = {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${process.env.STEPZEN_API_URL}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getOwner(email: any) {
  try {
    const data = await fetchAPI(
      `
      query MyQuery {
        owner_by_email(email: "${email}") {
          name
          events {
            name
            location
            attendees {
              name
              email
              phone
            }
          }
        }
      }     
      `
    );
    return data?.owner_by_email;
  } catch (e) {
    return e.message;
  }
}
