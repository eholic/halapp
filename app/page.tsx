'use client';

import {useState} from 'react';

type kanaDict = {
    [key: string]: string
}

const en2kana: kanaDict = {
  "1": "ぬ", "2": "ふ", "3": "あ", "4": "う", "5": "え", "6": "お", "7": "や", "8": "ゆ", "9": "よ", "0": "わ", "-": "ほ", "^": "へ",
  "q": "た", "w": "て", "e": "い", "r": "す", "t": "か", "y": "ん", "u": "な", "i": "に", "o": "ら", "p": "せ",
  "a": "ち", "s": "と", "d": "し", "f": "は", "g": "き", "h": "く", "j": "ま", "k": "の", "l": "り", ";": "れ", ":": "け", "]": "む",
  "z": "つ", "x": "さ", "c": "そ", "v": "ひ", "b": "こ", "n": "み", "m": "も", ",": "ね", ".": "る", "/": "め", "_": "ろ",
}

export default function Home() {
  const [eng, setEng] = useState(false);
  const [text, setText] = useState('');

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    const code = e.code;

    let speak = "";
    let _eng = eng;

    if (code.indexOf("Arrow") != -1) {
      _eng = !_eng;
      setEng(_eng);
      if (_eng) {
        speak = "English Mode";
        setText("えいご");
      }else{
        speak = "日本語モード";
        setText("にほんご");
      }
    } else {
      if(_eng) {
        speak = key;
        setText(key.toUpperCase());
      }else{
        speak = en2kana[key.toLowerCase()];
        setText(en2kana[key.toLowerCase()]);
      }
    }


    // speak
    const uttr = new SpeechSynthesisUtterance(speak);
    if (_eng) {
      uttr.lang = "en-US";
    }else{
      uttr.lang = "ja-JP";
    }
    window.speechSynthesis.speak(uttr);
  }


  return (
    <div className="container h-dvh content-center"
      tabIndex={0}
      onKeyDown={keyDownHandler}>

      <p className="text-9xl flex justify-center">{text}</p>
    </div>
  );
}
