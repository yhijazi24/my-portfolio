import { useEffect, useState } from 'react';
import './css/homeHeader.css';
import { Publish } from '@mui/icons-material';
import { getHomeHeader, updateHomeHeader } from '../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const [homeHeader, setHomeHeader] = useState(null);
  const [updatedHomeHeader, setUpdatedHomeHeader] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchedHomeHeaderId, setFetchedHomeHeaderId] = useState(null);
  const [files, setFiles] = useState({}); // Object to store multiple files

  useEffect(() => {
    const fetchHomeHeader = async () => {
      setLoading(true);
      try {
        const fetchedHomeHeader = await getHomeHeader();
        
        if (Array.isArray(fetchedHomeHeader) && fetchedHomeHeader.length > 0) {
          const headerData = fetchedHomeHeader[0];
          setHomeHeader(headerData);
          setUpdatedHomeHeader(headerData);
          setFetchedHomeHeaderId(headerData._id);
        } else {
          setError("No header data found.");
        }
      } catch (err) {
        setError("Failed to fetch header.");
      } finally {
        setLoading(false);
      }
    };
    fetchHomeHeader();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHomeHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, fileKey) => {
    setFiles((prevFiles) => ({ ...prevFiles, [fileKey]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage(app);
    const fileLinks = {};

    try {
      for (const key of ['resumeImg', 'frenchResumeLink', 'englishResumeLink']) {
        if (files[key]) {
          const file = files[key];
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          const downloadURL = await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              reject,
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
              }
            );
          });
          fileLinks[key] = downloadURL;
        }
      }

      const homeHeaderToUpdate = { 
        ...updatedHomeHeader, 
        ...fileLinks 
      };

      await updateHomeHeader(fetchedHomeHeaderId, homeHeaderToUpdate, dispatch);
      setSuccess(true);
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Header update failed.");
    }
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="homeHeader">
        <h1 className="homeHeaderTitle">Edit Home Header</h1>
        <div className="homeHeaderContainer">
          {error && <p className="errorMessage">{error}</p>}
          {success && <p className="successMessage">Header updated successfully!</p>}
          <form className="homeHeaderUpdateForm" onSubmit={handleSubmit}>
            <div className="homeHeaderUpdateLeft">
              <label>About Me</label>
              <input
                type="text"
                name="aboutMe"
                value={updatedHomeHeader.aboutMe || ''}
                onChange={handleInputChange}
                className="homeHeaderUpdateInput"
              />
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={updatedHomeHeader.title || ''}
                onChange={handleInputChange}
                className="homeHeaderUpdateInput"
              />
              <label>Resume (Primary)</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'resumeImg')}
              />
              <label>French Resume</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'frenchResumeLink')}
              />
              <label>English Resume</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'englishResumeLink')}
              />
            </div>
            <button type="submit" className="homeHeaderUpdateButton">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
