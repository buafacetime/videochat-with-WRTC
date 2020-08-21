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
    <main>
      {/* remove banner section when pwa is installed */}
      <section id="installbanner">
        <button
          id="installBtn"
          onClick={(e) => {
            // show pwa install prompt
            window.pwaInstallPrompt.prompt();
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
        <br/>
        <p>
          &#128400;, welcome please follow instructions below on how to setup a
          video call through the browser.
        </p>
        <br/>
        <ol>
          <li>generate room id or enter one</li>
          <br/>
          <li>copy and share room id via any mediam you wish</li>
          <br/>
          <li>
            enter room of genrated room id and wait for other peer to enter
          </li>
          <br/>
          <li>once other peer has joined, caller will be notified</li>
          <br/>
          <li>caller may start video call</li>
          <br/>
          <li>facetime</li>
        </ol>
      </form>

      <footer>&copy; 2020 KT Motshoana</footer>
    </main>
  );
};

export default HomePage;
