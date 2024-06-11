import styled from "styled-components";

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

export const ActionList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

export const ActionItem = styled.li`
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:nth-child(even) {
        background-color: #e9ecef;
    }
`;
