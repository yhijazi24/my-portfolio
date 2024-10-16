import { useEffect, useState } from 'react';
import './css/homeHeader.css';
import { Publish } from '@mui/icons-material';
import { getHomeHeader, updateHomeHeader } from '../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';

const HomeHeader = () => {
  const dispatch = useDispatch();
  const [homeHeader, setHomeHeader] = useState(null);
  const [updatedHomeHeader, setUpdatedHomeHeader] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
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
  
  useEffect(() => {
    console.log('Updated homeHeader state:', homeHeader);
  }, [homeHeader]);

  if (loading) {
    return <div>Loading home header data...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHomeHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDeleteImage = async (imageToDelete) => {
    try {
      const updatedImages = homeHeader.resumeImg.filter(img => img !== imageToDelete);
      const updatedHeader = { ...updatedHomeHeader, resumeImg: updatedImages }; // Updated key
      await updateHomeHeader(fetchedHomeHeaderId, updatedHeader, dispatch);
      setHomeHeader(updatedHeader);
      setUpdatedHomeHeader(updatedHeader);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to delete image:", error);
      setError("Image deletion failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage(app);
    try {
      let uploadedImages = [...updatedHomeHeader.resumeImg || []]; // Preserve existing images

      if (files.length > 0) {
        for (let file of files) {
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          const downloadURL = await new Promise((resolve, reject) => {
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

          uploadedImages.push(downloadURL); // Add new image to array
        }
      }

      const homeHeaderToUpdate = { ...updatedHomeHeader, resumeImg: uploadedImages }; // Save with updated images
      await updateHomeHeader(fetchedHomeHeaderId, homeHeaderToUpdate, dispatch);
      setSuccess(true);
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Header update failed.");
    }
  };

  return (
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
            </div>
            <div className="homeHeaderUpdateRight">
              <div className="homeHeaderUpdateUpload">
                {homeHeader?.resumeImg?.length > 0 ? (
                  homeHeader.resumeImg.map((image, index) => (
                    <div key={index} className="homeHeaderImageContainer">
                      <img
                        className="homeHeaderUpdateImg"
                        src={image || "https://via.placeholder.com/150"}
                        alt={`Header Image ${index + 1}`}
                      />
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
                        <button
                          className="deleteImageButton"
                          type="button"
                          onClick={() => handleDeleteImage(image)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
                <label htmlFor="file">
                  <Publish className="homeHeaderUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="homeHeaderUpdateButton">Update</button>
            </div>
          </form>
          {success && <p className="successMessage">Header updated successfully!</p>}
          {error && <p className="errorMessage">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
