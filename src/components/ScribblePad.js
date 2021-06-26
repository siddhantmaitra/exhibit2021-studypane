import { useState } from "react";
import Countable from "countable";

const ScribblePad = () => {
  const [content, setContent] = useState("");
  const [wordCnt, setWordCnt] = useState(0);
  const [charCnt, setCharCnt] = useState(0);

  const counting = () => {
    Countable.count(content, (counter) => {
      setWordCnt(counter.words);
      setCharCnt(counter.all);
    });
  };

  return (
    <>
      <h6>Scribble Pad</h6>
      <textarea
        cols="30"
        rows="10"
        spellCheck="false"
        onChange={(e) => {
          setContent(e.target.value);
          counting();
        }}
      ></textarea>
      <footer>
        <ul>
          <li>
            <p>{charCnt} :chars</p>
          </li>
          <li>
            <p>{wordCnt} :words</p>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default ScribblePad;
