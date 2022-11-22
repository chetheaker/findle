import './PromptsContainer.css';

import PromptInput from '../PromptInputs/PromptInputs';
import Prompts from '../Prompts/Prompts';
import { useState } from 'react';

type Prompt = {
  word: string;
  type: string;
};

type PromptsContainerProps = {
  prompt: string;
  promptArray: Prompt[];
  guessCount: number;
  setGuessCount: React.Dispatch<React.SetStateAction<number>>;
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  creationDate: number;
};

function PromptsContainer({
  prompt,
  promptArray,
  guessCount,
  setGuessCount,
  complete,
  setComplete,
  creationDate
}: PromptsContainerProps) {
  const [inputs, setInputs] = useState<any>({});
  const [isChecking, setIsChecking] = useState(false);

  const formatPrompt = () => {
    let formattedPrompt = prompt;
    for (let i = 0; i < promptArray.length; i++) {
      formattedPrompt = formattedPrompt.replace(
        promptArray[i].word,
        i.toString()
      );
    }
    return formattedPrompt;
  };

  if (!localStorage.getItem('answers')) {
    localStorage.setItem('answers', JSON.stringify({}));
  }

  return (
    <>
      <Prompts
        prompt={formatPrompt()}
        promptArray={promptArray}
        setIsChecking={setIsChecking}
        isChecking={isChecking}
        inputs={inputs}
        guessCount={guessCount}
        complete={complete}
        setComplete={setComplete}
        creationDate={creationDate}
      />
      <PromptInput
        prompt={formatPrompt()}
        promptArray={promptArray}
        setInputs={setInputs}
        setIsChecking={setIsChecking}
        setGuessCount={setGuessCount}
      />
    </>
  );
}

export default PromptsContainer;
