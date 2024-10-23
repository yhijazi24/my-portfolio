import { useEffect, useState } from 'react';
import './css/homeProjects.css';
import { getHomeProjects, updateHomeProject } from "../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { Publish } from '@mui/icons-material';
import Sidebar from '../conponents/Sidebar';
import Topbar from '../conponents/Topbar';

const HomeProject = () => {
  const [projectData, setProjectData] = useState([]);
  const [updatedProjects, setUpdatedProjects] = useState([]);
  const [files, setFiles] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getHomeProjects();
      setProjectData(projects || []);
      setUpdatedProjects(projects || []);
    };
    fetchProjects();
  }, []);

  const handleInputChange = (projectId, e) => {
    const { name, value } = e.target;
    setUpdatedProjects((prev) =>
      prev.map((project) =>
        project._id === projectId ? { ...project, [name]: value } : project
      )
    );
  };

  const handleFileChange = (projectId, e) => {
    setFiles({ ...files, [projectId]: [...e.target.files] });
  };

  const handleDeleteImage = (projectId, imageUrl) => {
    setUpdatedProjects((prev) =>
      prev.map((project) =>
        project._id === projectId
          ? { ...project, img: project.img.filter((img) => img !== imageUrl) }
          : project
      )
    );
  };

  const handleUpdate = async (projectId, e) => {
    e.preventDefault();
    const storage = getStorage(app);

    const project = updatedProjects.find((proj) => proj._id === projectId);
    let uploadedImages = project.img || [];

    try {
      if (files[projectId] && files[projectId].length > 0) {
        for (let file of files[projectId]) {
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          const downloadURL = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => {
                console.error("File upload failed:", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              }
            );
          });

          uploadedImages.push(downloadURL);
        }
      }

      const updatedData = { ...project, img: uploadedImages };
      await updateHomeProject(projectId, updatedData);
      setSuccess(true);
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Project update failed.");
    }
  };

  return (<>
    <Topbar />
        <Sidebar />
    <div className="homeProject">
      {projectData.length > 0 ? (
        updatedProjects.map((project) => (
          <div className="homeProjectItem" key={project._id}>
            <span className="homeProjectTitle">{project.title}</span>
            <div className="homeProjectImageContainer">
              {project.img?.length > 0 ? (
                project.img.map((image, index) => (
                  <div key={index} className="imageWrapper">
                    <img
                      src={image || "https://via.placeholder.com/150"}
                      alt={`${project.title} Image ${index + 1}`}
                      className="homeProjectImage"
                    />
                    <button
                      className="deleteImageButton"
                      onClick={() => handleDeleteImage(project._id, image)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <form className="homeProjectForm" onSubmit={(e) => handleUpdate(project._id, e)}>
              <div className="homeProjectField">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={project.title || ''}
                  onChange={(e) => handleInputChange(project._id, e)}
                />
              </div>
              <div className="homeProjectField">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subTitle"
                  value={project.subTitle || ''}
                  onChange={(e) => handleInputChange(project._id, e)}
                />
              </div>
              <div className="homeProjectField">
                <label>Upload New Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(project._id, e)}
                />
                <Publish className="uploadIcon" />
              </div>
              <button type="submit">Update Project</button>
            </form>
            {success && <p className="successMessage">Project updated successfully!</p>}
            {error && <p className="errorMessage">{error}</p>}
          </div>
        ))
      ) : (
        <p>No projects available</p>
      )}
    </div></>
  );
};

export default HomeProject;
