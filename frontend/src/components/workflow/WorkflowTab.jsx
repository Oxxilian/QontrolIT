import WorkflowPrototype from "./WorkflowPrototype";

export default function WorkflowTab({
    selectedPhase,
    workflow,
    onWorkflowChange,
}) {

    return (
        <WorkflowPrototype
            selectedPhase={selectedPhase}
            workflow={workflow}
            onWorkflowChange={onWorkflowChange}
        />
    );

}