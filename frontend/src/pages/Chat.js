import React, {useEffect, useState, useRef } from 'react';
import axios from "axios";
import {Slider} from "@mui/material";


const Chat = () => {
    const [data, setData] = useState();
    const [flow, setFlow] = useState([]);
    const [current, setCurrent] = useState(0)
    const scroll = document.querySelector('#scroll')

    useEffect(()=>{
        // console.log('call get method')
        // axios.get('http://localhost:5000/flask/hello').then(response =>
        // {
        //     console.log("Success", response.data.chat)
        //     localStorage.setItem('chat',JSON.stringify(response.data.chat))
        // }).catch(error =>
        // {
        //     console.log(error)
        // })
        const chatData = localStorage.getItem("chat")
        setData(JSON.parse(chatData))

        if (JSON.parse(chatData)[0] !== undefined)
        {
            setFlow([JSON.parse(chatData)[0].map((value) =>(current+' : '+value))])
        }
    },[])

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            scroll.scrollTop = scroll.scrollHeight
        }
    });

    function click(e)
    {
        if (data[current+1] !== undefined)
        {
            setFlow((flow)=>([...flow, data[current+1].map((value) =>(current+1+' : '+value))]))
        }
        setCurrent(current+1)
    }

    function handleChange(e, val) {
        if (data[val] !== undefined)
        {
            setFlow([data[val].map((value) =>(val+' : '+value))])
        }
        else
        {
            setFlow([])
        }
        setCurrent(val)
    }


    return (
        <div className="App">
            hi Chat
            <div>
                <button onClick={click}>click</button>
            </div>
            <div>
                <div style={{ width: 400, height:600, overflow:"scroll", display:"inline-block", wordBreak:"break-all", textAlign:'left'}} id='scroll'>
                    {flow.map((value, index)=>value ? <div key={index}>{value.map((each,idx)=> each ? <div key={idx}>{each}</div> : null)}</div> : null)}
                </div>
            </div>

            <div>
                <div>
                    {current}
                </div>
                <Slider defaultValue={0} max={100} aria-label="Default" valueLabelDisplay="auto" style={{width:'70%'}} onChangeCommitted={handleChange} value={current}/>
            </div>
        </div>
    );

};

export default Chat;


