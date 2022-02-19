import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Slider} from "@mui/material";


const Chat = () => {
    const [data, setData] = useState();
    const [num, setNum] = useState(0)
    const [flow, setFlow] = useState([]);
    const [sliderVal, setSliderVal] = useState(0)
    const [current, setCurrent] = useState(0)
    const fuckScroll = document.querySelector('#fuckScroll')

    useEffect(()=>{
        // console.log('call get method')
        // axios.get('http://localhost:5000/flask/hello').then(response =>
        // {
        //   console.log("Success", response.data.excel)
        //     localStorage.setItem('chat',JSON.stringify(response.data.excel))
        // }).catch(error =>
        // {
        //   console.log(error)
        // })
        const chatData = localStorage.getItem("chat")
        setData(JSON.parse(chatData))
    },[])

    function click(e)
    {
        fuckScroll.scrollTop = fuckScroll.scrollHeight

        setFlow((flow)=>([...flow, String(data[num])]))
        setNum(num+1)
    }

    function handleChange(e, val) {
        setSliderVal(val)
        if (current < val)
        {
            for (let i = current; i < val; i++)
            {
                setFlow((flow)=>([...flow, String(data[i])]))
                fuckScroll.scrollTop = fuckScroll.scrollHeight
            }
            setCurrent(val)
        }
    }

    return (
        <div className="App">
            hi Chat
            <div>
                <button onClick={click}>click</button>
            </div>
            <div>
                <div style={{ width: 400, height:600, overflow:"scroll", display:"inline-block", wordBreak:"break-all", textAlign:'left'}} id='fuckScroll'>
                    {flow.map((value, index)=><div key={index}>{value}<br /></div>)}
                </div>
            </div>

            <div>
                <div>
                    {sliderVal}
                </div>
                <Slider defaultValue={0} max={10000} aria-label="Default" valueLabelDisplay="auto" style={{width:'70%'}} onChangeCommitted={handleChange} />
            </div>
        </div>
    );

};

export default Chat;


