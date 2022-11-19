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
};

function PromptsContainer({
  prompt,
  promptArray,
  guessCount,
  setGuessCount
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

  return (
    <>
      <Prompts
        prompt={formatPrompt()}
        promptArray={promptArray}
        setIsChecking={setIsChecking}
        isChecking={isChecking}
        inputs={inputs}
        guessCount={guessCount}
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
