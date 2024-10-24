import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/dashboard/taskcard.css";
import { ITaskDetail, ITaskRequest } from "../../types/interfaces/api/task.interface";
import "quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { QueryKeyString } from "../../types/enums/query-key-string.enum";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import { deleteTask, updateTask } from "../../api/task";
import { useQueryClient } from "react-query";
import { Logger } from "../../utils/logger.util";
import { Backdrop, Box,  Fade, Input, Modal, SxProps, Typography } from "@mui/material";
import {  FormEventHandler, useRef, useState } from "react";
import Button from "../Button";
interface ITaskCardField extends ITaskDetail {

}
export default function TaskCard({
  title,
  description,
  createdAt,
  status,
  _id,
}: ITaskCardField) {

  const titleRef = useRef(title);
  const contentRef = useRef(description);
  
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const isoDate = new Date(createdAt);
  const formattedDate = `${
    isoDate.getMonth() + 1
  }/${isoDate.getDate()}/${isoDate.getFullYear()}`;
  const emptyModules = {
    toolbar: false,
  };
  const queryClient = useQueryClient();
  const logger = new Logger("DashboardProducts");
  const { mutate: deleteTaskUser } = useCustomMutation({
    api: deleteTask,
    success: "The task has been deleted succesfully .",
    onSuccess: () => {

      handleClose()

      queryClient
        .invalidateQueries([QueryKeyString.Task_DATA])
        .catch((err) => logger.error(err));
    },
    onError: () => {
      handleClose()

      queryClient
        .invalidateQueries([QueryKeyString.Task_DATA])
        .catch((err) => logger.error(err));
    },
  });
  const handleDelete = (_id: string) => {
    try {
      deleteTaskUser(_id);
    } catch (err) {
      console.log(err);
    }
  };

  const { mutate: updateTaskUser } = useCustomMutation({
    api: updateTask,
    success: "The task has been updated succesfully .",
    onSuccess: () => {

      handleCloseUpdate()

      queryClient
        .invalidateQueries([QueryKeyString.Task_DATA])
        .catch((err) => logger.error(err));
    },
    onError: () => {

      handleCloseUpdate()

      queryClient
        .invalidateQueries([QueryKeyString.Task_DATA])
        .catch((err) => logger.error(err));
    },
  });
  

  const handleUpdate: FormEventHandler<HTMLFormElement> = async (
    e,
) => {
    e.preventDefault();
    const data: ITaskRequest = {
        _id: _id,
        title: titleRef.current,
        description: contentRef.current,
    };
   updateTaskUser(data);
};

  const style :SxProps= {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'var(--glass-background-modal)',
    borderRadius:'20px',
    boxShadow: 24,
    backdropFilter:'var(--glass-backdrop)',
    p: 4,
  };
  return (
    
    <div className="task-wrapper">

        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

            <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete Task?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this task?
            </Typography>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: "20px",
            }} >
            <Button onClick={()=>{handleDelete(_id)}} style={{
              marginTop: "20px",
            }}>
              Delete
            </Button>
            <Button onClick={handleClose} buttonType='secondaryButton' style={{
              marginTop: "20px",
              marginLeft: "20px",
            }}>
              Cancel
            </Button>

            
            
            </div>
          </Box>
        </Fade>
      </Modal>


      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdate}
        onClose={handleCloseUpdate}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdate}>
        <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Update Task
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Update the title and description for this task
            </Typography>

        <form onSubmit={handleUpdate}>
        <div className="heading">Title</div>

        <Input
                    required
                    fullWidth
                    defaultValue={title}
                    sx={{ mb: 2 }}
                    id="title"
                    name="title"
                    style={{
                      color: "var(--secondary-color)",
                    }}

                    inputRef={titleRef}
                    onChange={(e) => (titleRef.current = e.target.value)}
                />
        <div className="heading">Content</div>

        
        <Input
                    required
                    defaultValue={description}

                    style={{
                      color: "var(--secondary-color)",
                    }}
                    inputRef={contentRef}
                    fullWidth
                    sx={{ mb: 2 }}
                    id="description"
                    name="description"
                    onChange={(e) => (contentRef.current = e.target.value)}
                />




        <Button style={{ marginTop: "2rem", width:'100%' }}>Update Task</Button>
      </form>

          </Box>
        </Fade>
      </Modal>
      <div className="task-body">
        

        <div className="task-content">
          <ReactQuill
            modules={emptyModules}
            value={description}
            readOnly
            style={{
              height: "150px",
              width: "inherit",
              background: "transparent",
              overflow: "hidden",
            }}
          ></ReactQuill>
        </div>
      </div>
      <div className="posted-info">
        <div className="posted-by" onClick={handleOpen}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div className="posted-by" onClick={handleOpenUpdate}>
          <FontAwesomeIcon icon={faPen} />
        </div>
        <div className="posted-on">{formattedDate}</div>
      </div>
    </div>
  );
}
