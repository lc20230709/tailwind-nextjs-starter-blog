import React from "react";

const handleLinkClick = (url) => {
  window.open(url, "_blank");
};

const Widget = ({ title, imageUrl, link }) => (
  <div className="my-4 px-4 md:my-2 md:px-2">
    <div className="flex flex-col items-center">
      <a
        className="w-full truncate text-center hover:bg-red-700"
        onClick={() => handleLinkClick(link)}
        title={title}
      >
        {title}
      </a>
      <img
        src={imageUrl}
        onClick={() => handleLinkClick(link)}
        className="cursor-pointer hover:scale-110"
        alt={title}
      />
    </div>
  </div>
);

const DataDisplay = ({ data }) => (
  <div className="flex flex-wrap">
    {data.map((item, index) => (
      <Widget
        key={index}
        title={item.title}
        imageUrl={item.imageUrl}
        link={item.link}
      />
    ))}
  </div>
);

const SideWidget = ({ widgetData }) => {
  if (!widgetData) {
    return <div></div>;
  }
  return (
    <div className="flex cursor-pointer flex-wrap justify-center text-center">
      <DataDisplay data={widgetData} />
    </div>
  );
};

export default SideWidget;
