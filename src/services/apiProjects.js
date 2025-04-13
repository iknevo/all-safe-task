import toast from "react-hot-toast";
import { projects } from "../data/projectsData";
import { API_URL } from "../utils/constants";

export async function getAllProjects() {
  try {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    toast.error("There was an error getting projects, try again!");
  }
}

export async function uploadAllProjects() {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projects),
    });
    return res.json();
  } catch (err) {
    console.error(err);
    toast.error("There was an error getting projects, try again!");
  }
}
