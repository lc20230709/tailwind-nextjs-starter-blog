import React from "react";

const handleLinkClick = (url) => {
  window.open(url, "_blank");
};

const Widget = ({ title, imageUrl, link }) => (
  <div className="">
    <a
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      onClick={() => handleLinkClick(link)}
    >
      {title}
    </a>
    <img
      src={imageUrl}
      className="w-full cursor-pointer"
      href={link}
      onClick={() => handleLinkClick(link)}
    />
  </div>
);

const DataDisplay = ({ data }) => (
  <div className="-mx-2 flex flex-wrap">
    {data.map((item, index) => (
      <div key={index} className="">
        <Widget title={item.title} imageUrl={item.imageUrl} link={item.link} />
      </div>
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
    <div className="flex items-center justify-center pt-4">
      <div>
        <DataDisplay data={widgetData} />
      </div>
    </div>
  );
};

export default SideWidget;
