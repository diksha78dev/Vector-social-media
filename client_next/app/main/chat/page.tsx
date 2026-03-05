"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Send } from "lucide-react";

export default function ChatListPage() {

    const { userData } = useAppContext();
    const router = useRouter();

    const [conversations, setConversations] = useState<any[]>([]);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

    useEffect(() => {
        const fetchConversations = async () => {
            const { data } = await axios.get(`${BACKEND_URL}/api/conversation`, { withCredentials: true });
            setConversations(data);
        };
        if (userData?.id) {
            fetchConversations();
        }
    }, [userData]);

    return (
        <div className="h-screen overflow-y-auto">

            <h1 className="text-xl font-bold p-4 bg-white/15 text-white text-center md:text-left">
                Your chats
            </h1>

            <div className="flex flex-col p-5 gap-2">
                {conversations.map((convo) => {

                    const otherUser = convo.participants.find(
                        (p: any) => p._id !== userData?.id
                    );

                    return (
                        <div
                            key={convo._id}
                            onClick={() => router.push(`/main/chat/${convo._id}`)}
                            className="flex items-center gap-3 p-4 rounded-md cursor-pointer bg-white/20 hover:bg-white/30 hover:shadow-lg text-white transition-all duration-200"
                        >

                            <img
                                src={otherUser?.avatar || "/default-avatar.png"}
                                className="h-12 w-12 rounded-full object-cover"
                            />

                            <div>
                                <p className="font-semibold">
                                    {otherUser?.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    @{otherUser?.username}
                                </p>
                            </div>
                            <Send className="ml-auto opacity-70"/>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}