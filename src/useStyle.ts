import type { CSSInterpolation } from '@ant-design/cssinjs';
import {useStyleRegister } from '@ant-design/cssinjs'
import { theme as AntdTheme } from 'antd'
import type { GlobalToken } from 'antd/es/theme/interface'
import type React from 'react';


export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
  > = (token: ComponentToken) => ReturnType;


export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};




/**
 * 封装了一下 antd 的 useStyle
 * @param componentName {string} k2d组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns {UseStyleResult}
 */
export function useStyle(
  componentName: string,
  styleFn: (token: GlobalToken) => CSSInterpolation
): UseStyleResult {

  const { theme, token, hashId } = AntdTheme.useToken()


  return {
    wrapSSR: useStyleRegister(
      {
        theme,
        token,
        hashId,
        path: [componentName]
      },
      () => styleFn(token)
    ),
    hashId
  }
}