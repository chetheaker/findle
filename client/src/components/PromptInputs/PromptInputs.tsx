import { Button } from '@chakra-ui/react';
import './PromptInputs.css';

type PromptInputProps = {
  prompt: string;
  promptArray: Prompt[];
  setInputs: React.Dispatch<any>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
};

type Prompt = {
  word: string;
  type: string;
};

function PromptInputs({
  prompt,
  promptArray,
  setInputs,
  setIsChecking
}: PromptInputProps) {
  const promptAsArray = prompt.split(' ');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsChecking(true);

    promptAsArray
      .filter((word) => !isNaN(+word))
      .forEach((word) => {
        if (!e.target[promptArray[+word].type].disabled) {
          e.target[promptArray[+word].type].value = '';
        }
      });
  };

  const handleInputChange = (type: string, value: string) => {
    setInputs((prev: any) => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <form className="promptForm" onSubmit={handleSubmit}>
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
              className="prompt-input"
              onChange={(e) =>
                handleInputChange(promptArray[+word].type, e.target.value)
              }
              key={index}
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
