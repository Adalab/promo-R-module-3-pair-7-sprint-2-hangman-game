import { useEffect, useState } from 'react';
//import components
import Header from './Header';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Dummy from './Dummy';

// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Dummy.scss';
import '../styles/Form.scss';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, index) => {
      const exists = userLetters.includes(letter.toLocaleLowerCase());
      return (
        <li key={index} className="letter">
          {exists ? letter : ''}
        </li>
      );
    });
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className="page">
      {<Header></Header>}
      <main className="main">
        <section>
          <SolutionLetters render={renderSolutionLetters()}></SolutionLetters>
          <ErrorLetters render={renderErrorLetters()}></ErrorLetters>
          <Form
            lastLetter={lastLetter}
            handleLastLetter={handleLastLetter}
          ></Form>
        </section>
        <Dummy userLetters={userLetters} word={word}></Dummy>
      </main>
    </div>
  );
}

export default App;
