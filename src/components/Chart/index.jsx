// TradingViewWidget.jsx
"use client"
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

// https://streaming.bitquery.io/graphql
// api key: BQY49xcdnlISaS93oY4lQN2cDBaYZfhu

export default function Chart({ styles , SYMBOL}) {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_90793') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: SYMBOL,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: "tradingview_90793",
          });
        }
      }
    },
    []
  );

  return (
    <div className={`${styles} flex-col justify-center md:p-0 p-[20px]`}>
        <div id='tradingview_90793' className='h-full w-full rounded-[10px]' />
    </div>
  );
}
