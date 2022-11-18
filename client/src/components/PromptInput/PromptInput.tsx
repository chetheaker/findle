import {useState} from 'react';

import Spinner from '../Spinner/Spinner';

function PromptInput() {
  const [isFetching, setIsFetching] = useState(false);
  const [promptInput, setPromptInput] = useState('');

  function processPromptInput() {
  }
  return (
    <form className="promptForm" onSubmit={processPromptInput}>
    <input
      placeholder="Write your promt. Be creative."
      type="text"
      required
      onChange={(e) => setPromptInput(e.target.value)}
    ></input>
    <button>{isFetching ? <Spinner /> : <>{console.log(promptInput)}</>}</button>
  </form>
  )
}

export default PromptInput;