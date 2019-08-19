// @flow
import React from 'react';
import { Layout } from 'antd';

import * as styles from './Styles.scss';

function Header() {
  return <Layout.Header className={styles.root} />;
}

export default Header;
