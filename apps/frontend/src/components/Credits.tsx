import styled from "styled-components";
import { Credit } from "../types"
import { Card, CardTitle } from "./UI/Card";

type CreditsProps = {
    credits: Credit[]
}

export const CreditList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;
export const CreditItem = styled.li`
    font-size: 1rem;
    margin-bottom: 5px;
    background-color: #f1f1f1;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


export default function Credits({ credits }: CreditsProps) {
    return (<Card>
        <CardTitle>Crédits</CardTitle>
        <CreditList>
            {credits && credits.map(credit => (
                <CreditItem key={credit.type}>{credit.type}: {credit.remaining}</CreditItem>
            ))}
        </CreditList>
    </Card>
    )
}