import React from "react";

const Widget = ({ title, imageUrl }) => (
  <div className="bg-gray-100 p-2">
    <p className="mt-2 text-center">{title}</p>
    <img src="/static/images/google.png" className="w-full" />
  </div>
);

const DataDisplay = ({ data }) => (
  <div className="-mx-2 flex flex-wrap">
    {data.map((item, index) => (
      <div key={index} className="">
        <Widget title={item.title} imageUrl={item.imageUrl} />
      </div>
    ))}
  </div>
);

const SideWidget = () => {
  const widgetData = [
    { title: "Title 1", imageUrl: "/pics/pic.jpg" },
    { title: "Title 2", imageUrl: "/pics/pic.jpg" },
    { title: "Title 3", imageUrl: "/pics/pic.jpg" },
    { title: "Title 4", imageUrl: "/pics/pic.jpg" },
  ];

  const listData = [
    { title: "List Item 1", imageUrl: "listImage1.jpg" },
    { title: "List Item 2", imageUrl: "listImage2.jpg" },
    { title: "List Item 3", imageUrl: "listImage3.jpg" },
    { title: "List Item 4", imageUrl: "listImage4.jpg" },
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
