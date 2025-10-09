import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Tab,
  Nav,
  Badge,
  Table,
} from "react-bootstrap";
const weeklyPoints = [120, 170, 140, 190, 220, 180];
const badges = [
  {
    name: "Early Bird",
    description: "Complete 5 morning sessions",
    earned: true,
  },
  {
    name: "7-Day Streak",
    description: "Use the app for 7 consecutive days",
    earned: true,
  },
];
const badgesInProgress = [
  {
    name: "Mindfulness Master",
    description: "Complete the Mindfulness program",
    progress: 60,
  },
  {
    name: "Resource Explorer",
    description: "Review 10 different resources",
    progress: 70,
  },
  {
    name: "30-Day Commitment",
    description: "Use the app for 30 consecutive days",
    progress: 23,
  },
  {
    name: "Anxiety Expert",
    description: "Complete the Anxiety Management program",
    progress: 60,
  },
];
const RewardsPage = () =>
  _jsxs(Container, {
    className: "mt-4",
    children: [
      _jsx(Row, {
        children: _jsx(Col, {
          md: 12,
          children: _jsx("h3", { children: "Rewards & Achievements" }),
        }),
      }),
      _jsxs(Row, {
        className: "mb-4",
        children: [
          _jsx(Col, {
            md: 4,
            children: _jsx(Card, {
              children: _jsxs(Card.Body, {
                children: [
                  _jsx(Card.Title, { children: "Total Points Earned" }),
                  _jsxs("h2", {
                    children: [
                      "680 ",
                      _jsx("span", {
                        className: "text-success",
                        style: { fontSize: "1rem" },
                        children: "(+120 this week)",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          _jsx(Col, {
            md: 4,
            children: _jsx(Card, {
              children: _jsxs(Card.Body, {
                children: [
                  _jsx(Card.Title, { children: "Current Streak" }),
                  _jsxs("h2", {
                    children: [
                      "7 days ",
                      _jsx("span", {
                        className: "text-success",
                        style: { fontSize: "1rem" },
                        children: "(+3 days)",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          }),
          _jsx(Col, {
            md: 4,
            children: _jsx(Card, {
              children: _jsxs(Card.Body, {
                children: [
                  _jsx(Card.Title, { children: "Badges Earned" }),
                  _jsx("h2", { children: "2/6" }),
                ],
              }),
            }),
          }),
        ],
      }),
      _jsx(Row, {
        children: _jsx(Col, {
          md: 12,
          children: _jsx(Card, {
            className: "mb-4",
            children: _jsxs(Card.Body, {
              children: [
                _jsx(Card.Title, { children: "Weekly Points Earned" }),
                _jsxs(Table, {
                  bordered: true,
                  children: [
                    _jsx("thead", {
                      children: _jsx("tr", {
                        children: weeklyPoints.map((_, idx) =>
                          _jsx(
                            "th",
                            {
                              className: "text-center",
                              children: `Week ${idx + 1}`,
                            },
                            idx,
                          ),
                        ),
                      }),
                    }),
                    _jsx("tbody", {
                      children: _jsx("tr", {
                        children: weeklyPoints.map((points, idx) =>
                          _jsxs(
                            "td",
                            {
                              className: "align-bottom text-center",
                              children: [
                                _jsx("div", {
                                  style: {
                                    height: `${points}px`,
                                    background: "#14C37A",
                                    width: "28px",
                                    margin: "auto",
                                    borderRadius: "4px",
                                  },
                                }),
                                _jsx("div", { children: points }),
                              ],
                            },
                            idx,
                          ),
                        ),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      }),
      _jsxs(Tab.Container, {
        defaultActiveKey: "badges",
        children: [
          _jsx(Row, {
            children: _jsx(Col, {
              md: 12,
              children: _jsxs(Nav, {
                variant: "tabs",
                children: [
                  _jsx(Nav.Item, {
                    children: _jsx(Nav.Link, {
                      eventKey: "badges",
                      children: "Badges",
                    }),
                  }),
                  _jsx(Nav.Item, {
                    children: _jsx(Nav.Link, {
                      eventKey: "rewards",
                      children: "Redeem Rewards",
                    }),
                  }),
                ],
              }),
            }),
          }),
          _jsx(Row, {
            children: _jsx(Col, {
              md: 12,
              children: _jsxs(Tab.Content, {
                children: [
                  _jsx(Tab.Pane, {
                    eventKey: "badges",
                    children: _jsxs(Row, {
                      className: "mt-3 mb-3",
                      children: [
                        _jsxs(Col, {
                          md: 6,
                          children: [
                            _jsx("h5", { children: "Earned Badges" }),
                            _jsx(Row, {
                              children: badges.map((badge, idx) =>
                                _jsx(
                                  Col,
                                  {
                                    md: 6,
                                    className: "mb-3",
                                    children: _jsx(Card, {
                                      children: _jsxs(Card.Body, {
                                        className: "text-center",
                                        children: [
                                          _jsx(Badge, {
                                            pill: true,
                                            bg: "warning",
                                            className: "mb-2",
                                            style: { fontSize: "2rem" },
                                            children: "\u2605",
                                          }),
                                          _jsx("h6", { children: badge.name }),
                                          _jsx("small", {
                                            children: badge.description,
                                          }),
                                          badge.earned &&
                                            _jsx("div", {
                                              className: "text-success",
                                              children: "\u2713 Earned",
                                            }),
                                        ],
                                      }),
                                    }),
                                  },
                                  idx,
                                ),
                              ),
                            }),
                          ],
                        }),
                        _jsxs(Col, {
                          md: 6,
                          children: [
                            _jsx("h5", { children: "Badges in Progress" }),
                            badgesInProgress.map((badge, idx) =>
                              _jsx(
                                Card,
                                {
                                  className: "mb-3",
                                  children: _jsxs(Card.Body, {
                                    children: [
                                      _jsx("h6", { children: badge.name }),
                                      _jsx("small", {
                                        children: badge.description,
                                      }),
                                      _jsx(ProgressBar, {
                                        now: badge.progress,
                                        label: `${badge.progress}%`,
                                      }),
                                    ],
                                  }),
                                },
                                idx,
                              ),
                            ),
                          ],
                        }),
                      ],
                    }),
                  }),
                  _jsx(Tab.Pane, {
                    eventKey: "rewards",
                    children: _jsx("div", {
                      className: "mt-4",
                      children: _jsx("h5", {
                        children: "No rewards available for redemption.",
                      }),
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
    ],
  });
export default RewardsPage;
