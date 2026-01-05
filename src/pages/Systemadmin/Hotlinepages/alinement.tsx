// // i want you to convert for me this file and eliminate using tailwind completely and use react-boostrap only so with that i mean if it needs css do it but remove anything about tailwind i want to add it in my app, and my app uses strictly react-boostrap. so that is al l then add comments explaining every line of code, and also eslint, jest and prittier compliant.
// so what i want you to do is to refine for me this like to fite the version you have just given me right now. but don't break anything so you will generate for me a copy of a merged script i can copy and replace with my current script, so i want it to have all the styles and colors of the version you refined for me to use react-boostrap, dont break anything and code that is eslint, prittier and jest compliant. that. so it is all about looks nothing about functionality, so that is what i want to do, i want to improve my current callLogTable.tsx to match the code structure and styling of the code i shared with you in tailwind and requested you to remove it completely and use react-boostrap so i want you to merge my current version with that version you generated earlier.

// // Import React core library
// import React from 'react'

// // Import layout wrapper component
// import { Layout } from '../components/Layout'

// // Import custom stat card component
// import { StatCard } from '../components/StatCard'

// // Import chart components
// import { HotlineCallsChart } from '../components/HotlineCallsChart'
// import { CallReasonsChart } from '../components/CallReasonsChart'

// // Import table component
// import { CallLogTable } from '../components/CallLogTable'

// // Import detail components
// import { CriticalCases } from '../components/CriticalCases'
// import { OperatorPerformance } from '../components/OperatorPerformance'

// // Import icons from lucide-react
// import { Phone, Clock, Users } from 'lucide-react'

// // Import React-Bootstrap components for layout and styling
// import { Container, Row, Col } from 'react-bootstrap'

// // Define the HotlineActivity component
// export function HotlineActivity() {
//     return (
//         // Wrap the entire page inside the Layout component
//         <Layout>
//             {/* Container provides horizontal padding and centers content */}
//             <Container fluid="md" className="my-4">
//                 {/* Page Title Section */}
//                 <Row className="mb-4">
//                     <Col>
//                         {/* Main heading */}
//                         <h1 className="fw-bold text-dark">Hotline Activity</h1>
//                         {/* Subtitle description */}
//                         <p className="text-muted small">
//                             Real-time monitoring of crisis line operations and performance.
//                         </p>
//                     </Col>
//                 </Row>

//                 {/* Top Stats Row */}
//                 <Row className="mb-4">
//                     {/* Each Col holds one StatCard */}
//                     <Col xs={12} md={4} className="mb-3 mb-md-0">
//                         <StatCard
//                             title="Today's Calls"
//                             value="42"
//                             subtitle="Total incoming calls"
//                             trend="+8% vs yesterday"
//                             icon={Phone}
//                             color="success" // Bootstrap color variant instead of Tailwind
//                         />
//                     </Col>
//                     <Col xs={12} md={4} className="mb-3 mb-md-0">
//                         <StatCard
//                             title="Avg. Wait Time"
//                             value="0:32"
//                             subtitle="Average seconds to answer"
//                             trend="-0:05 vs last week"
//                             icon={Clock}
//                             color="primary"
//                         />
//                     </Col>
//                     <Col xs={12} md={4}>
//                         <StatCard
//                             title="Active Operators"
//                             value="8"
//                             subtitle="Currently online"
//                             icon={Users}
//                             color="warning"
//                         />
//                     </Col>
//                 </Row>

//                 {/* Charts Row */}
//                 <Row className="mb-4">
//                     <Col xs={12} lg={6} className="mb-3 mb-lg-0">
//                         <HotlineCallsChart />
//                     </Col>
//                     <Col xs={12} lg={6}>
//                         <CallReasonsChart />
//                     </Col>
//                 </Row>

//                 {/* Main Table */}
//                 <Row className="mb-4">
//                     <Col>
//                         <CallLogTable />
//                     </Col>
//                 </Row>

//                 {/* Bottom Details Row */}
//                 <Row>
//                     <Col xs={12} lg={6} className="mb-3 mb-lg-0">
//                         <CriticalCases />
//                     </Col>
//                     <Col xs={12} lg={6}>
//                         <OperatorPerformance />
//                     </Col>
//                 </Row>
//             </Container>
//         </Layout>
//     )
// }