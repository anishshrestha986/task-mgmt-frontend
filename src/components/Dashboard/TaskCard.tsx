import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/dashboard/taskcard.css";
import { ITaskDetail } from "../../types/interfaces/api/task.interface";
import "quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { QueryKeyString } from "../../types/enums/query-key-string.enum";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import { deleteTask } from "../../api/task";
import { useQueryClient } from "react-query";
import { Logger } from "../../utils/logger.util";
interface ITaskCardField extends ITaskDetail {

}
export default function TaskCard({
  title,
  description,
  createdAt,
  _id,
  updatedAt,
}: ITaskCardField) {
  const isoDate = new Date(createdAt);
  const formattedDate = `${
    isoDate.getMonth() + 1
  }/${isoDate.getDate()}/${isoDate.getFullYear()}`;
  const emptyModules = {
    toolbar: false,
  };
  const queryClient = useQueryClient();
  const logger = new Logger("DashboardProducts");
  const { mutate: deleteTaskUser, isLoading } = useCustomMutation({
    api: deleteTask,
    success: "The task has been deleted succesfully .",
    onSuccess: () => {
      queryClient
        .invalidateQueries([QueryKeyString.Task_DATA])
        .catch((err) => logger.error(err));
    },
    onError: () => {
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

  return (
    <div className="task-wrapper">
      <div className="task-body">
        <div className="task-label">{title ? title : "New task"}</div>
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
        <div className="posted-by" onClick={() => handleDelete(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
        {/* <div className="posted-by" onClick={() => {}}>
          <FontAwesomeIcon icon={faPen} />
        </div> */}
        <div className="posted-on">{formattedDate}</div>
      </div>
    </div>
  );
}
