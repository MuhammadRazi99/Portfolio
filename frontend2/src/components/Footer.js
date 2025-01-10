import React from 'react';

function Footer() {
	return (
		<div className="py-5 bg-[#2e8b57;] text-center text-black-300 rounded-t-lg mt-10">
			<a href="#hero" className="block text-xl md:text-2xl font-semibold">
                Muhammad Razi Ur Rehman
			</a>
			<a
				href="mailto:muhmmedraziurrehman@gmail.com"
				className="text-sm md:text-md hover:text-black-500"
			>
				muhammedraziurrehman@gmail.com
			</a>
			<p className="text-xs mt-2 text-black-500">
				© MuhammadRazi99 {new Date().getFullYear()}. All rights reserved
			</p>
		</div>
	);
}

export default Footer;