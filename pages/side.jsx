import React from "react";

const handleLinkClick = (url) => {
  window.open(url, "_blank");
};

const Widget = ({ title, imageUrl, link }) => (
  <div className="w-10/12">
    <a className="hover:bg-red-700" onClick={() => handleLinkClick(link)}>
      {title}
    </a>
    <img
      src={imageUrl}
      href={link}
      onClick={() => handleLinkClick(link)}
      className="hover:scale-110"
    />
  </div>
);

const DataDisplay = ({ data }) => (
  <div className="flex">
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
    <div className="flex cursor-pointer flex-wrap justify-center text-center">
      <div>
        <DataDisplay data={widgetData} />
      </div>
    </div>
  );
};

export default SideWidget;
