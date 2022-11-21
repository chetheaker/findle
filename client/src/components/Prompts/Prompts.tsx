import { Button, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import './Prompts.css';
import ShareModal from '../ShareModal/ShareModal';

type PromptsProps = {
  prompt: string;
  promptArray: Prompt[];
  isChecking: boolean;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  inputs: any;
  guessCount: number;
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
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
  inputs,
  guessCount,
  complete,
  setComplete
}: PromptsProps) {
  const promptAsArray = prompt.split(' ');
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            found!.parentElement.classList.add('flip');
            found!.nextElementSibling.textContent = promptArray[i].word;

            const input = document.getElementsByName(
              promptArray[i].type
            )[0] as any;
            input.disabled = true;
            input.value = promptArray[i].word;
            input.classList.remove('active');
          }
        }
      }

      if (unknownPrompts.length === 0) {
        setComplete(true);
        setTimeout(() => {
          onOpen();
        }, 1000);
        const form = document.getElementById('prompt-form');
        if (form) form.style.display = 'none';
      }

      // focus on first available input
      const firstInput = document.querySelector('.active') as HTMLInputElement;
      if (firstInput) firstInput.focus();

      if (guessCount === 5) {
        setComplete(true);
        const unknownCopy: any[] = [...unknownPrompts];
        for (let i = 0; i < unknownCopy.length; i++) {
          console.log(unknownCopy);
          unknownCopy[i].nextElementSibling!.style.background = '#c53030';
          unknownCopy[i].classList.remove('unknown');
          unknownCopy[i].parentElement.classList.add('flip');
          unknownCopy[i].nextElementSibling.textContent = promptArray[i].word;
          for (let j = 0; j < promptArray.length; j++) {
            if (unknownCopy[i].textContent === promptArray[j].type) {
              unknownCopy[i].textContent = promptArray[j].word;
            }
          }
        }
        setTimeout(() => {
          onOpen();
        }, 1000);
        const form = document.getElementById('prompt-form');
        if (form) form.style.display = 'none';
      }
      setIsChecking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecking]);

  return (
    <>
      <div className="prompts">
        {promptAsArray.map((word, index) => {
          if (!isNaN(+word)) {
            return (
              <div className="flip-card" key={index}>
                <div className="flip-card-inner">
                  <div className="unknown flip-card-front">
                    {promptArray[+word].type}
                  </div>
                  <div className="flip-card-back"></div>
                </div>
              </div>
            );
          } else {
            return <div key={index}>{word} </div>;
          }
        })}
        <div className="guess-count">{guessCount} / 5 Guesses</div>
      </div>
      {complete && <Button onClick={onOpen}>View Results</Button>}
      <ShareModal
        onClose={onClose}
        isOpen={isOpen}
        inputs={inputs}
        prompt={prompt}
        promptArray={promptArray}
        complete={complete}
      />
    </>
  );
}

export default Prompts;
