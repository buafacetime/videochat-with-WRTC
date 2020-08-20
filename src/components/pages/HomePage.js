import React, { useState, useRef, Fragment } from "react";
import clipboard from "../../svg/clipboard.svg";
import { nanoid } from "nanoid";

/**
 * @returns
 * form endsuer must enter room id or create one,
 * then submit form before begin allocated with a
 * facetime room.
 */
const HomePage = (props) => {
  const copyInput = useRef(null);
  const [input, setInput] = useState("");
  const Submit = (e) => {
    e.preventDefault();
    if (input.length > 0 && typeof input === "string") {
      props.history.push({ pathname: "/facetime", state: { room: input } });
    } else {
      // just to irritate internet gangsters.
      input.toString();
      location.reload();
    }
  };

  const Copied = (e) => {
    e.preventDefault();
    /*Select text field */
    copyInput.current.select();
    /*For mobile devices*/
    copyInput.current.setSelectionRange(0, 99999);
    /* Copy the text inside the text field */
    document.execCommand("copy");
  };

  return (
    <Fragment>
      {/* remove banner section when pwa is installed */}
      <section id="installbanner">
        <button
          id="installBtn"
          onClick={(e) => {
            alert("PWA installed");
            e.target.blur();
          }}
        >
          Install
        </button>

        <h4>Takes 3 seconds, No AppStore Needed!</h4>
      </section>
      {/* remove above banner section when pwa is installed */}
      <form onSubmit={Submit}>
        <button id="copy" onClick={Copied}>
          <img src={clipboard} alt="copy board" />
        </button>
        <input
          ref={copyInput}
          type="text"
          placeholder=" Enter room id or press create to generate one"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={"false"}
        />

        <br />
        <section id="buttons">
          <input
            type="button"
            value={"create"}
            onClick={(e) => {
              setInput(nanoid());
              e.target.blur();
            }}
          />

          <input type="submit" value="enter" onClick={(e) => e.target.blur()} />
        </section>
      </form>

      <footer>&copy; 2020 KT Motshoana</footer>
    </Fragment>
  );
};

export default HomePage;
