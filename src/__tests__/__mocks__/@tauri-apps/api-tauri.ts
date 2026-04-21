// Mock for @tauri-apps/api/tauri module
export const invoke = jest.fn();
export const convertFileSrc = jest.fn((path: string) => `file://mock/${path}`);
export const isTauri = jest.fn(() => false);
export const checkPermissions = jest.fn();
export const requestPermissions = jest.fn();
export const addPluginListener = jest.fn();
export const transformCallback = jest.fn();
export const Channel = jest.fn();
export const PermissionState = jest.fn();
export { convertFileSrc, invoke, isTauri };