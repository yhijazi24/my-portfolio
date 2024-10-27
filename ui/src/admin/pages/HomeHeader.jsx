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
  const [frenchResumeFile, setFrenchResumeFile] = useState(null);
  const [englishResumeFile, setEnglishResumeFile] = useState(null);
  const [fetchedHomeHeaderId, setFetchedHomeHeaderId] = useState(null);

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

  const handleFileUpload = async (file, fieldName) => {
    if (file) {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("File upload failed:", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUpdatedHomeHeader((prev) => ({ ...prev, [fieldName]: downloadURL }));
            resolve(downloadURL);
          }
        );
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (frenchResumeFile) {
        await handleFileUpload(frenchResumeFile, "frenchResumeLink");
      }
      if (englishResumeFile) {
        await handleFileUpload(englishResumeFile, "englishResumeLink");
      }

      await updateHomeHeader(fetchedHomeHeaderId, updatedHomeHeader, dispatch);
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
        <div className="homeHeaderTitleContainer">
          <h1 className="homeHeaderTitle">Edit Home Header</h1>
        </div>
        <div className="homeHeaderContainer">
          <div className="homeHeaderUpdate">
            <span className="homeHeaderUpdateTitle">Edit</span>
            <form className="homeHeaderUpdateForm" onSubmit={handleSubmit}>
              <div className="homeHeaderUpdateLeft">
                <div className="homeHeaderUpdateItem">
                  <label>About Me</label>
                  <input
                    type="text"
                    name="aboutMe"
                    value={updatedHomeHeader.aboutMe || ''}
                    onChange={handleInputChange}
                    className="homeHeaderUpdateInput"
                  />
                </div>
                <div className="homeHeaderUpdateItem">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={updatedHomeHeader.title || ''}
                    onChange={handleInputChange}
                    className="homeHeaderUpdateInput"
                  />
                </div>
                <div className="homeHeaderUpdateItem">
                  <label>French Resume PDF</label>
                  <input type="file" accept="application/pdf" onChange={(e) => setFrenchResumeFile(e.target.files[0])} />
                </div>
                <div className="homeHeaderUpdateItem">
                  <label>English Resume PDF</label>
                  <input type="file" accept="application/pdf" onChange={(e) => setEnglishResumeFile(e.target.files[0])} />
                </div>
              </div>
              <div className="homeHeaderUpdateRight">
                <button type="submit" className="homeHeaderUpdateButton">Update</button>
              </div>
            </form>
            {success && <p className="successMessage">Header updated successfully!</p>}
            {error && <p className="errorMessage">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeader;
