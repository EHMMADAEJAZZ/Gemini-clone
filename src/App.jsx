import { useEffect, useRef, useState } from 'react';
import './App.css';
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';
import Loader from './components/Loader';

function App() {
  const [result, setResult] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('q-history')));
  const [selectedHistory, setSelectedHistory] = useState('');
  const [darkMode, setDarkMode] = useState('dark')
  useEffect(() => {
    if (selectedHistory) {
      setQuestion(selectedHistory);
      handleAskQuestion()
     
    }
  },[selectedHistory]);
  useEffect(() => {
    console.log(darkMode);
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const scrollAns = useRef(null);
  
  const handleAskQuestion = async () => {
    if (!question && !selectedHistory) {
      alert('Please enter a question');
      return;
    }
    try {
      setLoading(true);
      if(question){
        if(localStorage.getItem('q-history')){
          let history = JSON.parse(localStorage.getItem('q-history'));
          history = [question, ...history];
          localStorage.setItem('q-history', JSON.stringify(history));
          setRecentHistory(history);
        }else{
          localStorage.setItem('q-history', JSON.stringify([question]));
          setRecentHistory([question]);
        }
      }
      const payloadData=question || selectedHistory;
      const payload = {
        contents: [
          {
            parts: [
              {
                text: payloadData,
              },
            ],
          },
        ],
      };
      const response = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if(data.error) {
        alert(data.error.message);
      }
      let dataString = data?.candidates[0]?.content?.parts[0]?.text;
      dataString = dataString?.split('* ');
      dataString = dataString?.map((item) => item.trim());
      setResult([
        ...result,
        { type: 'q', text: question?question:selectedHistory },
        { type: 'a', text: dataString },
      ]);
      setQuestion('');
      setTimeout(() => {
        scrollAns.current.scrollTop = scrollAns.current.scrollHeight;
      }
      , 500);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  const isEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAskQuestion(e);
      setQuestion('');
    }
  };
  return ( 
    <div className={`${darkMode === 'dark' ? 'dark' : 'light'} `}>

    <div className='grid grid-cols-5 gap-1 h-screen text-center text-black dark:text-white '>
      <select className='fixed w-28 bottom-0 outline-none rounded-md capitalize px-2 h-10 bg-zinc-700 text-white'   onChange={(e)=>{setDarkMode(e.target.value)}}>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>
      <div className='col-span-1 max-h-screen dark:bg-zinc-800 bg-red-100 py-5 text-[16px] md:text-xl '>
          <RecentSearch setRecentHistory={setRecentHistory} recentHistory={recentHistory} setSelectedHistory={setSelectedHistory} />
          
          
        
      </div>
      <div className='col-span-4 relative'>
        <h2 className='mt-10 pb-5 text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 '>
          Hello user,Ask me Anything
        </h2>
        {loading && (
              <Loader/>
            )}
        <div ref={scrollAns} className='container h-110 mt-2 px-10  overflow-y-scroll'>
          <div className='text-zinc-300'>
            <ul>
              {result &&
                result?.map((item, index) => (
                 <QuestionAnswer item={item} key={index} index=
                 {index}/>
                ))}
            </ul>
         
          </div>
        </div>
        <div className='border w-[300px] md:w-[400px] min-w-[300px]  m-auto rounded-full p-3 border-slate-400 flex  items-center mt-5 bg-red-100 dark:bg-zinc-800'>
          <input
            type='text'
            value={question}
            onKeyDown={isEnter}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder='Type your question here...'
            className='input-field outline-none flex-1'
          />
          <button
            onClick={handleAskQuestion}
            disabled={loading}
            type='submit'
            className={`submit-button  w-fit capitalize ${
              loading ? 'cursor-wait' : 'cursor-pointer'
            }`}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
    </div>

  );
}

export default App;
