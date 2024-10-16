import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"
import { publicRequest, userRequest } from "../../requestMethods";
import {
  getProjectStart,
  getProjectSuccess,
  getProjectFailure,
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailure,
  addProjectStart,
  addProjectSuccess,
  addProjectFailure
} from "./projectRedux";


// redux/apiCalls.js
import { setHomeProjects } from './homeProjectsSlice';


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());

  }
}

export const logoutUser = async (dispatch) => {
  try {

    dispatch(logout());
  } catch (err) {
    console.error("Logout failed:", err);
  }
};



export const getProject = async (id) => {
  try {
      const response = await userRequest.get(`/projects/${id}`);
      console.log('Project data:', response.data); // Log the response data
      return response.data;
  } catch (error) {
      console.error('Error fetching project:', error);
      throw error; // Rethrow the error to handle it in the component
  }
};




export const getAllProjects = async () => {
  try {
      const res = await publicRequest.get('/projects');
      console.log(res.data);
      return res.data;
  } catch (err) {
      console.error("Error fetching projects:", err.message);
      throw new Error(err.message);
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await userRequest.delete(`/projects/${id}`);
    
    return res.data;
  } catch (err) {

    console.error(err.message);
  }
}

export const updateProject = async (id, project, dispatch) => {
  try {
      const res = await userRequest.put(`/projects/${id}`, project);
      console.log(res.data);
      return res.data;
  } catch (err) {
      throw new Error(err.message);
  }
};


export const addProject = async (project) => {
  try {
    console.log('Project Payload:', project); // Log the project data to check its structure
    
    const res = await userRequest.post(`/projects/`, project);
    console.log('Server Response:', res.data); // Log the server response
    
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error("Error Status:", err.response.status);
      console.error("Error Data:", err.response.data);
      console.error("Error Headers:", err.response.headers);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error:", err.message);
    }
    
    throw new Error(
      err.response ? `Server error: ${err.response.data.message}` : err.message
    );
  }
};


export const getHomeHeader = async () => {
  try {
    const res = await userRequest.get(`/homeHeader/`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateHomeHeader = async (headerId, updatedHeader) => {
  try {
    const res = await userRequest.put(`/homeHeader/${headerId}`, updatedHeader);
    return res.data;
  } catch (err) {
    console.error("Error updating home header:", err);
    throw err;
  }
};


// apiCalls.js
export const getHomeProjects = async () => {
  try {
    const res = await userRequest.get(`/homeProject/`);
    return res.data; // Return the data directly
  } catch (err) {
    console.error("Error fetching home projects:", err);
    throw err; // Throw an error to be handled in the component
  }
};
// apiCalls.js
export const updateHomeProject = async (homeProjectId, updatedHomeProject) => {
  try {
    const res = await userRequest.put(`/homeProject/${homeProjectId}`, updatedHomeProject);
    return res.data; // Return the updated project data
  } catch (err) {
    console.error("Error updating home project:", err);
    throw err; // Throw an error to be handled in the component
  }
};

export const getFooter = async () => {
  try {
    const res = await userRequest.get(`/footer/`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateFooter = async (footerId, updatedFooter) => {
  try {
    const res = await userRequest.put(`/footer/${footerId}`, updatedFooter);
    return res.data;
  } catch (err) {
    console.error("Error updating footer:", err);
    throw err;
  }
};

export const getSubmissions = async () => {
  try {
      const res = await userRequest.get('/contact/submissions');
      console.log(res.data);
      return res.data;
  } catch (err) {
      console.error("Error fetching submissions:", err.message);
      throw new Error(err.message);
  }
};