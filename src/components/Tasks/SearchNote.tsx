import "../../styles/dashboard/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface ISearchTask {
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterText: string;
}

export default function SearchProduct({ onFilter, filterText }: ISearchTask) {
  return (
    <div className="searchBoxContainer">
      <input
        className="taskSearch"
        id="search"
        type="text"
        placeholder="Search Task"
        value={filterText}
        onChange={onFilter}
      />
      <FontAwesomeIcon icon={faSearch} className="inputIcon" />
    </div>
  );
}
