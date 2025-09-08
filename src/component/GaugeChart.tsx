import * as React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

interface GaugeChartProps {
  relevantYears?: number;
  requestYears?: number;
  totalYears?: number;
}

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  // 调整指针计算，确保指向正确方向
  const tipLength = outerRadius * 0.72;
  const tipX = cx + tipLength * Math.sin(valueAngle);
  const tipY = cy - tipLength * Math.cos(valueAngle);

  const halfBase = Math.max(8, outerRadius * 0.06);
  const px = halfBase * Math.cos(valueAngle);
  const py = halfBase * Math.sin(valueAngle);

  const base1X = cx - px;
  const base1Y = cy + py;
  const base2X = cx + px;
  const base2Y = cy - py;

  return (
    <g>
      {/* 中心圆 */}
      <circle cx={cx} cy={cy} r={10} fill="#263238" />
      {/* 三角形指针 */}
      <path
        d={`M ${base1X} ${base1Y} L ${tipX} ${tipY} L ${base2X} ${base2Y} Z`}
        fill="#263238"
      />
    </g>
  );
}

export default function GaugeChart({
  relevantYears = 2.8,
  requestYears = 5,
}: GaugeChartProps) {
  const percent = Math.min((relevantYears / requestYears) * 100, 100);

  return (
    <GaugeContainer
      width={300}
      height={220}
      startAngle={-90}
      endAngle={90}
      value={percent}
    >
      {/* 背景灰色弧（右侧） */}
      <GaugeReferenceArc style={{ fill: '#cfd8e7' }} />
      {/* 绿色进度弧（左侧） */}
      <GaugeValueArc
        style={{ fill: '#4caf50' }}
      />
      <GaugePointer />
    </GaugeContainer>
  );
}
