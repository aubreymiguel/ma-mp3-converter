import axios from "axios";
import { useRef, useState } from "react";
import { youtubeParser } from "./utils";
import myLogo from './logo/my_logo.PNG';

function App() {

  const inputUrl = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtubeParser(inputUrl.current.value);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(error => console.log(error))

      inputUrl.current.value = '';

  }

  const handleConvertNewVideo = () => {
    setUrlResult(null);
  };

  return (

    <div className="main">
      <span className="navbar--title">
        <img src={myLogo} className="navbar--logo" />
      </span>
      <section className="content">
        <h1 className="content--title">
          Youtube to mp3 converter
        </h1>
        <p className="content--description">
          Transform YouTube videos into MP3 with MA.mp3!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrl} placeholder="Paste Youtube link here" className="form--input" type="text" />
          <button type="submit" className="form--button">Convert</button>
        </form>

        {urlResult ?
          <>
          <a target='_blank' rel="noreferrer" href={urlResult}>
              <button className="download--btn">
                Download MP3
              </button>
            </a>
            <button onClick={handleConvertNewVideo} className="convert--new">
              Convert New Video
            </button>
          </>
         : ""
        }
      </section>
    </div>
   
  );

}

export default App;
