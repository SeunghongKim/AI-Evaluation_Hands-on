import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Overview } from './pages/Overview';
import { NonGenerativeOverview } from './pages/non-generative/NonGenerativeOverview';
import { SampleBias } from './pages/non-generative/SampleBias';
import { LabelingBias } from './pages/non-generative/LabelingBias';
import { SocialBias } from './pages/non-generative/SocialBias';
import { Performance } from './pages/non-generative/Performance';
import { Fairness } from './pages/non-generative/Fairness';
import { Explainability } from './pages/non-generative/Explainability';
import { GenerativeOverview } from './pages/generative/GenerativeOverview';
import { RepresentationBias } from './pages/generative/RepresentationBias';
import { FormatBias } from './pages/generative/FormatBias';
import { PreferenceBias } from './pages/generative/PreferenceBias';
import { GenerativePerformance } from './pages/generative/GenerativePerformance';
import { Safety } from './pages/generative/Safety';
import { GenerativeExplainability } from './pages/generative/GenerativeExplainability';
import { AgenticTask } from './pages/AgenticTask';
import { Coverage } from './pages/Coverage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/non-generative" element={<NonGenerativeOverview />} />
        <Route path="/non-generative/sample-bias" element={<SampleBias />} />
        <Route path="/non-generative/labeling-bias" element={<LabelingBias />} />
        <Route path="/non-generative/social-bias" element={<SocialBias />} />
        <Route path="/non-generative/performance" element={<Performance />} />
        <Route path="/non-generative/fairness" element={<Fairness />} />
        <Route path="/non-generative/explainability" element={<Explainability />} />
        <Route path="/generative" element={<GenerativeOverview />} />
        <Route path="/generative/representation-bias" element={<RepresentationBias />} />
        <Route path="/generative/format-bias" element={<FormatBias />} />
        <Route path="/generative/preference-bias" element={<PreferenceBias />} />
        <Route path="/generative/performance" element={<GenerativePerformance />} />
        <Route path="/generative/safety" element={<Safety />} />
        <Route path="/generative/explainability" element={<GenerativeExplainability />} />
        <Route path="/agentic-task" element={<AgenticTask />} />
        <Route path="/coverage" element={<Coverage />} />
      </Routes>
    </Layout>
  );
};

export default App;
