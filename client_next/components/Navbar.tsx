"use client";

export default function navbar() {
    return (
        <div className="hidden md:flex h-15 z-20 py-5 px-10 bg-white/95 dark:bg-black/95 items-center justify-between w-170 mx-auto border border-black/10 dark:border-white/20 rounded-full my-5">
            <p className="font-extrabold text-[1.1rem] font-serif text-black dark:text-white">Vector</p>
            <div className="w-[55%] text-gray-600 mx-left px-5 h-full flex justify-between items-center cursor-pointer">
                <p className="transition-all duration-300 hover:text-black dark:text-white/50 dark:hover:text-white">Home</p>
                <p className="transition-all duration-300 hover:text-black dark:text-white/50 dark:hover:text-white">Contact Us</p>
                <p className="transition-all duration-300 hover:text-black dark:text-white/50 dark:hover:text-white">Support</p>
            </div>
        </div>
    );
}