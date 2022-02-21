import React, {createRef, useState} from "react";
import ReactPlayer from "react-player";
import Duration from './Duration'

const Player = () => {

    const [url ,setUrl] = useState('https://www.youtube.com/watch?v=gdZLi9oWNZg')
    const [playing ,setPlaying] = useState(true)
    const [controls ,setControls] = useState(false)
    const [volume ,setVolume] = useState(0.8)
    const [played ,setPlayed] = useState(0)
    const [loaded ,setLoaded] = useState(0)
    const [duration ,setDuration] = useState(0)
    const [playbackRate ,setPlaybackRate] = useState(1.0)
    const [seeking, setSeeking] = useState(false)
    const [loop, setLoop] = useState(false)
    const ref = createRef()

    const load = url =>
    {
        setUrl(url)
        setPlayed(0)
        setLoaded(0)
    }

    const handlePlayPause = () =>
    {
        setPlaying(!playing)
    }

    const handleStop=()=>
    {
        setUrl(null)
        setPlaying(false)
    }

    const handleToggleControls=()=>
    {
        const url = url
        setControls(!controls)
        setUrl(null)
        load(url)
    }

    const handleVolumeChange = e =>
    {
        setVolume(parseFloat(e.target.value))
    }

    const handleSetPlaybackRate = e =>
    {
        setPlaybackRate(parseFloat(e.target.value))
    }

    const handlePlay= () =>
    {
        setPlaying(true)
    }

    const handlePause = () =>
    {
        setPlaying(false)
    }

    const  handleSeekMouseDown = e => {
        setSeeking(true)
    }

    const handleSeekChange = e => {
        setPlayed(parseFloat(e.target.value))
    }

    const handleSeekMouseUp = e => {
        setSeeking(false )
        ref.current.seekTo(parseFloat(e.target.value))
    }

    const handleProgress = state => {
        if (!seeking) {
            // console.log(state)
            setPlayed(state.played)
            setLoaded(state.loaded)
        }
    }

    const handleDuration = duration =>
    {
        setDuration(duration)
    }

    const handleEnded = () =>
    {
        setPlaying(loop)
    }


    return (
        <div>
            <div className='player-wrapper' >
                <ReactPlayer
                    ref={ref}
                    className='react-player'
                    url={url}
                    playing={playing}
                    controls={controls}
                    playbackRate={playbackRate}
                    volume={volume}
                    loop={loop}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />
            </div>

            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Controls</th>
                        <td>
                            <button onClick={handleStop}>Stop</button>
                            <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                        </td>
                    </tr>
                    <tr>
                        <th>Speed</th>
                        <td>
                            <button onClick={handleSetPlaybackRate} value={1}>1x</button>
                            <button onClick={handleSetPlaybackRate} value={1.5}>1.5x</button>
                            <button onClick={handleSetPlaybackRate} value={2}>2x</button>
                        </td>
                    </tr>
                    <tr>
                        <th>Seek</th>
                        <td>
                            <input
                                type='range' min={0} max={0.999999} step='any'
                                value={played}
                                onMouseDown={handleSeekMouseDown}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekMouseUp}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>
                            <input type='range' min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor='controls'>Controls</label>
                        </th>
                        <td>
                            <input id='controls' type='checkbox' checked={controls} onChange={handleToggleControls} />
                            <em>&nbsp; Requires player reload</em>
                        </td>
                    </tr>
                    <tr>
                        <th>Played</th>
                        <td><progress max={1} value={played} /></td>
                    </tr>
                    <tr>
                        <th>Loaded</th>
                        <td><progress max={1} value={loaded} /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>url</th>
                        <td className={!url ? 'faded' : ''}>
                            {(url instanceof Array ? 'Multiple' : url) || 'null'}
                        </td>
                    </tr>
                    <tr>
                        <th>playing</th>
                        <td>{playing ? 'true' : 'false'}</td>
                    </tr>
                    <tr>
                        <th>volume</th>
                        <td>{volume.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>speed</th>
                        <td>{playbackRate}</td>
                    </tr>
                    <tr>
                        <th>played</th>
                        <td>{played.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>loaded</th>
                        <td>{loaded.toFixed(3)}</td>
                    </tr>
                    <tr>
                        <th>duration</th>
                        <td><Duration seconds={duration} /></td>
                    </tr>
                    <tr>
                        <th>elapsed</th>
                        <td><Duration seconds={duration * played} /></td>
                    </tr>
                    <tr>
                        <th>remaining</th>
                        <td><Duration seconds={duration * (1 - played)} /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );

};

export default Player;
