import axios from "axios";
import { ResponseListItem, ResponseDataItem } from "../../../types/response";

// branches
export const getAllBranches = async () => {
  const res = await axios.get("/api/branches");
  return res.data;
};

export const getTotalBranches = async () => {
  const res = await axios.get("/api/branches/count");
  return res.data;
};

export const createNewBranch = async (data: any) => {
  const res = await axios.post("/api/branches", data);
  return res.data;
};

export const getSpecificBranch = async (id: string) => {
  const res = await axios.get(`/api/branches/${id}`);
  return res.data;
};

// Reservations or order
export const getAllCustomer = async () => {
  const res = await axios.get("/api/reservations");
  return res.data;
};

export const createNewReservation = async (data: any) => {
  const res = await axios.post("/api/reservations", data);
  return res.data;
};

export const getReservationsByEmail = async (email: string) => {
  const res = await axios.get(`/api/reservations/${email}`);
  return res.data;
};

// Reviews
export const getAllReviews = async () => {
  const res = await axios.get("/api/feedbacks");
  return res.data;
};

export const createNewReview = async (value: any) => {
  const res = await axios.post("/api/feedbacks", value);
  return res.data;
};

export const getTotalReviews = async () => {
  const res = await axios.get("/api/feedbacks/count");
  return res.data;
};

// user or auth
export const getUserProfile = async (email: string) => {
  const res = await axios.get(`/api/auth/users/${email}`);
  return res.data;
};

export const signUpApi = async (data: any) => {
  const res = await axios.post("/api/auth/signup", data);
  return res.data;
};
