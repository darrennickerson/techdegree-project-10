import { Link } from 'react-router-dom';
import axios from 'axios';
const CourseMenu = ({ courseId, encodedUser }) => {
  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this?');

    if (confirm === false) {
      return;
    } else {
      axios
        .delete(`courses/${courseId}`, {
          headers: {
            Authorization: `Basic ${encodedUser}`,
          },
        })
        .then((response) => {
          window.location.assign(`/`);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              window.location.assign('/forbidden');
            } else {
              window.location.assign('/error');
            }
          }
          console.error(error);
        });
    }
  };
  return (
    <>
      <Link className="button" to={`/courses/${courseId}/update`}>
        Update Course
      </Link>
      <Link className="button" onClick={handleDelete} to="/">
        Delete Course
      </Link>
    </>
  );
};

export default CourseMenu;
