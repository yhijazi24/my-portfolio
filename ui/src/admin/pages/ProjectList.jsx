import { useEffect, useState } from 'react';
import './css/projectList.css';
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../redux/apiCalls";
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Topbar from '../conponents/Topbar';
import Sidebar from '../conponents/Sidebar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(projects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setProjects(items);
        // Optional: Persist the new order to the backend if needed
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
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ height: '100%' }} // Ensure the Droppable fills the container
                            >
                                <DataGrid
                                    rows={projects}
                                    disableSelectionOnClick
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    pageSize={8}
                                    rowHeight={100} // Adjust based on your needs
                                    components={{
                                        Row: (props) => {
                                            const index = projects.findIndex(project => project._id === props.row._id);
                                            return (
                                                <Draggable key={props.row._id} draggableId={props.row._id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <DataGrid.Row {...props} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        },
                                    }}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
};

export default ProjectList;
