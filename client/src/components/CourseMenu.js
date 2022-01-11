import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/Context';

const CourseMenu = ({ courseId }) => {
  // Small menu in course menu for deleting and updateing courses. when logged in
  const { signOut } = useContext(userContext);
  const handleDelete = () => {
    const confirm = window.confirm('Are you sure you want to delete this?');

    if (confirm === false) {
      return;
    } else {
      signOut();
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
