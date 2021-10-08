import Instance from "../Helper/axios";
import { URLLOCAL } from "../Helper/baseURL";

export async function GetAllTeacher(pageSize,currentPage,search) {
  try {
    const response = await Instance.get(URLLOCAL + "Teachers/GetTeacher?pageSize=" +
        pageSize +
        "&currentPage=" +
        currentPage +
        "&search=" + 
        search
    );
    return await response.data;
  } catch (error) {
    console.log("error", error);
  }
}