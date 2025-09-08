import React from 'react';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsGrid } from '@mui/x-charts/ChartsGrid';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface RadarData {
  attribute: string;
  requirementScore: number;
  candidateScore: number;
  angle: number;
}

interface RadarChartProps {
  data?: RadarData[];
}

const defaultData: RadarData[] = [
  { attribute: 'Analytical', requirementScore: 4.5, candidateScore: 4.0, angle: 0 },
  { attribute: 'Problem\nSolver', requirementScore: 4.2, candidateScore: 3.8, angle: 72 },
  { attribute: 'Interpersonal\nSkills', requirementScore: 4.8, candidateScore: 4.5, angle: 144 },
  { attribute: 'Team\nPlayer', requirementScore: 4.0, candidateScore: 3.5, angle: 216 },
  { attribute: 'Technically\nProficient', requirementScore: 4.3, candidateScore: 3.7, angle: 288 }
];

export default function RadarChart({ data = defaultData }: RadarChartProps) {
  // 计算极坐标转换为笛卡尔坐标
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const centerX = 200;
  const centerY = 200;
  const maxRadius = 120;
  const maxValue = 5;

  // 生成网格线
  const gridLevels = [1, 2, 3, 4, 5];
  const gridLines = gridLevels.map(level => {
    const radius = (level / maxValue) * maxRadius;
    const points = data.map(item => 
      polarToCartesian(centerX, centerY, radius, item.angle)
    );
    return points;
  });

  // 生成数据路径
  const requirementPoints = data.map(item => {
    const radius = (item.requirementScore / maxValue) * maxRadius;
    return polarToCartesian(centerX, centerY, radius, item.angle);
  });

  const candidatePoints = data.map(item => {
    const radius = (item.candidateScore / maxValue) * maxRadius;
    return polarToCartesian(centerX, centerY, radius, item.angle);
  });

  // 创建路径字符串
  const createPath = (points: {x: number, y: number}[]) => {
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
  };

  const requirementPath = createPath(requirementPoints);
  const candidatePath = createPath(candidatePoints);

  return (
    <Card sx={{ 
      maxWidth: 500, 
      width: '100%', 
      height: '500px',
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          mb: 2,
          color: '#333'
        }}>
          Candidate Attributes
        </Typography>
        
        <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
          <svg width="400" height="400" viewBox="0 0 400 400">
            {/* 背景网格 */}
            {gridLines.map((points, index) => (
              <polygon
                key={index}
                points={points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#d0d0d0"
                strokeWidth="1"
              />
            ))}
            
            {/* 轴线 */}
            {data.map((item, index) => {
              const endPoint = polarToCartesian(centerX, centerY, maxRadius, item.angle);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke="#d0d0d0"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* 需求分数多边形 */}
            <path
              d={requirementPath}
              fill="transparent"
              stroke="#800080"
              strokeWidth="2"
            />
            
            {/* 候选人分数多边形 */}
            <path
              d={candidatePath}
              fill="transparent"
              stroke="#FF8C00"
              strokeWidth="2"
            />
            
            {/* 数据点 */}
            {requirementPoints.map((point, index) => (
              <circle
                key={`req-${index}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#800080"
              />
            ))}
            
            {candidatePoints.map((point, index) => (
              <circle
                key={`cand-${index}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#FF8C00"
              />
            ))}
            
            {/* 标签 */}
            {data.map((item, index) => {
              const labelRadius = maxRadius + 30;
              const labelPoint = polarToCartesian(centerX, centerY, labelRadius, item.angle);
              return (
                <text
                  key={`label-${index}`}
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill="#333"
                  fontWeight="500"
                >
                  {item.attribute.split('\n').map((line, lineIndex) => (
                    <tspan
                      key={lineIndex}
                      x={labelPoint.x}
                      dy={lineIndex === 0 ? 0 : 14}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            })}
          </svg>
        </Box>
        
        {/* 图例 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              width: 16, 
              height: 16, 
              backgroundColor: '#800080', 
              mr: 1 
            }} />
            <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>
              Requirement Score
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              width: 16, 
              height: 16, 
              backgroundColor: '#FF8C00', 
              mr: 1 
            }} />
            <Typography variant="body2" sx={{ color: '#333', fontSize: '0.9rem' }}>
              Candidate Score
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}