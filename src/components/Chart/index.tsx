import { CommunicationColors, NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { getUnixTime } from 'date-fns';
import { createChart, CrosshairMode, UTCTimestamp } from 'lightweight-charts';
import React, { FC, useEffect, useRef } from 'react';

import { COLORS } from '../../constants/styles';
import { TimeSeriesValues } from '../../models';

export type ChartType = 'candle' | 'bar' | 'line' | 'area';

interface ChartProps {
  data: TimeSeriesValues[];
  type: ChartType;
  isMinimal?: boolean;
}

interface LightweightStockCandle extends Omit<TimeSeriesValues, 'time'> {
  time: UTCTimestamp;
}

const comparator = function (a: { time: number }, b: { time: number }) {
  if (a.time > b.time) {
    return 1;
  }
  if (a.time < b.time) {
    return -1;
  }
  // a должно быть равным b
  return 0;
};

const prepareData = (
  type: ChartType | 'volume',
  data: TimeSeriesValues[],
): LightweightStockCandle[] => {
  if (type === 'line' || type === 'area') {
    return data
      .map((candle) => ({
        ...candle,
        time: getUnixTime(new Date(candle.time)) as UTCTimestamp,
        value: candle.close,
      }))
      .sort(comparator);
  }

  return data
    .map((candle) => ({
      ...candle,
      time: getUnixTime(new Date(candle.time)) as UTCTimestamp,
    }))
    .sort(comparator);
};

const barColors = {
  upColor: COLORS.GREEN,
  downColor: COLORS.RED,
  borderDownColor: COLORS.RED,
  borderUpColor: COLORS.GREEN,
  wickDownColor: '#838ca1',
  wickUpColor: '#838ca1',
};

export const ChartComponent: FC<ChartProps> = ({ data, type, isMinimal = false }) => {
  const chartContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        crosshair: {
          mode: CrosshairMode.Normal,
          horzLine: {
            visible: !isMinimal,
          },
          vertLine: {
            visible: !isMinimal,
          },
        },
        grid: {
          horzLines: {
            visible: !isMinimal,
          },
          vertLines: {
            visible: !isMinimal,
          },
        },
        rightPriceScale: {
          visible: !isMinimal,
        },
        timeScale: {
          visible: !isMinimal,
        },
      });
      chart.timeScale().fitContent();

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      let series;

      if (type === 'bar') {
        series = chart.addBarSeries({ ...barColors, priceLineVisible: !isMinimal });
      }

      if (type === 'candle') {
        series = chart.addCandlestickSeries({ ...barColors, priceLineVisible: !isMinimal });
      }

      if (type === 'line') {
        series = chart.addLineSeries({
          color: CommunicationColors.primary,
          priceLineVisible: !isMinimal,
        });
      }

      if (type === 'area') {
        series = chart.addAreaSeries({
          lineColor: CommunicationColors.primary,
          topColor: CommunicationColors.tint20,
          bottomColor: NeutralColors.white,
          priceLineVisible: !isMinimal,
        });
      }

      series.setData(prepareData(type, data));

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    }
  }, [data, type]);

  return <div style={{ width: '100%', height: '100%' }} ref={chartContainerRef} />;
};
