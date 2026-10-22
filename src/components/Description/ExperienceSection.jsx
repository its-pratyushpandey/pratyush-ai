import React, { useState } from "react";
import { motion } from "framer-motion";

const experiences = [
	{
		company: "Calibo",
		role: "AI Trainee",
		period: "2026",
		location: "India",
		tech: ["Python", "Machine Learning", "Generative AI", "LLMs", "RAG", "Azure"],
		details: [
			"Developing enterprise-grade AI solutions, LLM pipelines, and automated agent workflows solving real-world business problems.",
			"Collaborating with mentors and engineering teams to design scalable systems and ship production-ready AI features.",
			"Strengthening engineering fundamentals through REST APIs, vector databases, cloud infrastructure, and iterative delivery.",
		],
	},
	{
		company: "EtharaAI",
		role: "AI Intern",
		period: "Jan 2026 – May 2026",
		location: "Gurugram, India",
		tech: ["Python", "LLMs", "RAG", "Model Evaluation", "Prompt Engineering", "Data Annotation"],
		details: [
			"Contributed to Large Language Model (LLM) post-training workflows through data preparation, response evaluation, and quality analysis to improve model performance and reliability.",
			"Performed structured data processing, validation, and prompt evaluation while ensuring data quality, consistency, and accuracy across AI model evaluation workflows.",
			"Evaluated LLM outputs against structured criteria, identifying issues related to accuracy, relevance, instruction following, and response quality across AI evaluation workflows.",
		],
	},
	{
		company: "MERN Hackathon",
		role: "Full Stack Developer – NextHire",
		period: "2025",
		location: "K L University",
		tech: [
			"MongoDB",
			"Express",
			"React",
			"Node.js",
			"JWT",
			"Redux",
			"OpenAI API",
			"Framer Motion",
		],
		details: [
			"Developed *NextHire*, an AI-powered recruitment platform with secure authentication and role-based access.",
			"Built features including job posting, application tracking, and admin dashboard.",
			"Integrated *NextChat* for real-time recruiter-applicant communication.",
			"Implemented AI modules: resume parser, cover letter generator, job matching, interview prep, and fraud detection.",
			"Enhanced UI/UX with React, Redux, and Framer Motion; ensured responsive, high-performance frontend.",
		],
	},
	{
		company: "FSAD Hackathon",
		role: "Full Stack Developer – Video Streaming Platform",
		period: "2024",
		location: "K L University",
		tech: ["Java", "Spring Boot", "MySQL", "REST API"],
		details: [
			"Developed a video streaming app with Spring Boot and MySQL.",
			"Created REST APIs for video upload, playback, and user management.",
			"Led team coordination and implemented authentication features.",
			"Optimized database queries for performance.",
			"Learned to work under tight deadlines and deliver quality results.",
		],
	},
	{
		company: "PFSD Hackathon",
		role: "Frontend Developer – CodeSync (Collaborative Code Editor)",
		period: "2024",
		location: "K L University",
		tech: ["Python", "Django", "WebSockets", "SQL"],
		details: [
			"Built a real-time collaborative code editor using Django and WebSockets.",
			"Implemented multi-user editing, group chat, copilot and a compiler in it.",
			"Handled backend logic, user authentication, and real-time synchronization.",
			"Collaborated with a team to design and develop the application.",
			"Gained practical experience in software development and teamwork.",
		],
	},
	{
		company: "Smart India Hackathon",
		role: "Web Developer – HealthNest",
		period: "2023 ",
		location: "Vaddeswaram, Andhra Pradesh",
		tech: ["HTML", "CSS", "Javascript", "C", "Data Structures", "Algorithms"],
		details: [
			"Gained practical experience through hackathons and coding competitions.",
			"Built a solid foundation in software development and programming.",
			"Collaborated on coding projects and team assignments.",
			"Enhanced technical skills through extracurricular activities.",
			"Developed a portfolio showcasing web development and programming expertise.",
		],
	},
	{
		company: "Senior Secondary Education",
		role: "Student",
		period: "2021 – 2023",
		location: "Sedhan",
		tech: ["C", "HTML", "CSS", "JavaScript"],
		details: [
			"Built foundational skills in C, HTML, CSS.",
			"Created basic websites, sparking interest in web development.",
			"Explored various programming languages and frameworks.",
			"Contributed to school projects involving basic web applications.",
			"Developed a passion for software development and web technologies.",
		],
	},
];

const sectionVariants = {
	hidden: { opacity: 0, y: 60 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.15,
			duration: 0.8,
			when: "beforeChildren",
		},
	},
};
const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ExperienceSection = () => {
	const [selectedIdx, setSelectedIdx] = useState(0);
	const selectedExp = experiences[selectedIdx];

	return (
		<section
			id="experience"
			className="w-full min-h-[100vh] flex flex-col md:flex-row items-stretch justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e3f2fd] py-0 relative overflow-x-hidden"
		>
			<div
				className="absolute inset-0 z-0 bg-gradient-to-br from-[#e3f2fd] to-[#b3e5fc] opacity-60"
				style={{ backgroundAttachment: "fixed" }}
			/>
			<aside className="relative z-10 md:w-1/4 w-full flex md:flex-col flex-row md:items-start items-center md:justify-center justify-start bg-transparent md:py-24 py-4 px-2 md:px-0 overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-r border-[#b3e5fc]/40 md:ml-16 ml-4">
				<nav className="flex md:flex-col flex-row w-full md:w-auto gap-0 relative">
					<div
						className="absolute md:left-6 left-4 md:top-0 top-8 md:bottom-0 bottom-8 w-1 bg-gradient-to-b from-[#b3e5fc] to-[#201d66] rounded-full"
						style={{ zIndex: 0 }}
					/>
					{experiences.map((exp, idx) => (
						<motion.button
							key={exp.company}
							className={`relative z-10 flex items-center md:items-start px-2 py-3 md:px-4 md:py-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#201d66] focus:ring-offset-2 bg-transparent text-[#201d66] rounded-none border-none shadow-none hover:bg-[#e3f2fd]/60 group w-full md:w-auto`}
							onClick={() => setSelectedIdx(idx)}
							aria-label={`Show details for ${exp.company}`}
							tabIndex={0}
							onKeyDown={(e) =>
								(e.key === "Enter" || e.key === " ") &&
								setSelectedIdx(idx)
							}
							style={{
								minWidth: "160px",
								marginBottom: 0,
								marginLeft: 0,
								marginRight: 0,
							}}
							whileHover={{ scale: 1.04, x: 6 }}
							whileTap={{ scale: 0.98 }}
							initial="hidden"
							animate="visible"
							variants={itemVariants}
						>
							<span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full font-bold text-lg md:text-xl bg-[#e3f2fd] text-[#201d66] shadow-md mr-4 md:mr-6">
								{String(idx + 1).padStart(2, "0")}
							</span>
							<span className="flex flex-col items-start text-left">
								<span className="font-semibold text-sm md:text-base">
									{exp.company}
								</span>
								<span className="text-xs md:text-sm opacity-70 font-normal">
									{exp.role.split("–")[0]}
								</span>
								<span className="text-xs md:text-sm opacity-60 font-medium mt-1">
									{exp.period}
								</span>
							</span>
						</motion.button>
					))}
				</nav>
			</aside>
			<main className="relative z-10 flex-1 flex flex-col items-center justify-center px-2 md:px-12 py-12 md:py-24 min-h-[60vh]">
				<div className="w-full max-w-2xl mx-auto mb-8">
					<h2 className="text-3xl md:text-4xl font-extrabold text-[#201d66] tracking-tight text-left drop-shadow-sm bg-gradient-to-r from-[#201d66] to-[#3949ab] bg-clip-text text-transparent animate-gradient-x">
						My Journey
					</h2>
					<div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#201d66] via-[#3949ab] to-[#80deea] mt-2 mb-4 animate-pulse"></div>
				</div>
				<motion.div
					className="w-full max-w-2xl mx-auto flex flex-col gap-6"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
				>
					<div className="flex items-center gap-3 mb-2">
						<span className="inline-block bg-[#201d66] text-white rounded-full px-3 py-1 text-xs font-bold tracking-widest shadow">
							{String(selectedIdx + 1).padStart(2, "0")}
						</span>
						<h2 className="text-2xl md:text-3xl font-extrabold text-[#201d66] leading-tight">
							{selectedExp.company}
						</h2>
						<span className="text-xs md:text-sm text-[#3949ab] font-medium bg-[#e3f2fd] rounded px-2 py-1 ml-auto">
							{selectedExp.period}
						</span>
					</div>
					<div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-1 mb-2">
						<span className="text-base md:text-lg text-[#3949ab] font-semibold">
							{selectedExp.role}
						</span>
						<span className="text-sm md:text-base text-[#201d66] font-medium">
							{selectedExp.location}
						</span>
					</div>
					<div className="flex flex-wrap gap-2 mt-2">
						{[...new Set(selectedExp.tech)].map((tech, i) => (
							<span
								key={i}
								className="bg-[#e3f2fd] text-[#3949ab] px-2 py-1 rounded text-xs md:text-sm font-medium border border-[#b3e5fc] shadow-sm"
							>
								{tech}
							</span>
						))}
					</div>
					<ul className="list-none mt-6 space-y-4">
						{selectedExp.details.map((detail, i) => (
							<li
								key={i}
								className="flex items-start gap-3 text-[#201d66] text-base md:text-lg font-medium"
							>
								<span className="mt-1 text-[#80deea] text-xl md:text-2xl">
									•
								</span>
								<span className="leading-relaxed">{detail}</span>
							</li>
						))}
					</ul>
				</motion.div>
			</main>
		</section>
	);
};

export default ExperienceSection;