import styled from "styled-components";

export const ChartContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 280px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1b2a49;
`;

export const PieWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  canvas {
  width: 150px !important;
  height: 150px !important;
}
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #1b2a49;
`;

export const ColorBox = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color};
  border-radius: 3px;
`;
