import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';

export default function Loader() {
    return <Spinner />;
}
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
const Spinner = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    margin: 0;
    background: transparent;
    border-top: 4px solid #45ffb2;
    border-right: 4px solid transparent;
    border-radius: 50%;
    -webkit-animation: 1s ${spin} linear infinite;
    animation: 1s ${spin} linear infinite;
`;
