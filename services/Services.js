/**
 * Created by nghinv on Fri Jun 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */
import AsyncStorage from '@react-native-community/async-storage';
import { ENV } from './env';

const SERVER_TYPE_KEY_STORE = 'APP_MODE';

class Services {
  static server_type = 'product';

  static server = ENV[this.server_type];

  static getServerType = async () => {
    try {
      const serverType = await AsyncStorage.getItem(SERVER_TYPE_KEY_STORE);
      if (serverType) {
        this.server_type = serverType;
        this.server = ENV[serverType];

        return serverType;
      }
      return this.server;
    } catch (error) {
      return this.server;
    }
  }

  static setServerType = async (serverType) => {
    try {
      this.server_type = serverType;
      this.server = ENV[serverType];
      await AsyncStorage.setItem(SERVER_TYPE_KEY_STORE, serverType);
    } catch (error) {
      return false;
    }
  }
}

export { Services };
