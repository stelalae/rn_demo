declare global {
  namespace global {
    /**
     * HermesInternal
     */
    const HermesInternal: null | {};

    /**
     * 当前用户信息
     */
    let HxUserInfo: null | {};

    /**
     * 当前环境服务器接口
     */
    let apiServer: null | '';
  }
}

export {};
