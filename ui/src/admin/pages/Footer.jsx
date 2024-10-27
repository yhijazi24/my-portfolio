import { useEffect, useState } from 'react';
import './css/footer.css';
import { getFooter, updateFooter } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';

const Footer = () => {
  const dispatch = useDispatch();
  const [footer, setFooter] = useState({});
  const [updatedFooter, setUpdatedFooter] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const { name, value } = e.target;
    setUpdatedFooter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFooter(footer._id, updatedFooter, dispatch);
      setSuccess(true);
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Footer update failed.");
    }
  };

  return (<>
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
                <label>LinkdIn Link</label>
                <input type="text" name="linkedinLink" value={updatedFooter.linkdinLink || ''} onChange={handleInputChange} className="footerUpdateInput" />
              </div>
              <div className="footerUpdateItem">
                <label>GitHub Link</label>
                <input type="text" name="githubLink" value={updatedFooter.githubLink || ''} onChange={handleInputChange} className="footerUpdateInput" />
              </div>
              <div className="footerUpdateItem">
                <label>Resume Link</label>
                <input type="text" name="resumeLink" value={updatedFooter.resumeLink || ''} onChange={handleInputChange} className="footerUpdateInput" />
              </div>
            </div>
            <div className="footerUpdateRight">
              <button type="submit" className="footerUpdateButton">Update</button>
            </div>
          </form>
          {success && <p className="successMessage">Footer updated successfully!</p>}
        </div>
      </div>
    </div></>
  );
};

export default Footer;
