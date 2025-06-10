import { Link } from "react-router-dom";

const Button = ({ path, text }) => {
  return (
    <Link to={`/${path}`}>
      <button className="w-60 h-15 bg-[#1E3A8A] text-3xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151]  rounded-2xl">
        {text}
      </button>
    </Link>
  );
};

export default Button;
