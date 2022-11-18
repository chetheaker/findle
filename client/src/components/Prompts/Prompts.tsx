import { useEffect } from 'react';
import './Prompts.css';

type PromptsProps = {
  prompt: string;
  promptArray: Prompt[];
  isChecking: boolean;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: any;
};

type Prompt = {
  word: string;
  type: string;
};

function Prompts({
  prompt,
  promptArray,
  isChecking,
  setIsChecking,
  inputs
}: PromptsProps) {
  const promptAsArray = prompt.split(' ');

  useEffect(() => {
    if (isChecking) {
      console.log(inputs);
      const unknownPrompts = document.getElementsByClassName('unknown');
      for (let i = 0; i < promptArray.length; i++) {
        const inputValue = inputs[promptArray[i].type].toLowerCase();
        const promptValue = promptArray[i].word.toLowerCase();
        if (inputValue === promptValue) {
          const type = promptArray[i].type;
          let found;
          for (let i = 0; i < unknownPrompts.length; i++) {
            if (unknownPrompts[i].textContent === type) {
              found = unknownPrompts[i];
              break;
            }
          }
          if (found) {
            found.classList.remove('unknown');
            found.classList.add('known');
            found.textContent = promptArray[i].word;

            const input = document.getElementsByName(
              promptArray[i].type
            )[0] as any;
            input.disabled = true;
            input.value = promptArray[i].word;
          }
        }
      }
      setIsChecking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecking]);

  return (
    <div className="prompts">
      <h1>
        {promptAsArray.map((word, index) => {
          if (!isNaN(+word)) {
            return (
              <span key={index} className="unknown">
                {promptArray[+word].type}
              </span>
            );
          } else {
            return <span key={index}>{word} </span>;
          }
        })}
      </h1>
    </div>
  );
}

export default Prompts;
