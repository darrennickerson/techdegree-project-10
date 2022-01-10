import { Link } from 'react-router-dom';
const Course = ({ data }) => {
  return (
    <div>
      <Link className="course--module course--link" to={'courses/' + data.id}>
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{data.title}</h3>
      </Link>
    </div>
  );
};

export default Course;
