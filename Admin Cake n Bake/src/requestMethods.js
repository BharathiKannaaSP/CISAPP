import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc4Yzk5ZjM0MTQ4MWJmMjI0NTlkMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzM5MjkxNSwiZXhwIjoxNjM3NjUyMTE1fQ.JkklmowxtjP3zNG2eFawrgkTlKDJCK3riP5YcRy6aSk"

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});




