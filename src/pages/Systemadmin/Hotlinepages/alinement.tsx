// // // i want you to convert for me this file and eliminate using tailwind completely and use react-boostrap only so with that i mean if it needs css do it but remove anything about tailwind i want to add it in my app, and my app uses strictly react-boostrap. so that is al l then add comments explaining every line of code, and also eslint, jest and prittier compliant.
// // so what i want you to do is to refine for me this like to fite the version you have just given me right now. but don't break anything so you will generate for me a copy of a merged script i can copy and replace with my current script, so i want it to have all the styles and colors of the version you refined for me to use react-boostrap, dont break anything and code that is eslint, prittier and jest compliant. that. so it is all about looks nothing about functionality, so that is what i want to do, i want to improve my current callLogTable.tsx to match the code structure and styling of the code i shared with you in tailwind and requested you to remove it completely and use react-boostrap so i want you to merge my current version with that version you generated earlier.

// // Import React (required for JSX)
// import React from 'react';

// // Import layout wrapper used across the app
// import { Layout } from '../components/Layout';

// // Import React-Bootstrap components
// import {
//     Row,
//     Col,
//     Card,
//     Button,
//     Table,
//     Badge,
//     ProgressBar,
// } from 'react-bootstrap';

// // Import icons from lucide-react
// import {
//     CreditCard,
//     TrendingUp,
//     Users,
//     TrendingDown,
//     CheckCircle2,
//     AlertCircle,
// } from 'lucide-react';

// // Import custom CSS (NO Tailwind)
// import './Subscriptions.css';

// /**
//  * Statistics cards data
//  */
// const stats = [
//     {
//         name: 'Active Subscriptions',
//         value: '4,328',
//         change: '+12% from last month',
//         icon: CheckCircle2,
//         variant: 'success',
//     },
//     {
//         name: 'Total Subscriptions',
//         value: '5,847',
//         change: '+8% from last month',
//         icon: Users,
//         variant: 'primary',
//     },
//     {
//         name: 'Total Revenue',
//         value: '$284,392',
//         change: '+15% from last month',
//         icon: TrendingUp,
//         variant: 'purple',
//     },
//     {
//         name: 'Churn Rate',
//         value: '2%',
//         change: '-0.5% from last month',
//         icon: TrendingDown,
//         variant: 'success',
//     },
// ];

// /**
//  * Subscription table data
//  */
// const subscriptions = [
//     {
//         organization: 'Acme Corporation',
//         plan: 'Enterprise',
//         mrr: '$2,499',
//         subscribers: 450,
//         status: 'Active',
//         renewalDate: 'Dec 15, 2025',
//         badge: 'New',
//         badgeVariant: 'success',
//     },
//     {
//         organization: 'TechMedia Inc',
//         plan: 'Business',
//         mrr: '$1,299',
//         subscribers: 180,
//         status: 'Active',
//         renewalDate: 'Dec 20, 2025',
//         badge: 'Old',
//         badgeVariant: 'secondary',
//     },
//     {
//         organization: 'Wellness Innovations',
//         plan: 'Premium',
//         mrr: '$899',
//         subscribers: 95,
//         status: 'Active',
//         renewalDate: 'Jan 05, 2026',
//         badge: 'Expiration',
//         badgeVariant: 'danger',
//     },
//     {
//         organization: 'Global Mindfulness',
//         plan: 'Enterprise',
//         mrr: '$3,200',
//         subscribers: 675,
//         status: 'Active',
//         renewalDate: 'Dec 28, 2025',
//         badge: 'New',
//         badgeVariant: 'success',
//     },
//     {
//         organization: 'Peace of Mind Co',
//         plan: 'Business',
//         mrr: '$1,599',
//         subscribers: 220,
//         status: 'Active',
//         renewalDate: 'Jan 10, 2026',
//         badge: 'Expiration',
//         badgeVariant: 'danger',
//     },
// ];

// /**
//  * Service utilization progress bars
//  */
// const serviceUtilization = [
//     { name: 'Premium Wellness', value: 88 },
//     { name: 'Wellness Plus', value: 72 },
//     { name: 'Basic Wellness', value: 65 },
//     { name: 'Free Tier', value: 45 },
//     { name: 'Trial Accounts', value: 38 },
// ];

// /**
//  * Recent activity feed
//  */
// const recentActivity = [
//     {
//         title: 'New Usage',
//         description: 'Acme Corporation activated 50+ new employees',
//         time: '2 hours ago',
//         icon: Users,
//         variant: 'success',
//     },
//     {
//         title: 'TechMedia Inc',
//         description: 'Subscription renewed for another year',
//         time: '5 hours ago',
//         icon: CheckCircle2,
//         variant: 'primary',
//     },
//     {
//         title: 'Payment Received',
//         description: 'Global Mindfulness paid invoice #4521',
//         time: '1 day ago',
//         icon: CreditCard,
//         variant: 'purple',
//     },
//     {
//         title: 'Subscription Alert',
//         description: 'Wellness Innovations subscription expiring soon',
//         time: '2 days ago',
//         icon: AlertCircle,
//         variant: 'danger',
//     },
// ];

// /**
//  * Subscriptions page component
//  */
// export function Subscriptions() {
//     return (
//         <Layout title="Subscriptions">
//             {/* Page header */}
//             <div className="page-header">
//                 <h1>Subscriptions</h1>
//                 <p>Manage and monitor all subscription plans.</p>
//             </div>

//             {/* Statistics cards */}
//             <Row className="g-4 mb-4">
//                 {stats.map((stat) => (
//                     <Col key={stat.name} xs={12} md={6} lg={3}>
//                         <Card className="stat-card">
//                             <Card.Body>
//                                 <div className="stat-card-header">
//                                     <div className={`icon-circle ${stat.variant}`}>
//                                         <stat.icon size={20} />
//                                     </div>
//                                     <span className="stat-change">{stat.change}</span>
//                                 </div>
//                                 <h3 className="stat-value">{stat.value}</h3>
//                                 <p className="stat-label">{stat.name}</p>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>

//             {/* Add subscription button */}
//             <div className="text-end mb-4">
//                 <Button variant="success">Add Subscription</Button>
//             </div>

//             {/* Subscriptions table */}
//             <Card className="mb-4">
//                 <Card.Header>
//                     <h5 className="mb-1">Recent Subscriptions</h5>
//                     <small className="text-muted">
//                         View and manage organization subscriptions
//                     </small>
//                 </Card.Header>

//                 <Table responsive hover className="mb-0">
//                     <thead>
//                         <tr>
//                             <th>Organization</th>
//                             <th>Plan</th>
//                             <th>MRR</th>
//                             <th>Subscribers</th>
//                             <th>Status</th>
//                             <th>Renewal Date</th>
//                             <th>Tag</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {subscriptions.map((sub) => (
//                             <tr key={sub.organization}>
//                                 <td>{sub.organization}</td>
//                                 <td>{sub.plan}</td>
//                                 <td>{sub.mrr}</td>
//                                 <td>{sub.subscribers}</td>
//                                 <td>
//                                     <Badge bg="success">
//                                         <CheckCircle2 size={12} /> {sub.status}
//                                     </Badge>
//                                 </td>
//                                 <td>{sub.renewalDate}</td>
//                                 <td>
//                                     <Badge bg={sub.badgeVariant}>{sub.badge}</Badge>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>

//                 <Card.Footer className="text-center">
//                     <Button variant="link">View all →</Button>
//                 </Card.Footer>
//             </Card>

//             {/* Bottom section */}
//             <Row className="g-4">
//                 {/* Service utilization */}
//                 <Col xs={12} lg={6}>
//                     <Card>
//                         <Card.Body>
//                             <h5 className="mb-4">Service Utilization</h5>
//                             {serviceUtilization.map((service) => (
//                                 <div key={service.name} className="mb-3">
//                                     <div className="d-flex justify-content-between">
//                                         <span>{service.name}</span>
//                                         <strong>{service.value}%</strong>
//                                     </div>
//                                     <ProgressBar now={service.value} />
//                                 </div>
//                             ))}
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 {/* Recent activity */}
//                 <Col xs={12} lg={6}>
//                     <Card>
//                         <Card.Body>
//                             <h5 className="mb-4">Recent Activity</h5>
//                             {recentActivity.map((activity) => (
//                                 <div key={activity.title} className="activity-item">
//                                     <div className={`activity-icon ${activity.variant}`}>
//                                         <activity.icon size={16} />
//                                     </div>
//                                     <div className="activity-content">
//                                         <div className="d-flex justify-content-between">
//                                             <strong>{activity.title}</strong>
//                                             <small className="text-muted">{activity.time}</small>
//                                         </div>
//                                         <p className="mb-0">{activity.description}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Layout>
//     );
// }



// // .page-header {
// //   margin-bottom: 2rem;
// // }

// // .page-header h1 {
// //   font-weight: 700;
// // }

// // .stat-card {
// //   border-radius: 12px;
// // }

// // .stat-card-header {
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// //   margin-bottom: 1rem;
// // }

// // .icon-circle {
// //   width: 40px;
// //   height: 40px;
// //   border-radius: 50%;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // }

// // .icon-circle.success {
// //   background-color: #d1fae5;
// //   color: #059669;
// // }

// // .icon-circle.primary {
// //   background-color: #dbeafe;
// //   color: #2563eb;
// // }

// // .icon-circle.purple {
// //   background-color: #ede9fe;
// //   color: #7c3aed;
// // }

// // .stat-value {
// //   font-size: 1.75rem;
// //   font-weight: 700;
// // }

// // .stat-label {
// //   color: #6b7280;
// // }

// // .stat-change {
// //   font-size: 0.75rem;
// //   color: #059669;
// // }

// // .activity-item {
// //   display: flex;
// //   gap: 12px;
// //   padding-bottom: 12px;
// //   margin-bottom: 12px;
// //   border-bottom: 1px solid #f1f5f9;
// // }

// // .activity-icon {
// //   width: 36px;
// //   height: 36px;
// //   border-radius: 50%;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // }

// // .activity-icon.success {
// //   background-color: #d1fae5;
// //   color: #059669;
// // }

// // .activity-icon.primary {
// //   background-color: #dbeafe;
// //   color: #2563eb;
// // }

// // .activity-icon.purple {
// //   background-color: #ede9fe;
// //   color: #7c3aed;
// // }

// // .activity-icon.danger {
// //   background-color: #fee2e2;
// //   color: #dc2626;
// // }

// // .activity-content p {
// //   color: #6b7280;
// //   font-size: 0.875rem;
// // }
