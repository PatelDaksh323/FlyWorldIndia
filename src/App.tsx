import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import PageLoader from "./components/layout/PageLoader";

// Homepage is eager (it's the LCP page); everything else is code-split so a
// visitor landing on the Germany page never downloads the whole site.
import Home from "./pages/Home";

const StudyAbroadHub = lazy(() => import("./pages/StudyAbroadHub"));
const WorkPermitHub = lazy(() => import("./pages/WorkPermitHub"));
const VisitorVisaHub = lazy(() => import("./pages/VisitorVisaHub"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const PRMigration = lazy(() => import("./pages/PRMigration"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Study Abroad — hub + one template for every country */}
          <Route path="/study-abroad" element={<StudyAbroadHub />} />
          <Route path="/study-abroad/:slug" element={<CountryPage service="study-abroad" />} />

          {/* Europe Work Permit */}
          <Route path="/europe-work-permit" element={<WorkPermitHub />} />
          <Route path="/europe-work-permit/:slug" element={<CountryPage service="work-permit" />} />

          {/* Visitor Visa */}
          <Route path="/visitor-visa" element={<VisitorVisaHub />} />
          <Route path="/visitor-visa/:slug" element={<CountryPage service="visitor-visa" />} />

          <Route path="/pr-migration" element={<PRMigration />} />

          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/success-stories" element={<SuccessStories />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy" element={<Legal doc="privacy" />} />
          <Route path="/terms" element={<Legal doc="terms" />} />
          <Route path="/refund" element={<Legal doc="refund" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
