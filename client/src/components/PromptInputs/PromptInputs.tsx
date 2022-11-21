import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import './PromptInputs.css';

type PromptInputProps = {
  prompt: string;
  promptArray: Prompt[];
  setInputs: React.Dispatch<any>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  setGuessCount: React.Dispatch<React.SetStateAction<number>>;
};

type Prompt = {
  word: string;
  type: string;
};

function PromptInputs({
  prompt,
  promptArray,
  setInputs,
  setIsChecking,
  setGuessCount
}: PromptInputProps) {
  const promptAsArray = prompt.split(' ');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsChecking(true);
    setGuessCount((prev) => {
      localStorage.setItem('guessCount', JSON.stringify(prev + 1));
      return prev + 1;
    });
    promptAsArray
      .filter((word) => !isNaN(+word))
      .forEach((word) => {
        if (!e.target[promptArray[+word].type].disabled) {
          e.target[promptArray[+word].type].value = '';
        }
      });
  };

  useEffect(() => {
    const localInputs = JSON.parse(localStorage.getItem('answers') as string);
    setInputs(localInputs);
  }, [setInputs]);

  const handleInputChange = (type: string, value: string) => {
    setInputs((prev: any) => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <form className="promptForm" id="prompt-form" onSubmit={handleSubmit}>
      {promptAsArray
        .filter((word) => !isNaN(+word))
        .map((word, index) => {
          return (
            <input
              placeholder={promptArray[+word].type}
              type="text"
              required
              name={promptArray[+word].type}
              disabled={false}
              className="prompt-input active"
              onChange={(e) =>
                handleInputChange(promptArray[+word].type, e.target.value)
              }
              key={index}
              autoComplete="off"
            />
          );
        })}
      <Button colorScheme="green" className="guess" type="submit">
        Guess
      </Button>
    </form>
  );
}

export default PromptInputs;
