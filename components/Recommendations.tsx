"use client"
import { Button } from "./ui/button"
import Image from "next/image"

const recommendations: { name: string; value: string }[] = [
    { name: "🛠️ Projects", value: "projects" },
    { name: "🧠 Skills", value: "skills" },
    { name: "💼 Experience", value: "experience" },
    { name: "📜 Certifications", value: "certifications" },
    { name: "📬 Contact", value: "contact" }
]

interface RecommendationsProps {
    handleRecommendation: (value: string) => void;
}

export default function Recommendations({ handleRecommendation }: RecommendationsProps) {
    return (
        <>
            <div className="flex w-full gap-2 items-center justify-start">
            <a href="/resume/VIJAYLINGOJU-CV2.pdf" target="_blank" download="VIJAYLINGOJU-CV.pdf" className="flex w-full gap-2 items-center">
                <Image src="/resume.png" alt="Resume" width={20} height={20} />
                Download Resume
            </a>
            {recommendations.map((recommendation, index) => (
                <Button key={index} variant="outline" className="px-2 py-1 hover:bg-primary/40 cursor-pointer" onClick={() => {
                    handleRecommendation(recommendation.value);
                }}>
                    <p className="text-sm font-medium">{recommendation.name}</p>
                </Button>
            ))}
            </div>
        </>
    )
}
