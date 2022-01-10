import axios from 'axios';
import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import CourseMenu from '../components/CourseMenu';
import { userContext } from '../context/Context';
import ReactMarkdown from 'react-markdown';

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const value = useContext(userContext);
  const user = value.user;
  const courseId = useParams();

  useEffect(() => {
    axios
      .get(`courses/${courseId.id}`)
      .then((response) => {
        setCourse(response.data);

        setisLoading(false);
      })
      .catch((error) => {
        window.location.assign('/error');
      });
  }, [courseId]);

  return (
    <div>
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          <div className="actions--bar">
            <div className="wrap">
              {user && course.User.id === user.id && (
                <CourseMenu
                  courseId={course.id}
                  encodedUser={user.encodedCreds}
                />
              )}
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
          <div className="wrap">
            <form>
              <h2>Course Detail</h2>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    {course.User.firstName} {course.User.lastName}
                  </p>

                  <ReactMarkdown children={course.description} />
                </div>
                <div>
                  {course.estimatedTime ? (
                    <>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{course.estimatedTime}</p>
                    </>
                  ) : (
                    ''
                  )}

                  {course.materialsNeeded ? (
                    <>
                      <h3 className="course--detail--title">
                        Materials Needed
                      </h3>
                      <ul className="course--detail--list">
                        <ReactMarkdown children={course.materialsNeeded} />
                      </ul>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
