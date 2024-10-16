import { useEffect, useState } from 'react';
import './css/projectList.css';
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../redux/apiCalls";
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                console.log("Fetched Projects:", data);
                setProjects(data);
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
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/project/" + params.row._id}>
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
        <div className="projectList">
            <DataGrid
                rows={projects}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default ProjectList;
