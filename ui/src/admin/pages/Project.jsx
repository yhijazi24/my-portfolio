import { useEffect, useState } from 'react';
import './css/project.css';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Publish } from '@mui/icons-material';
import { updateProject, getProject } from "../redux/apiCalls";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Import Firebase storage
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';

const Project = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const projectId = location.pathname.split("/")[3];
    const [file, setFile] = useState(null); // For handling file uploads
    const [inputs, setInputs] = useState({
        title: '',
        desc: '',
        fullDesc: '',
        lang: '',
        webLink: '',
        githubLink: '',
        img: [] // Include img for handling images
    });

    useEffect(() => {
        const fetchProject = async () => {
            if (projectId) {
                try {
                    console.log("Fetching project with ID:", projectId);
                    const projectData = await getProject(projectId); // Fetch the project by ID
                    console.log("Fetched project data:", projectData);
                    setInputs({
                        title: projectData.title,
                        desc: projectData.desc,
                        fullDesc: projectData.fullDesc,
                        lang: projectData.lang.join(', '), // Convert array to comma-separated string
                        webLink: projectData.webLink,
                        githubLink: projectData.githubLink,
                        img: projectData.img || [] // Handle image array
                    });
                } catch (error) {
                    console.error("Failed to fetch project:", error);
                }
            }
        };

        fetchProject();
    }, [projectId]); // Re-fetch if projectId changes

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'lang') {
            setInputs((prev) => ({
                ...prev,
                [name]: value.split(',').map(item => item.trim()), // Convert comma-separated string to array
            }));
        } else if (name === 'fullDesc') {
            setInputs((prev) => ({
                ...prev,
                [name]: value.startsWith('-') ? '\n' + value : value, // Add newline before hyphen if present at the start
            }));
        } else {
            setInputs((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    

    // Handle image deletion
    const handleDeleteImage = (imageUrl) => {
        setInputs((prev) => ({
            ...prev,
            img: prev.img.filter((img) => img !== imageUrl) // Remove the selected image from array
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (file) {
            const fileName = new Date().getTime() + file.name; // Create a unique filename
            const storageRef = ref(storage, `projects/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Track upload progress
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Optional: Track progress
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    // On successful upload, get the download URL
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setInputs((prev) => ({
                        ...prev,
                        img: [...prev.img, downloadURL] // Add the new image URL to the array
                    }));
                    // Now update the project in the database
                    updateProject(projectId, { ...inputs, img: [...inputs.img, downloadURL] }, dispatch);
                }
            );
        } else {
            // If no file is selected, just update the other inputs
            updateProject(projectId, inputs, dispatch);
        }
    };

    return (
        <>
        <Topbar />
        <Sidebar />
        <div className="project">
            <div className="projectTitleContainer">
                <h1 className="projectTitle">Project</h1>
                <Link to="/admin/newproject">
                    <button className="projectAddButton">Create</button>
                </Link>
            </div>
            <div className="projectTop">
                <div className="projectTopRight">
                    <div className="projectInfoTop">
                        <div className='projectImg'>
                            <img 
                            src={inputs.img.length > 0 ? inputs.img[0] : ""} 
                            alt="Project" 
                            className="projectInfoImg" 
                        />
                        </div>
                        
                        <div className='projectInfo'>
                        <h3 className="projectName">{inputs.title}</h3>
                        <p className="projectdesc">{inputs.desc}</p>
                        <p className="projectdesc">{inputs.lang}</p>
                        <p className="projectdesc">{inputs.fullDesc}</p>
                        <p className="projectdesc">{inputs.webLink}</p>
                        <p className="projectdesc">{inputs.githubLink}</p>
                        </div>
                        
                    </div>
                    <div className="projectInfoBottom">
                        <div className="projectInfoItem">
                            <span className="projectInfoKey">ID:</span>
                            <span className="projectInfoValue">{projectId}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="projectBottom">
                <form className="projectForm" onSubmit={handleSubmit}>
                    <div className="projectFormLeft">
                        <label>Project Name</label>
                        <input
                            type="text"
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                        />
                        <label>Project Description</label>
                        <textarea
                            type="text"
                            name="desc"
                            value={inputs.desc}
                            onChange={handleChange}
                        />
                        <label>Full Description</label>
                        <textarea
                            type="text"
                            name="fullDesc"
                            value={inputs.fullDesc}
                            onChange={handleChange}
                        />
                        <label>Languages (comma separated)</label>
                        <input
                            type="text"
                            name="lang"
                            value={inputs.lang}
                            onChange={handleChange}
                        />
                        <label>Web Link</label>
                        <input
                            type="text"
                            name="webLink"
                            value={inputs.webLink}
                            onChange={handleChange}
                        />
                        <label>GitHub Link</label>
                        <input
                            type="text"
                            name="githubLink"
                            value={inputs.githubLink}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="projectFormRight">
                        <div className="projectUpload">
                            {inputs.img.map((imageUrl, index) => (
                                <div key={index} className="projectImageContainer">
                                    <img 
                                        src={imageUrl} 
                                        alt="Project" 
                                        className="projectUploadImg" 
                                    />
                                    <button
                                        type="button"
                                        className="deleteImageButton projectButton"
                                        onClick={() => handleDeleteImage(imageUrl)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button className="projectButton" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div></>
    );
};

export default Project;
