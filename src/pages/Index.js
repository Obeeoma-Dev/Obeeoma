import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navigation from "@/components/shared/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/pages/landingpage/HowItWorks";
import Services from "@/pages/landingpage/Services";
import Features from "@/pages/landingpage/Features";
import Footer from "@/components/shared/Footer";
const Index = () => {
  return _jsxs("div", {
    className: "min-h-screen",
    children: [
      _jsx(Navigation, {}),
      _jsxs("main", {
        children: [
          _jsx(Hero, {}),
          _jsx("section", {
            id: "features",
            className: "section-bg py-5",
            children: _jsx(Features, {}),
          }),
          _jsx("section", {
            id: "howitworks",
            className: "section-bg-dark text-white py-5",
            children: _jsx(HowItWorks, {}),
          }),
          _jsx("section", {
            id: "services",
            className: "section-bg py-5",
            children: _jsx(Services, {}),
          }),
        ],
      }),
      _jsx(Footer, {}),
    ],
  });
};
export default Index;
