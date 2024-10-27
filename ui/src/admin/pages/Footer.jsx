import { useEffect, useState } from 'react';
import './css/footer.css';
import { getFooter, updateFooter } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";

const Footer = () => {
  const dispatch = useDispatch();
  const [footer, setFooter] = useState({});
  const [updatedFooter, setUpdatedFooter] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null); // New state for resume file

  useEffect(() => {
    const fetchFooter = async () => {
      setLoading(true);
      try {
        const fetchedFooter = await getFooter(); 
        console.log("Fetched footer:", fetchedFooter);

        setFooter(fetchedFooter[0]);
        setUpdatedFooter(fetchedFooter[0]);
      } catch (err) {
        setError("Failed to fetch footer.");
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  if (loading) {
    return <div>Loading footer data...</div>;
  }

  if (error) {
    return <div className="errorMessage">{error}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // Handle PDF file selection
    if (name === 'resumeFile' && files && files[0]) {
      setResumeFile(files[0]);
    } else {
      setUpdatedFooter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage(app);
    try {
      if (resumeFile) {
        const fileName = new Date().getTime() + resumeFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, resumeFile);

        // Wait for file upload and get the download URL
        const resumeLink = await new Promise((resolve, reject) => {
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

        setUpdatedFooter((prev) => ({ ...prev, resumeLink }));
      }

      await updateFooter(footer._id, updatedFooter, dispatch);
      setSuccess(true);
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Footer update failed.");
    }
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <div className="footer">
        <div className="footerTitleContainer">
          <h1 className="footerTitle">Edit Footer</h1>
        </div>
        <div className="footerContainer">
          <div className="footerShow">
            <div className="footerShowTop">
              <div className="footerShowTopTitle">
                <span className="footerShowTitle">{footer.creator || "Default Creator"}</span>
                <span className="footerShowLinkedin">{footer.linkdinLink || "No LinkedIn Link"}</span>
                <span className="footerShowGithub">{footer.githubLink || "No GitHub Link"}</span>
                <span className="footerShowResume">{footer.resumeLink || "No Resume Link"}</span>
              </div>
            </div>
          </div>
          <div className="footerUpdate">
            <span className="footerUpdateTitle">Edit</span>
            <form className="footerUpdateForm" onSubmit={handleSubmit}>
              <div className="footerUpdateLeft">
                <div className="footerUpdateItem">
                  <label>Creator</label>
                  <input type="text" name="creator" value={updatedFooter.creator || ''} onChange={handleInputChange} className="footerUpdateInput" />
                </div>
                <div className="footerUpdateItem">
                  <label>LinkedIn Link</label>
                  <input type="text" name="linkedinLink" value={updatedFooter.linkedinLink || ''} onChange={handleInputChange} className="footerUpdateInput" />
                </div>
                <div className="footerUpdateItem">
                  <label>GitHub Link</label>
                  <input type="text" name="githubLink" value={updatedFooter.githubLink || ''} onChange={handleInputChange} className="footerUpdateInput" />
                </div>
                <div className="footerUpdateItem">
                  <label>Resume File (PDF)</label>
                  <input type="file" name="resumeFile" accept=".pdf" onChange={handleInputChange} className="footerUpdateInput" />
                </div>
              </div>
              <div className="footerUpdateRight">
                <button type="submit" className="footerUpdateButton">Update</button>
              </div>
            </form>
            {success && <p className="successMessage">Footer updated successfully!</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
