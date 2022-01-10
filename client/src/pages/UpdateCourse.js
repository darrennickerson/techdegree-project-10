import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../context/Context';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const courseId = useParams();
  const value = useContext(userContext);
  const user = value.user;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${courseId.id}`)
      .then((response) => {
        if (user.id !== response.data.User.id) {
          window.location.assign('/forbidden');
        } else {
          setCourse(response.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId, user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.courseTitle.value,
      description: e.target.courseDescription.value,
      estimatedTime: e.target.estimatedTime.value,
      materialsNeeded: e.target.materialsNeeded.value,
    };
    axios
      .put(`courses/${courseId.id}`, data, {
        headers: {
          Authorization: `Basic ${user.encodedCreds}`,
        },
      })
      .then((response) => {
        console.log(response);
        window.location.assign(`/course_detail/${courseId.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  defaultValue={course.title}
                />

                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  defaultValue={course.description}
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  defaultValue={course.estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  defaultValue={course.materialsNeeded}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button
              className="button button-secondary"
              onClick={(e) => {
                e.preventDefault();
                window.location.assign('/');
              }}
            >
              Cancel
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateCourse;
