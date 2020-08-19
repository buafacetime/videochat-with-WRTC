import React, { useState, Fragment } from 'react';


/**
 * @returns
 * form endsuer must enter room id or create one,
 * then submit form before begin allocated with a 
 * facetime room.
 */
const HomePage = (props) => {
  
    const [input, setInput] = useState('');
    const Submit = e => {
        e.preventDefault();
    
        props.history.push("/facetime");

    }

    return (

        <Fragment>
            <section id="installbanner">
                <button id="installBtn" onClick={e => {
                    alert("PWA installed")
                    e.target.blur();
                }}>Install</button>
               
                <h4>Takes 3 seconds, No AppStore Needed!</h4>
            </section>
            <form onSubmit={Submit}>
                <input type="text"
                    placeholder=" Enter room id or press create to generate one"
                    value={input}
                    onChange={e => setInput(e.target.value)} />

                <br />
                <section id="buttons">
                    <input type="button" value={"create"}
                        onClick={e => {
                            alert("create uuid button clicked");
                            e.target.blur()
                        }} />

                    <input type="submit" value="enter"
                        onClick={e => e.target.blur()} />
                </section>
            </form>

        </Fragment>
    )
}

export default HomePage
