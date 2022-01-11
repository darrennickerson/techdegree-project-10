import Course from '../components/Course';
import CreateCourseButton from '../components/CreateCourseButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [courses, setCourses] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('courses')
      .then((response) => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        window.location.assign('/error');
      });
  }, []);
  return (
    <div className="wrap main--grid">
      {isLoading ? (
        <h2>Loading....</h2>
      ) : (
        courses.map((course) => {
          return <Course key={course.id} data={course} />;
        })
      )}
      <CreateCourseButton />
    </div>
  );
};

export default Home;
