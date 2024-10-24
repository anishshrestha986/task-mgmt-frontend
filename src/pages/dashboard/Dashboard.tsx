import { IconDefinition, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import "../../styles/dashboard/dashboard.css";
import { useQuery, useQueryClient } from "react-query";
import { QueryKeyString } from "../../types/enums/query-key-string.enum";
import * as toast from "../../utils/toast";
import { Logger } from "../../utils/logger.util";
import Pagination from "../../components/pagination";
import useModal from "../../hooks/useModal";
import { useCustomMutation } from "../../hooks/useCustomMutation";
import { ITaskDetail } from "../../types/interfaces/api/task.interface";
import { deleteTask, getTasks } from "../../api/task";
import SearchProduct from "../../components/Tasks/SearchNote";
import FilterByDate from "../../components/Tasks/FilterByDate";
import TaskCard from "../../components/Dashboard/TaskCard";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
interface cardProps {
  icon: IconDefinition;
  label?: string;
}
const logger = new Logger("DashboardProducts");

const Card = ({ icon, label }: cardProps) => {
  return (
    <div className="card-base">
      <div className="icon-base">
        <FontAwesomeIcon icon={icon} />
      </div>
      {label && <div className="label">{label}</div>}
    </div>
  );
};
const Dashboard = () => {
  const [tasks, setTasks] = useState<ITaskDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [sortByDate, setSortByDate] = useState<string>();
  const [sortType, setSortType] = useState("Descending");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { refetch } = useQuery(
    [QueryKeyString.Task_DATA, currentPage, filterText, sortByDate],
    async () => {
      return await getTasks({
        page: currentPage,
        q: filterText,
        sort: sortByDate,
      }).catch((err: string) => {
        toast.error(err);
      });
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        setTasks(data.docs);
        setTotalDocs(data.totalDocs);
        setTotalPages(data.totalPages);
      },
      onError: (err: any) => {
        toast.error(err?.message);
      },
    }
  );
 

  useEffect(() => {
    refetch().catch(logger.error);
  }, [currentPage, sortByDate]);

  
  
  return (
    <>
      <div className="dashboard-main-container">
        {/* <Modal
          isShowing={showDeleteModal}
          hide={toggleDeleteModal}
          title="Are you sure you want to delete this task?"
        >
          <Button onClick={handleDelete}>Delete</Button>
        </Modal> */}
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
          <Box >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete Task?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this task?
            </Typography>
          </Box>
        </Fade>
      </Modal>

        <div className="greetings">
          Welcome to<span> Tasks</span>,
        </div>
        <div className="pageFunctions">
          <div className="pageFunction">
            <SearchProduct
              onFilter={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
              filterText={filterText}
            />
          </div>
          <div className="pageFunction">
            <FilterByDate
              onOrderClick={(e) => {
                if (e.currentTarget.dataset.value === "createdAt:asc")
                  setSortType("Ascending");
                if (e.currentTarget.dataset.value === "createdAt:desc")
                  setSortType("Descending");
                setSortByDate(e.currentTarget.dataset.value);
              }}
              sortType={sortType}
            />
          </div>
        </div>
        <div className="tasks">
          {tasks.map((task, key) => (
            <TaskCard
              {...task}
            />
          ))}
          <Link to="/task/create-task">
            <Card icon={faPlus} />
          </Link>

          <div className="paginationContainer">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalDocs}
              pageSize={8}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
