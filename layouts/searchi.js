import React, { useState, useEffect } from "react";

const SearchBar = ({ query, setQuery }) => {
  const [suggestions, setSuggestions] = useState([]); // 存储搜索建议
  const [hasSelectedSuggestion, setHasSelectedSuggestion] = useState(false); // 新增状态变量

  let timeoutId;
  // 模拟一个获取搜索建议的 API 请求
  const fetchSuggestions = async (input) => {
    // 用于模拟 API 请求，实际情况下你会在这里调用真实的 API
    const sugURL = process.env.NEXT_PUBLIC_BACKEND_SUGG;
    const response = await fetch(sugURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords: input }),
    });
    const sugg = JSON.parse(await response.json())["suggestions"];
    setSuggestions(sugg);
  };

  useEffect(() => {
    if (query && !hasSelectedSuggestion) {
      // 只有当 query 的长度大于 2 时才进行搜索
      clearTimeout(timeoutId); // 清除上一个定时器
      timeoutId = setTimeout(() => fetchSuggestions(query), 300); // 设置新的定时器
    }
  }, [query]);

  const handleSuggestionClick = (sug) => {
    setQuery(sug); // 更新父组件的查询词
    setSuggestions(sug);
    setSuggestions([]); // 清空搜索建议，使下拉菜单消失
    setHasSelectedSuggestion(true);
  };

  const handleInputFocus = () => {
    setHasSelectedSuggestion(false); // 重置状态变量
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="w-full rounded-3xl border-red-500 dark:bg-gray-800 dark:text-gray-100 md:w-[390px]"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleInputFocus}
      />
      <ul className="w-full rounded-lg bg-gray-300 shadow-lg md:w-[390px]">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)} // 当点击建议时，设置 query
            className="cursor-pointer p-2 text-gray-900 transition duration-200 ease-in-out hover:bg-gray-400 hover:text-white"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
