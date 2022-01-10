import axios from 'axios';
import { useState, useContext } from 'react';
import { userContext } from '../context/Context';
import ValidationErrors from '../components/ValidationErrors';

const CreateCourse = () => {
  const [valErrors, setValErrors] = useState([]);
  const value = useContext(userContext);
  const user = value.user;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.courseTitle.value,
      description: e.target.courseDescription.value,
      estimatedTime: e.target.estimatedTime.value,
      materialsNeeded: e.target.materialsNeeded.value,
    };

    axios
      .post('courses', data, {
        headers: {
          Authorization: `Basic ${user.encodedCreds}`,
        },
      })
      .then((response) => {
        window.location.assign(`/courses/${response.data.id}`);
      })
      .catch((error) => {
        if (error.status === 401) {
          window.location.assign('/forbidden');
        } else if (error.status === 500) {
          window.location.assign('/error');
        }
        setValErrors(error.response.data.errors);
      });
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      {valErrors && valErrors.length > 0 ? (
        <ValidationErrors errors={valErrors} />
      ) : (
        ''
      )}

      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" />

            <p></p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary">Cancel</button>
      </form>
    </div>
  );
};

export default CreateCourse;
