import React, { useState, useEffect } from 'react';

const SearchBar = ({ query, setQuery }) => {
    const [suggestions, setSuggestions] = useState([]);  // 存储搜索建议

    // 模拟一个获取搜索建议的 API 请求
    const fetchSuggestions = async (input) => {
        // 用于模拟 API 请求，实际情况下你会在这里调用真实的 API
        const sugURL = process.env.NEXT_PUBLIC_BACKEND_SUGG;
        console.log(sugURL);
        const response = await fetch(sugURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ keywords: input }),
        });
        const sugg = JSON.parse(await response.json())["suggestions"];
        setSuggestions(sugg);
    };

    // 当 query 改变时，获取新的搜索建议
    useEffect(() => {
        if (query) {
            fetchSuggestions(query);
        }
    }, [query]);

    return (
        <div className="flex flex-col items-center">
            <input className='rounded-3xl w-full md:w-[390px] border-red-500'
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}  // 更新 query
            />
            <ul className="bg-gray-300 rounded-lg shadow-lg p-4 w-full md:w-[390px]"> 
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => setQuery(suggestion)}  // 当点击建议时，设置 query
                        className="text-gray-900 hover:bg-gray-400 hover:text-white cursor-pointer p-2 transition duration-200 ease-in-out"
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;
