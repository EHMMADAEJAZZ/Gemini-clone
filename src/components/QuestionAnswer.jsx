import Answer from "./Answer"

const QuestionAnswer = ({item,index}) => {
  return (
    <div
    key={index}
    className={item?.type === 'q' ? 'flex justify-end my-4' : ''}
  >
    {item?.type === 'q' ? (
      <li
        key={index + Math.random()}
        className='text-right  border-8 bg-red-100 border-red-100 dark:border-zinc-700 dark:bg-zinc-700 w-fit rounded-tl-3xl rounded-bl-3xl rounded-br-3xl '
      >
        <Answer
          index={index}
          answer={item?.text}
          totalResults={1}
          type={item?.type}
        />
      </li>
    ) : (
      item.text.map((ans, ansIndex) => (
        <li
          key={ansIndex + Math.random()}
          className='text-left mt-2'
        >
          <Answer
            index={ansIndex}
            answer={ans}
            totalResults={item.length}
            type={item.type}
          />
        </li>
      ))
    )}
  </div>
  )
}

export default QuestionAnswer