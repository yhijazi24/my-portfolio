import { useState } from 'react';
import './css/newProject.css';  
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/apiCalls";
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';
import { useTranslation } from 'react-i18next';

const NewProject = () => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    titleFr: '',
    desc: '',
    descFr: '',
    fullDesc: '',
    fullDescFr: '',
    lang: [],
    webLink: '',
    githubLink: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lang") {
      const languagesArray = value.split(',').map(lang => lang.trim());
      setInputs((prev) => ({
        ...prev,
        [name]: languagesArray,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const storage = getStorage(app);
      const imgUrls = [];
      const filesArray = Array.from(files); // Convert FileList to Array

      filesArray.forEach((fileItem) => {
        const fileName = new Date().getTime() + fileItem.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileItem);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("File upload failed:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            imgUrls.push(downloadURL);

            if (imgUrls.length === filesArray.length) {
              const newProject = { ...inputs, img: imgUrls };
              addProject(newProject, dispatch);
              setSuccessMessage('Project created successfully!'); // Show success message
            }
          }
        );
      });
    } else {
      addProject(inputs, dispatch);
      setSuccessMessage('Project created successfully!'); // Show success message
    }
  };

  return (<>
    <Topbar />
        <Sidebar />
    <div className="newProject">
      <h1 className="newProjectTitle">New Project</h1>
      <form className="newProjectForm" onSubmit={handleSubmit}>
        <div className="newProjectItem">
          <label>Project Title</label>
          <input
            type="text"
            name="title"
            placeholder="Project title"
            value={inputs.title}
            onChange={handleChange}
          />
          <label>French Title</label>
<input name="titleFr" value={inputs.titleFr} onChange={handleChange} />

        </div>
        <div className="newProjectItem">
          <label>Description</label>
          <textarea
            name="desc"
            placeholder="Short description"
            value={inputs.desc}
            onChange={handleChange}
            rows="3"
          />
          <label>French Title</label>
<input name="descFr" value={inputs.descFr} onChange={handleChange} />

        </div>
        <div className="newProjectItem">
          <label>Full Description</label>
          <textarea
            name="fullDesc"
            placeholder="Detailed description"
            value={inputs.fullDesc}
            onChange={handleChange}
            rows="6"
          />
          <label>French Title</label>
<input name="fullDescFr" value={inputs.fullDescFr} onChange={handleChange} />

        </div>
        <div className="newProjectItem">
          <label>Languages</label>
          <input
            type="text"
            name="lang"
            placeholder="e.g. en, fr, es"
            value={inputs.lang.join(', ')}
            onChange={handleChange}
          />
        </div>
        <div className="newProjectItem">
          <label>Website Link</label>
          <input
            type="text"
            name="webLink"
            placeholder="Website link"
            value={inputs.webLink}
            onChange={handleChange}
          />
        </div>
        <div className="newProjectItem">
          <label>Github Link</label>
          <input
            type="text"
            name="githubLink"
            placeholder="Github link"
            value={inputs.githubLink}
            onChange={handleChange}
          />
        </div>
        <div className="newProjectItem">
          <label>Images</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <button className="newProjectButton" type="submit">Create</button>
      </form>
      {successMessage && <p className="successMessage">{successMessage}</p>} {/* Display success message */}
    </div></>
  );
};

export default NewProject;
