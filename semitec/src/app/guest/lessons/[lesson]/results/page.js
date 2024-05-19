import LessonResults from '@/app/components/lesson-results'
export default function Results({ metrics, handleContinue}) {
    return (
        <LessonResults  metrics={metrics} handleContinue={handleContinue}/>
    )
}