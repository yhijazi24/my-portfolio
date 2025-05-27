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
  const [files, setFiles] = useState([]);
  const [frenchResumeFile, setFrenchResumeFile] = useState(null);
  const [englishResumeFile, setEnglishResumeFile] = useState(null);
  const [fetchedHomeHeaderId, setFetchedHomeHeaderId] = useState(null);

  useEffect(() => {
    const fetchHomeHeader = async () => {
      setLoading(true);
      try {
        const fetchedHomeHeader = await getHomeHeader();
        console.log("Fetched home header:", fetchedHomeHeader);

        if (Array.isArray(fetchedHomeHeader) && fetchedHomeHeader.length > 0) {
          const headerData = fetchedHomeHeader[0];
          setHomeHeader(headerData);
          setUpdatedHomeHeader(headerData);
          setFetchedHomeHeaderId(headerData.id);
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

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handlePdfChange = (e, field) => {
    const file = e.target.files[0];
    if (field === "frenchResumeFile") {
      setFrenchResumeFile(file);
    } else if (field === "englishResumeFile") {
      setEnglishResumeFile(file);
    }
  };

  const handleDeleteImage = async (imageToDelete) => {
    try {
      const updatedImages = homeHeader.resumeImg.filter(img => img !== imageToDelete);
      const updatedHeader = { ...updatedHomeHeader, resumeImg: updatedImages };
      await updateHomeHeader(fetchedHomeHeaderId, updatedHeader, dispatch);
      setHomeHeader(updatedHeader);
      setUpdatedHomeHeader(updatedHeader);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to delete image:", error);
      setError("Image deletion failed.");
    }
  };

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedImages = [...updatedHomeHeader.resumeImg || []];

      // Handle image uploads
      if (files.length > 0) {
        for (let file of files) {
          const downloadURL = await handleFileUpload(file);
          uploadedImages.push(downloadURL);
        }
      }

      const homeHeaderToUpdate = { ...updatedHomeHeader, resumeImg: uploadedImages };

      // Handle French Resume PDF upload
      if (frenchResumeFile) {
        const frenchResumeLink = await handleFileUpload(frenchResumeFile);
        homeHeaderToUpdate.frenchResumeLink = frenchResumeLink;
      }

      // Handle English Resume PDF upload
      if (englishResumeFile) {
        const englishResumeLink = await handleFileUpload(englishResumeFile);
        homeHeaderToUpdate.englishResumeLink = englishResumeLink;
      }

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
        <div className="homeHeaderTitleContainer">
          <h1 className="homeHeaderTitle">Edit Home Header</h1>
        </div>
        <div className="homeHeaderContainer">
          <div className="homeHeaderShow">
            <div className="homeHeaderShowTop">
              {homeHeader?.resumeImg?.length > 0 ? (
                homeHeader.resumeImg.map((image, index) => (
                  <img
                    key={index}
                    src={image || "https://via.placeholder.com/150"}
                    alt={homeHeader?.title || "Default Title"}
                    className="homeHeaderShowImg"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
              <div className="homeHeaderShowTopTitle">
                <span className="homeHeaderShowTitle">{homeHeader?.title || "Default Title"}</span>
                <span className="homeHeaderShowAboutMe">{homeHeader?.aboutMe || "Default About Me"}</span>
              </div>
            </div>
          </div>
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
                  <label>French Resume File (PDF)</label>
                  <input type="file" accept=".pdf" onChange={(e) => handlePdfChange(e, "frenchResumeFile")} />
                </div>
                <div className="homeHeaderUpdateItem">
                  <label>English Resume File (PDF)</label>
                  <input type="file" accept=".pdf" onChange={(e) => handlePdfChange(e, "englishResumeFile")} />
                </div>
              </div>
              <div className="homeHeaderUpdateRight">
                <div className="homeHeaderUpdateUpload">
                  {homeHeader?.resumeImg?.length > 0 ? (
                    homeHeader.resumeImg.map((image, index) => (
                      <div key={index} className="homeHeaderImageContainer">
                        <img className="homeHeaderUpdateImg" src={image || "https://via.placeholder.com/150"} alt={`Header Image ${index + 1}`} />
                        <div className="homeHeaderImageActions">
                          <label htmlFor={`file-${index}`}>
                            <Publish className="homeHeaderUpdateIcon" />
                          </label>
                          <input
                            type="file"
                            id={`file-${index}`}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <button type="button" onClick={() => handleDeleteImage(image)}>Delete</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                  <label htmlFor="file">
                    <Publish className="homeHeaderUpdateIcon" />
                  </label>
                  <input type="file" id="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
                </div>
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
