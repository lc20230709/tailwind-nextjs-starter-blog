import React from "react";

const handleLinkClick = (url) => {
  window.open(url, "_blank");
};

const Widget = ({ title, imageUrl, link }) => (
  <div className="w-full p-2 md:w-1/4">
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

const SideWidget = () => {
  const widgetData = [
    {
      title: "Title 1",
      imageUrl: "/static/images/pic.jpg",
      link: "http://google.com",
    },
    {
      title: "Title 2",
      imageUrl: "/static/images/pic.jpg",
      link: "http://google.com",
    },
    {
      title: "Title 3",
      imageUrl: "/static/images/pic.jpg",
      link: "http://google.com",
    },
    {
      title: "Title 4",
      imageUrl: "/static/images/pic.jpg",
      link: "http://google.com",
    },
  ];

  return (
    <div className="flex cursor-pointer flex-wrap justify-center text-center">
      <DataDisplay data={widgetData} />
    </div>
  );
};

export default SideWidget;
