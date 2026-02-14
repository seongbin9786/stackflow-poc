export const famousAppScenarios = [
  {
    app: "Instagram",
    pattern: "Bottom tab + depth stack + modal composer",
    flows: ["Feed -> Profile -> Post", "Feed -> Reels", "Any tab -> Create modal"]
  },
  {
    app: "YouTube",
    pattern: "Bottom tab + persistent mini-player + detail stack",
    flows: ["Home -> Watch", "Shorts -> Channel", "Search -> Result -> Watch"]
  },
  {
    app: "Uber",
    pattern: "Map root + bottom sheet stages + full-screen modal",
    flows: ["Pickup select -> Destination select", "Ride options -> Confirm", "Trip progress"]
  },
  {
    app: "KakaoTalk",
    pattern: "Tab root + chat list stack + overlay actions",
    flows: ["Chats -> Room", "Room -> Profile", "More -> Settings"]
  }
];

export const coreNavigationPatterns = [
  "Stack Push/Pop",
  "Tabs + nested stack",
  "Modal presentation",
  "Multi-step wizard",
  "Deep link entry",
  "Refresh + browser back validation"
];
