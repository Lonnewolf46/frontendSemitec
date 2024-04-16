import KeyboardRow from "./keyboard-row";
export default function Keyboard() {
  return (
    <div>
      <KeyboardRow keyList={['', '1', '2', '3', '4', '5', '6', 
                        '7', '8', '9', '0', '', '', 'Supr']} />
      <KeyboardRow keyList={['Tab', 'q', 'w', 'e', 'r', 't', 'y', 
                        'u', 'i', 'o', 'p', '', '', '']} />
      <KeyboardRow keyList={['Bloq', 'a', 's', 'd', 'f', 'g', 'h', 
                        'j', 'k', 'l', 'ñ', '', 'Enter']} />
      <KeyboardRow keyList={['Mayús', 'z', 'x', 'c', 'v', 'b', 'n', 
                        'm', '', '', '', 'Mayús']} />
      <KeyboardRow keyList={['Ctrl', '', '', 'Alt', 'espacio', 'Alt', '', 
                        '', 'Ctrl' ]}/>
    </div>
  );
}