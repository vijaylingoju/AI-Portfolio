"use client"
import { Button } from "./ui/button"

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
        <div className="flex w-full gap-2 items-center justify-start">
            {recommendations.map((recommendation, index) => (
                <Button key={index} variant="outline" className="px-2 py-1 hover:bg-primary/40 cursor-pointer" onClick={() => {
                    handleRecommendation(recommendation.value);
                }}>
                    <p className="text-sm font-medium">{recommendation.name}</p>
                </Button>
            ))}
        </div>
    )
}
