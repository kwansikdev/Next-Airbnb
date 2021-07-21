declare module 'googlemaps';

declare global {
  interface window {
    google: any;
    initMap: () => void;
  }
}
