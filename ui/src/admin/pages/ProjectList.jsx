import { useEffect, useState } from 'react';
import './css/projectList.css';
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects, updateProjectOrder } from "../redux/apiCalls"; // Include API call for updating order
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                console.log("Fetched Projects:", data);
                // Sort projects based on their "order" field
                const sortedProjects = data.sort((a, b) => a.order - b.order);
                setProjects(sortedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error.message);
            }
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            setProjects(prevProjects => prevProjects.filter((project) => project._id !== id));
        } catch (err) {
            console.error("Failed to delete project:", err);
        }
    };

    const moveProject = async (index, direction) => {
        const newProjects = [...projects];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Check bounds
        if (targetIndex >= 0 && targetIndex < newProjects.length) {
            // Swap the projects in the frontend
            [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];

            // Update the order in the frontend state
            const updatedProjects = newProjects.map((project, idx) => ({ ...project, order: idx + 1 }));
            setProjects(updatedProjects);

            // Send updated order to the backend to persist the change
            try {
                await updateProjectOrder(updatedProjects);
            } catch (error) {
                console.error("Failed to update project order in the backend:", error);
            }
        }
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "project image",
            headerName: "Project Image",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="projectListItem image">
                        <img className="projectListImg" src={params.row.img} alt="" />
                    </div>
                );
            },
        },
        {
            field: "title",
            headerName: "Project Title",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="projectListItem">
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 250,
            renderCell: (params) => {
                const index = projects.findIndex(project => project._id === params.row._id);
                return (
                    <>
                        <button
                            className="moveButton"
                            onClick={() => moveProject(index, 'up')}
                            disabled={index === 0} // Disable if it's already the first item
                        >
                            Move Up
                        </button>
                        <button
                            className="moveButton"
                            onClick={() => moveProject(index, 'down')}
                            disabled={index === projects.length - 1} // Disable if it's already the last item
                        >
                            Move Down
                        </button>
                        <Link to={"/admin/project/" + params.row._id}>
                            <button className="projectListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="projectListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Topbar />
            <Sidebar />
            <div className="projectList">
                <DataGrid
                    key={projects.map(p => p._id).join(',')}
                    rows={projects}
                    disableSelectionOnClick
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={8}
                    rowHeight={100}
                />

            </div>
        </>
    );
};

export default ProjectList;
