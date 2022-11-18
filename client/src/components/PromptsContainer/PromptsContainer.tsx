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
};

function PromptsContainer({ prompt, promptArray }: PromptsContainerProps) {
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
      />
      <PromptInput
        prompt={formatPrompt()}
        promptArray={promptArray}
        setInputs={setInputs}
        setIsChecking={setIsChecking}
      />
    </>
  );
}

export default PromptsContainer;
