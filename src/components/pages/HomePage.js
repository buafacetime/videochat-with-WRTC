import React, { useState } from 'react'

/**
 * @returns
 * form endsuer must enter room id or create one,
 * then submit form before begin allocated with a 
 * facetime room.
 */
const HomePage = () => {
    const [input, setInput] = useState('');

    return (

        <form onSubmit={e => {
            e.preventDefault();
            console.log("submitting form")
            console.log(input)
        }}>
            <input type="text"
                placeholder="Enter room id or press create to generate one"
                value={input}
                onChange={e => setInput(e.target.value)} />

          <br/>
          <section id="buttons">
          <input type="button" value={"create"}
                onClick={e => {
                    console.log("create uuid button clicked")
                }} />

            <input type="submit" value="enter" />
          </section>
        </form>

    )
}

export default HomePage
