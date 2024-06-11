import styled from "styled-components";

export const Select = styled.select`
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1em;
    width: 100%;
    max-width: 200px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #007bff;
        cursor: not-allowed;
    }
`;
