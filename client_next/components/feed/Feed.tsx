"use client";

import { useEffect } from "react";
import axios from "axios";
import PostList from "./PostList";
import { useAppContext } from "@/context/AppContext";

export default function Feed() {
    const { posts, setPosts } = useAppContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/posts",{ withCredentials: true });
            setPosts(res.data || []);
        };

        fetchPosts();
    }, []);

    return (
        <div className="hide-scrollbar w-full px-5 md:px-10 pt-14 md:pt-0 pb-10">
            <PostList posts={posts} />
        </div>
    );
}
