"use client";

import { useAppContext } from "@/context/AppContext";
import PostCard from "@/components/feed/Postcard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { userData, posts, setPosts, loading } = useAppContext();
    const [postsLoading, setPostsLoading] = useState(false);

    const router = useRouter();

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

    useEffect(() => {
        if (posts.length > 0) return;

        const fetchPosts = async () => {
            try {
                setPostsLoading(true);
                const { data } = await axios.get(BACKEND_URL + "/api/posts", {
                    withCredentials: true,
                });
                setPosts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setPostsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading || postsLoading) {
        return <p className="p-10">Loading...</p>;
    }

    if (!userData) {
        return <p className="p-10">Not logged in</p>;
    }

    const userPosts = posts.filter(
        (post) => post.author._id === userData.id
    );

    return (
        <div className="px-7 py-5">
            <div className="flex items-start gap-6 mb-8">
                <img
                    src={userData.avatar || "/default-avatar.png"}
                    className="h-28 w-28 rounded-full object-cover border"
                />

                <div className="flex flex-col gap-2 w-full">
                    <div className="w-full flex justify-between">
                        <h1 className="text-2xl font-bold">
                            {userData.name} {userData.surname}
                        </h1>
                        <button className="mt-3 w-fit px-4 py-1.5 rounded-md border bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 dark:hover:bg-white/10"
                        onClick={() => router.push('/main/settings')}>
                            <Edit className="h-4"/> Edit profile
                        </button>
                    </div>

                    <p className="text-gray-500">
                        @{userData.username}
                    </p>

                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        {userData.bio}
                    </p>

                    <p className="text-sm opacity-80">
                        {userData.description}
                    </p>

                </div>
            </div>

            <div className="flex flex-col gap-6">
                {userPosts.length === 0 ? (
                    <p className="text-gray-500">
                        You haven't posted anything yet.
                    </p>
                ) : (
                    userPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}
