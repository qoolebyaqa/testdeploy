import { useRef, useState, ClipboardEvent, ChangeEvent, useEffect, KeyboardEvent } from "react";

const ConfirmationCode = ({code, setCode, clearFn}:{code: string[], setCode: any, clearFn: () => void}) => {
  const [seconds, setSeconds] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSeconds(prev => prev-1);
    }, 1000)
    if (seconds === 0) {
      clearInterval(timeOut);
      clearFn();
    }
    return () => clearInterval(timeOut);
  }, [seconds])

  const handleChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleErase = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("Text");
    if (/^\d{6}$/.test(pasteData)) {
      const newCode = pasteData.split("");
      setCode(newCode);
      inputRefs.current[5]?.focus();
    }
    event.preventDefault();
  };

  return (
    <>
      <div className="flex justify-between mt-10">
        <p>Код подтверждения</p>
        <p>00:{seconds > 9 ? seconds : `0${seconds}`}</p>
      </div>
      <div className="flex justify-center text-black">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) => handleErase(e, index)}
            onPaste={handlePaste}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              margin: "8px",
              fontSize: "24px",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ConfirmationCode;
