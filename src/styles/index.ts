import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export const StyledMap = styled.section`
    @media (min-width: 40em) {
        border-radius: 3px;
    }
    position: relative;
    z-index: 0;
    grid-area: Map;
    height: 560px;
    width: 100%;
    overflow: hidden;
    border-radius: 0;
    .leaflet-container {
        height: 100%;
    }
`;
export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-template-rows: repeat(3, auto) 1fr;
    grid-template-areas: 'Select .' 'Stats Table' 'Map Table' 'Map Graph';
    gap: 20px;
    align-items: start;
    @media screen and (max-width: 1440px) {
        grid-template-areas: 'Select .' 'Stats Table' 'Map Graph' 'Map .';
    }
    @media screen and (max-width: 1075px) {
        grid-template-areas: 'Select .' 'Stats Table' 'Stats Graph' 'Map Map';
    }
    @media screen and (max-width: 740px) {
        grid-template-columns: 1fr;
        grid-template-areas: 'Select' 'Stats' 'Map' 'Table' 'Graph';
    }
`;
const spin = keyframes`
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;
export const Spinner = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    margin: 0;
    background: transparent;
    border-top: 4px solid #6517fa;
    border-right: 4px solid transparent;
    border-radius: 50%;
    -webkit-animation: 1s ${spin} linear infinite;
    animation: 1s ${spin} linear infinite;
`;

export const StyledTable = styled.aside`
    grid-area: Table;
    justify-self: center;
    @media screen and (min-width: 742px) {
        justify-self: start;
        align-items: start;
    }
    h3 {
        font-family: 'CrimsonPro-Roman-VF';
        font-variation-settings: 'wght' 350;
    }
    .img-wrapper {
        margin-right: 10px;
    }
    img {
        width: 22px;
        height: 15px;
        vertical-align: middle;
        object-fit: cover;
    }
    table {
        table-layout: fixed;
        border-radius: 3px;
        overflow: hidden;
        border-collapse: collapse;
        tbody {
            display: block;
            width: 100%;
            height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.4);
                border-radius: 10px;
            }
            tr {
                height: 40px;
                color: ${({ isDark, theme }: { isDark: boolean; theme: any }) => (isDark ? theme.colors.white : theme.colors.dark)};
                :nth-of-type(odd) {
                    background-color: ${({ isDark, theme }: { isDark: boolean; theme: any }) =>
                        isDark ? theme.colors.dark : theme.colors.white};
                }
                transition: background-color 0.3s ease-out, color 0.3s ease-in;
            }
        }
        th,
        td {
            text-align: left;
            padding: 0 10px;
        }
    }
`;
