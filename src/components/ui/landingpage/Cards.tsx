import * as React from "react";

interface ICardsProps {
    title:string;
    content:string;
}

const Cards: React.FunctionComponent<ICardsProps> = (props) => {
  return (
    <>
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {props.content}
        </p>
      </div>
    </>
  );
};

export default Cards;
