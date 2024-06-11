import useSocket from "./hooks/useSocket";
import Credits from "./components/Credits";
import { Container } from "./components/UI/Card";
import TaskList from "./components/TaksList";

export default function App() {
    const { queue, credits } = useSocket();

    if (!queue || !credits) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <TaskList tasks={queue} />
            <Credits credits={credits} />
        </Container >)
} 