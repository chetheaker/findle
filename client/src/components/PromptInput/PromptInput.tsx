import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import './PromptInput.css';

import Spinner from '../Spinner/Spinner';

function PromptInput() {
  const [isFetching, setIsFetching] = useState(false);
  const [promptInput, setPromptInput] = useState('');

  function processPromptInput() {
    setIsFetching(true);
    console.log(promptInput);
    setIsFetching(false);
  }

  return (
    <form className="promptForm" onSubmit={processPromptInput}>
      <input
        placeholder="Your prompt goes here"
        type="text"
        required
        className="prompt-input"
        onChange={(e) => setPromptInput(e.target.value)}
      ></input>
      <Button>{isFetching ? <Spinner /> : 'Guess'}</Button>
    </form>
  );
}

export default PromptInput;
