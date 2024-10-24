import Button from "../../components/Button";
import InputField from "../../components/InputField";
import useFormInput from "../../hooks/useFormInput";
import "../../styles/dashboard/text-editor.css";
import { createTask as createTaskUser } from "../../api/task";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import {
  ITaskDetail,
  ITaskRequest,
} from "../../types/interfaces/api/task.interface";
export default function ComposeTask() {

  const input = useFormInput([{ name: "title" },{
    name: "description",
  }]);
  const nav = useNavigate();

  const { mutate: createTask } = useCustomMutation<ITaskRequest, ITaskDetail>({
    api: createTaskUser,
    onSuccess: () => {
      nav("/task");
      toast.success("Task Saved");
    },
    onError: () => {
      toast.error(" An error occured");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const data = {
      title: input.title.value,
      description: input.description.value,
      status: false,
    };

    createTask(data);
  };
  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="heading">Title</div>

        <InputField
          inputType="text"
          name="title"
          onChange={input[`title`].handleChange}
          style={{
            outline: "none",
            border: "1px solid var(--secondary-color)",
            width: "100%",
            height: "50px",
          }}
        />
        <div className="heading">Content</div>

        <InputField
          inputType="text"
          name="description"
          onChange={input[`description`].handleChange}
          style={{
            outline: "none",
            border: "1px solid var(--secondary-color)",
            width: "100%",
            height: "50px",
          }}
        />
        <Button style={{ marginTop: "2rem", width: "200px" }}>Save Task</Button>
      </form>
    </div>
  );
}
