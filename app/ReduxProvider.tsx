'use client';

import { store } from '@/libs/frontend/store';
import { Provider } from 'react-redux';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
