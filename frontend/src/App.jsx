import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import NewProject from "./pages/NewProject";
import Materials from "./pages/Materials";
import IncomingGoods from "./pages/IncomingGoods";
import Conservation from "./pages/Conservation";
import Suppliers from "./pages/Suppliers";
import ControlMap from "./pages/ControlMap";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import WorkflowPrototypePage from "./pages/WorkflowPrototypePage";

import MaterialsPrototype from "./components/Prototype/MaterialsPrototype";
import LeveranciersPrototype from "./components/Prototype/LeveranciersPrototype";

export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/new" element={<NewProject />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />

                <Route path="/materials" element={<Materials />} />
                <Route path="/incoming-goods" element={<IncomingGoods />} />
                <Route path="/conservation" element={<Conservation />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/controlmap" element={<ControlMap />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />

                {/* Prototypes */}

                <Route
                    path="/Prototype"
                    element={<WorkflowPrototypePage />}
                />

                <Route
                    path="/prototype/materials"
                    element={<MaterialsPrototype />}
                />

                <Route
                    path="/prototype/suppliers"
                    element={<LeveranciersPrototype />}
                />
            </Routes>
        </Layout>
    );
}