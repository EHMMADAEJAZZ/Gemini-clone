import { useEffect, useState } from "react";
import { checkHeading } from "../helper";
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Answer = ({index,answer,totalResults,type}) => {
  const [heading, setHeading] = useState(false)
  useEffect(() => {
    
    if(checkHeading(answer)){
      setHeading(true);
    }
  },[answer]);
 
  const renderer = {
    code: ({node, inline, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
       <SyntaxHighlighter
       {...props}
       children={String(children).replace(/\n$/, '')}
       language={match[1]}
       style={dark}
        PreTag="div"
       />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
   
  }
  return (
    <>
    
            <div className="text-zinc-800  dark:text-white">
              {
               index===0 && totalResults > 1?<span className="text-2xl block">{answer}</span>: heading ? 
                <span className="text-lg block">{answer.replace(/\*\*|\*/g, '')}</span> :
                <span className={type==="q"?"pl-1 ":"pl-5"}>
                  <Markdown components={renderer}>{answer}</Markdown>
                </span>
              }
            </div>
    </>
  )
}

export default Answer