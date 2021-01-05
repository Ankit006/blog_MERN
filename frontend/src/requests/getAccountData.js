import axios from "axios";

async function getAccountData(token, setUsername, setLoading, setEmail) {
  const response = await axios.get("/api/getUserData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.data.error) {
    setUsername(response.data.username);
    setEmail(response.data.email);
    setLoading(false);
  }
}

export default getAccountData;
