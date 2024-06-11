import React, { useState } from "react";
import { Action } from "./../types/index";
import { ActionContainer, ActionItem, ActionList } from "./UI/Action";
import { Card, CardTitle } from "./UI/Card";
import { Button, Select } from "./UI/Form";
import { useActionTypes } from "../hooks/useActionTypes";
import { useAddAction } from "../hooks/useAddAction";

type TaskListProps = {
    tasks: Action[]
}

export default function TaskList({ tasks }: TaskListProps) {
    const { actionTypes, loading: loadingActionTypes, error: errorActionTypes } = useActionTypes();
    const { addNewAction, loading: loadingAddAction, error: errorAddAction } = useAddAction();
    const [newAction, setNewAction] = useState<string>('');

    const handleAddAction = async () => {
        await addNewAction(newAction);
    };

    return (
        <div>
            <Card>
                <CardTitle>Liste de Tâches</CardTitle>
                <ActionContainer>
                    {loadingActionTypes ? (
                        <p>Loading action types...</p>
                    ) : errorActionTypes ? (
                        <p>Error: {errorActionTypes}</p>
                    ) : (
                        <>
                            <Select value={newAction} onChange={e => setNewAction(e.target.value)}>
                                <option key='' value={''}>--- Sélectionnez un type ---</option>
                                {actionTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Select>
                            <Button onClick={handleAddAction} disabled={loadingAddAction || newAction === ''}>
                                {loadingAddAction ? 'Adding...' : 'Add Action'}
                            </Button>
                        </>
                    )}
                    {errorAddAction && <p>Error: {errorAddAction}</p>}
                </ActionContainer>
                <ActionList>
                    {tasks.map((action, index) => (
                        <ActionItem key={index}>{index + 1} : {action.type}</ActionItem>
                    ))}
                </ActionList>
            </Card>
        </div>
    )
}
