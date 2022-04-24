import { CommunicationColors, NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { createChart, CrosshairMode, UTCTimestamp } from 'lightweight-charts';
import React, { FC, useEffect, useRef } from 'react';

import { COLORS } from '../../constants/styles';
import { StockCandle } from '../../models/Chart';

export type ChartType = 'candle' | 'bar' | 'line' | 'area';

interface ChartProps {
  data: StockCandle[];
  type: ChartType;
  withVolume?: boolean;
  isMinimal?: boolean;
}

interface LightweightStockCandle extends StockCandle {
  time: UTCTimestamp;
}

const prepareData = (type: ChartType | 'volume', data: StockCandle[]): LightweightStockCandle[] => {
  if (type === 'line' || type === 'area') {
    return data.map((candle) => ({
      ...candle,
      time: candle.time as UTCTimestamp,
      value: candle.close,
    }));
  }

  return data.map((candle) => ({ ...candle, time: candle.time as UTCTimestamp }));
};

const barColors = {
  upColor: COLORS.GREEN,
  downColor: COLORS.RED,
  borderDownColor: COLORS.RED,
  borderUpColor: COLORS.GREEN,
  wickDownColor: '#838ca1',
  wickUpColor: '#838ca1',
};

export const ChartComponent: FC<ChartProps> = ({
  data,
  type,
  withVolume = false,
  isMinimal = false,
}) => {
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
        localization: {
          priceFormatter: (price) => `${price.toFixed(2)} $`,
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

      if (withVolume) {
        const volumeSeries = chart.addHistogramSeries({
          color: CommunicationColors.primary,
          priceFormat: {
            type: 'volume',
          },
          priceLineVisible: false,
          priceScaleId: '',
          scaleMargins: {
            top: 0.8,
            bottom: 0,
          },
        });

        volumeSeries.setData(prepareData('volume', data));
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    }
  }, [data, type, withVolume]);

  return <div style={{ width: '100%', height: '100%' }} ref={chartContainerRef} />;
};
