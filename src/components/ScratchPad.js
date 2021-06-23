import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Countable from "countable";
import { useState } from "react";

const useStyles = makeStyles({
  inputText: {
    width: "100%",
    padding: "0.5em",
    resize: "none",
    height: "15em",
    lineHeight: 1.9,
    border: "none",
    overflow: "auto",
    outline: "none",
    boxShadow: "none",
  },
  list: {
    listStyle: "none",
    float: "right",
  },
});

const ScratchPad = () => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [wordCnt, setWordCnt] = useState(0);
  const [charCnt, setCharCnt] = useState(0);

  function counting() {
    Countable.count(content, (counter) => {
      setWordCnt(counter.words);
      setCharCnt(counter.all);
    });
  }

  return (
    <div>
      <textarea
        placeholder="Start Writing..."
        spellcheck="false"
        className={classes.inputText}
        onChange={(e) => {
          setContent(e.target.value);
          counting();
        }}
      ></textarea>

      <footer role="contentinfo">
        {/* <button id="info" class="info-btn" title="Info">
          <svg>
            <use xlink:href="#icon-info-outline"></use>
          </svg>
        </button> */}
        <ul className={classes.list}>
          <li id="charCounter">
            <Typography variant="body1">{charCnt} :chars</Typography>
          </li>
          <li id="wordCounter">
            <Typography variant="body1">{wordCnt} :words</Typography>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default ScratchPad;
