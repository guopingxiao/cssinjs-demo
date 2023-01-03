import React from 'react';
import classNames from 'classnames';
import type { FooterColumn } from './column';
import Column from './column';
import type { GlobalToken } from 'antd/es/theme/interface';
import { useStyle } from './useStyle';

export interface FooterProps {
  prefixCls?: string;
  bottom?: React.ReactNode;
  maxColumnsPerRow?: number;
  columns?: FooterColumn[];
  theme?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  columnLayout?: 'space-around' | 'space-between';
}

export const genFooterStyle = (token: GlobalToken & {componentCls: string}) => {

  const { componentCls } = token
  return {
    [componentCls]: {
      paddingLeft: token.padding
    }
  }
}

const Footer: React.FC<FooterProps> = ({
  prefixCls = 'rc-footer',
  className,
  style,
  bottom,
  columns,
  maxColumnsPerRow,
  backgroundColor,
  columnLayout,
  theme = 'dark',
  ...restProps
}) => {
  // @ts-ignore
  const {wrapSSR, hashId } = useStyle(prefixCls, genFooterStyle)
  const footerClassName = classNames(`${prefixCls}`, className, {
    [`${prefixCls}-${theme}`]: !!theme,
  }, hashId);
  const shouldWrap =
    typeof maxColumnsPerRow === 'number' && maxColumnsPerRow > 0;
  return wrapSSR(
    <footer
      {...restProps}
      className={footerClassName}
      style={{
        ...style,
        backgroundColor,
      }}
    >
      <section className={`${prefixCls}-container`}>
        {columns && columns.length > 0 && (
          <section
            className={`${prefixCls}-columns`}
            style={{
              justifyContent: columnLayout,
              flexWrap: shouldWrap ? 'wrap' : undefined,
            }}
          >
            {columns.map(
              (
                {
                  title,
                  icon,
                  style: columnStyle,
                  className: columnClassName,
                  items = [],
                },
                i,
              ) => {
                const styleObject = { ...columnStyle } as React.CSSProperties;
                if (shouldWrap) {
                  styleObject.flex = `0 0 ${100 / (maxColumnsPerRow! + 1) +
                    0.1}%`;
                }
                return (
                  <Column
                    key={i}
                    prefixCls={prefixCls}
                    title={title}
                    icon={icon}
                    items={items}
                    style={styleObject}
                    className={columnClassName}
                  />
                );
              },
            )}
          </section>
        )}
      </section>
      {bottom && (
        <section className={`${prefixCls}-bottom`}>
          <div className={`${prefixCls}-bottom-container`}>{bottom}</div>
        </section>
      )}
    </footer>
  );
};

export default Footer;
