import React, {useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
const Save = () => {

const [searchParams, ] = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
      axios.post('http://localhost:5000/flask/hello',
          {
            'url' : url,
          }).then(response =>
      {
        console.log("Success", response.data)
      }).catch(error =>
      {
        console.log(error)
      })
    },[]);

  return (
      <div className="App">
          hi {url}
      </div>
  );

};

export default Save;


