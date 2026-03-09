import ReactGA from "react-ga4";

type GAEventParams = Record<string, string | number | boolean | undefined>;

class AnalyticsService {
  private initialized = false;

  init(measurementId?: string) {
    if (!measurementId) {
      console.warn("GA_MEASUREMENT_ID is missing. Analytics disabled.");
      return;
    }
    if (!this.initialized) {
      ReactGA.initialize(measurementId);
      this.initialized = true;
    }
  }

  pageView(path: string) {
    if (!this.initialized) return;
    ReactGA.send({ hitType: "pageview", page: path });
  }

  event(name: string, params?: GAEventParams) {
    if (!this.initialized) return;
    ReactGA.event(name, params);
  }
}

export const analytics = new AnalyticsService();
