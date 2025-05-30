const Card = ({ candidate, isSelected, votes }) => {
  return (
    <div className="w-50 ">
      <div
        className="cursor-pointer shadow-md rounded-full bg-[#3b5998] p-3 uppercase leading-normal text-white shadow-dark-3 shadow-black/30 transition duration-150 ease-in-out hover:shadow-dark-1 focus:shadow-dark-1 focus:outline-none focus:ring-0 active:shadow-1 dark:text-white"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        {candidate}
      </div>
      {isSelected && <p className="text-blue-800 font-bold mt-2">Selected</p>}
      {votes && <p className="text-blue-800 font-bold mt-2">{votes}</p>}
    </div>
  );
};

export default Card;
