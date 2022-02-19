import React, {useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

/**
 * 함수형 컴포넌트 스니펫입니다.
 */
const Home = () => {

  const [url, setUrl] = useState('URL : ')
  const inputValue = document.getElementById('link')
  const [saveUrl, setSaveurl] = useState('/save?url=')

  function onChangeUrl(e){
    console.log('call onChangeUrl()')
    if (e.target.value.indexOf('youtube') !== -1)
    {
      console.log('This is Youtube link')
      //  app header class 값을 변경
    }
    setUrl('URL : ' + e.target.value)
    setSaveurl('/save?url='+e.target.value)
  }

  function sendUrl(e)
  {
    console.log('call sendUrl()')
    if (inputValue)
    {
      console.log("인풋창 입력값 : ", inputValue.value)
      axios.post('http://localhost:5000/flask/hello',
          {
            'url' : inputValue.value,
          }).then(response =>
      {
        console.log("Success", response.data)
      }).catch(error =>
      {
        console.log(error)
      })
    }
  }

  function getMethod(e)
  {
    console.log("call getMethod()")
    axios.get('http://localhost:5000/flask/hello').then(response =>
    {
      console.log("Success", response.data)
    }).catch(error =>
    {
      console.log(error)
    })
  }

  function chat(e)
  {
    console.log("click chat")

  }

  return (
      <div className="App">
        <header className="App-header">
          <p>
            유트하(유튜브, 트위치 하이라이트라는 뜻)
          </p>

          <input onChange={onChangeUrl} id='link' />
          <h3>{url}</h3>
          <button onClick={sendUrl}>버튼</button>

          <button onClick={getMethod}>get method 버튼</button>
          <Link to={saveUrl}>공유하기</Link>

          <Link to={"/chat"}>
            <button onClick={chat}>go chat</button>
          </Link>

          <Link to={"/player"}>
            <button onClick={chat}>go player</button>
          </Link>
        </header>
      </div>
  );

};

export default Home;


